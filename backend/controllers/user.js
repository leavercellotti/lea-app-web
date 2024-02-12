const bcrypt = require('bcrypt');
const Object = require('../models/User')
const jwt = require('jsonwebtoken');
const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
const cron = require('node-cron');
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
                    email: user.email,
                    token: jwt.sign(
                        { userId: user._id },
                        JWT_SECRET_USER,
                        { expiresIn: '24h' },
                    ),
                    subscription: user.subscription,
                    podcastsLikedArray:user.podcastsLikedArray,
                    podcastsListenedArray:user.podcastsListenedArray,
                    nbLearnedCards:user.nbLearnedCards,
                    level: user.level,
                    nbDownloadedPodcastsToday: user.nbDownloadedPodcastsToday,
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
    } 
    else {
      // Remove the podcast from the liked array
      const index = user.podcastsLikedArray.indexOf(podcastId);
      if (index !== -1) {
        user.podcastsLikedArray.splice(index, 1);
      }
    }

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: 'User liked podcasts updated successfully.' });
  } 
  catch (error) {
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

exports.updateNbDownloadedPodcastsToday = async (req, res) => {
  const userId = req.body.userId

  try {
    const user = await Object.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    // Update the liked podcasts array
      user.nbDownloadedPodcastsToday++; // Assuming you have a podcastId in the request params
      // Save the updated user object
      await user.save();
      res.status(200).json({ message: 'User number listened podcasts today updated successfully.' });
  } catch (error) {
    console.error('Error updating number listened podcasts today:', error);
    res.status(500).json({ error });
  }
};

//0 3 * * * A 3h du matin tous les jours '0 3 * * *'
// Tâche planifiée pour réinitialiser nbDownloadedPodcastsToday à minuit chaque jour
cron.schedule('0 0 * * *', async () => {
  try {
    // Réinitialiser nbDownloadedPodcastsToday pour tous les utilisateurs
    await Object.updateMany({}, { nbDownloadedPodcastsToday: 0 });
    console.log('Le compteur nbDownloadedPodcastsToday a été réinitialisé pour tous les utilisateurs.');
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du compteur nbDownloadedPodcastsToday :', error);
  }
});

//VOCABULARY
exports.addCard = async (req, res) => {
  const userId = req.body.userId
  const cardId = req.body.cardId
  const knowledge = req.body.knowledge

  try {
    const user = await Object.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the cardId already exists in viewedCards
    const cardExists = user.viewedCards.some((viewedCard) => viewedCard.cardId.equals(cardId));
    // Update the liked podcasts array
    if (!cardExists) {
      user.viewedCards.push({cardId:cardId, knowledge: knowledge}); 
      user.nbLearnedCards++;
    } 

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: 'User liked podcasts updated successfully.' });
  } 
  catch (error) {
    console.error('Error updating liked podcasts:', error);
    res.status(500).json({ error });
  }
};

//0 3 * * * A 3h du matin tous les jours '0 3 * * *'
cron.schedule('0 12 * * *', async () => {//'*/20 * * * *' - toutes les 20min, '* * * * *' - toutes les min, '0 0 * * *' - every day at midnight
  try {
    // const twentyMinutesAgo = new Date();
    // twentyMinutesAgo.setMinutes(twentyMinutesAgo.getMinutes() - 20);
    const eightDaysAgo = new Date();
    eightDaysAgo.setDate(eightDaysAgo.getDate() - 8);
    // const oneDayAgo = new Date();
    // oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    console.log('Checking for records older than:', eightDaysAgo);

    // Find records older than 20 minutes
    const usersWithRecordsToDelete = await Object.find({
      'viewedCards.timestamp': { $lt: eightDaysAgo },
    });

    console.log('Users with records to delete:', usersWithRecordsToDelete);

    // Iterate over users and remove viewedCards older than 20 minutes
    for (const user of usersWithRecordsToDelete) {
      user.viewedCards = user.viewedCards.filter(
        (viewedCard) => viewedCard.timestamp >= eightDaysAgo
      );
      await user.save();
    }

    console.log('Records older than 20 minutes removed successfully.');
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});

//LEVEL

exports.updateLevel = async (req, res) => {
  const userId = req.body.userId
  const level = req.body.level

  try {
    const user = await Object.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    // Update the liked podcasts array
    user.level=level; // Assuming you have a podcastId in the request params
    // Save the updated user object
    await user.save();
    res.status(200).json({ message: 'User level updated successfully.' });
  } catch (error) {
    console.error('Error updating listened podcasts:', error);
    res.status(500).json({ error });
  }
};

// EXTRA FUNCTIONS

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
  
