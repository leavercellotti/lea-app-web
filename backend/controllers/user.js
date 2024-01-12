const bcrypt = require('bcrypt');
const Object = require('../models/User')
const jwt = require('jsonwebtoken');
const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new Object({
          email: req.body.email,
          password: hash,
          // podcastsListenedArray: [],
          // podcastsLikedArray: [],
          // subscription:"",
          // level:null
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };


exports.login = (req, res, next) => {
    Object.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                  return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        JWT_SECRET_USER,
                        { expiresIn: '24h' },
                    ),
                    podcastsLikedArray:user.podcastsLikedArray,
                    podcastsListenedArray:user.podcastsListenedArray
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.get = (req, res, next) => {
    const filter= req.params //email
    Object.findOne(filter)
        .then(day => res.status(200).json(day))
        .catch(error => res.status(400).json({error}))
}

exports.updateLikedPodcasts = async (req, res) => {
  const userId = req.body.userId
  const podcastId = req.body.podcastId
  const liked = req.body.liked

  try {
    const user = await Object.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Update the liked podcasts array
    if (liked) {
      user.podcastsLikedArray.push(podcastId); // Assuming you have a podcastId in the request params
    } else {
      // Remove the podcast from the liked array
      const index = user.podcastsLikedArray.indexOf(podcastId);
      if (index !== -1) {
        user.podcastsLikedArray.splice(index, 1);
      }
    }

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: 'User liked podcasts updated successfully.' });
  } catch (error) {
    console.error('Error updating liked podcasts:', error);
    res.status(500).json({ error });
  }
};

exports.updateListenedPodcasts = async (req, res) => {
  const userId = req.body.userId
  const podcastId = req.body.podcastId

  try {
    const user = await Object.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    // Update the liked podcasts array
    if (!user.podcastsListenedArray.includes(podcastId)) {
      user.podcastsListenedArray.push(podcastId); // Assuming you have a podcastId in the request params
      // Save the updated user object
      await user.save();
      res.status(200).json({ message: 'User listened podcasts updated successfully.' });
    }
  } catch (error) {
    console.error('Error updating listened podcasts:', error);
    res.status(500).json({ error });
  }
};

exports.getAll = (req, res) => {
    Object.find()
    .then(objects => {
      return(res.status(200).json(objects))
    })
    .catch(error => res.status(400).json({error}))
}

exports.getById = (req, res) => {
    Object.findOne({_id: req.params._id}).orFail()
    .then(object => res.status(200).json(object))
    .catch(error => res.status(400).json({error}))

}

exports.delete = (req, res) => {
    Object.deleteOne({_id : req.params._id})
    .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
    .catch(error => res.status(401).json({ error }));
}

exports.create = (req, res) => {
    const object = new Object({ ...req.body });
    object
      .save()
      .then((savedObject) => res.status(201).json(savedObject._id))
      .catch((error) => res.status(400).json({ error }));
  };

  exports.update = (req, res) => {
    const { _id } = req.params;
    const updateData = { ...req.body };
  
    Object.findByIdAndUpdate(_id, updateData, { new: true })
      .then(updatedObject => {
        if (!updatedObject) {
          return res.status(404).json({ error: '... non trouvée' });
        }
        res.status(200).json(updatedObject);
      })
      .catch(error => res.status(400).json({ error }));
  };
  
