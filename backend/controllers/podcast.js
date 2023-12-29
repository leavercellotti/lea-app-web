const Object = require('../models/Podcast')

exports.getAll = (req, res) => {
  console.log("getall ..");

  // Ajoutez une condition pour filtrer par niveau si le paramètre 'level' est fourni dans la requête
  const levelFilter = req.query.level ? { level: req.query.level } : {};
  console.log("Level Filter:", levelFilter);

  Object.find(levelFilter)
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
  
