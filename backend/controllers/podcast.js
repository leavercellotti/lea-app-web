const Object = require('../models/Podcast')

// Définition des fonctions de gestion des podcasts
exports.getAll = (req, res) => {
  Object.find()
    .then(objects => {
      return res.status(200).json(objects);
    })
    .catch(error => res.status(400).json({ error }));
}

exports.getById = (req, res) => {
    Object.findOne({_id: req.params._id}).orFail()
    .then(object => res.status(200).json(object))
    .catch(error => res.status(400).json({error}))
}

exports.getByLevel = (req, res) => {
  Object.find({level: req.params.level}).orFail()
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
    console.log('update')
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
