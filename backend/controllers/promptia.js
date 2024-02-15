const Object = require('../models/PromptIA')
const Index = require('../models/Index')

const cron = require('node-cron');

// Définition de la tâche planifiée pour augmenter l'index du promptia chaque jour à minuit
cron.schedule('0 0 * * *', async () => {
  try {
    // Récupérer tous les promptias de niveau 1
    const prompts1 = await Object.find({ level: 1 }).exec();
    const index1Doc = await Index.findOne({ level: 1 }).exec();
    let nextIndex1 = 0;
    if (index1Doc) {
      // Augmenter l'index du promptia choisi
      nextIndex1 = (index1Doc.index + 1) % prompts1.length;
      console.log(nextIndex1, prompts1.length)
      // Mettre à jour l'index de niveau 1 dans la base de données
      await Index.findOneAndUpdate({ level: 1 }, { index: nextIndex1 });
    } else {
      console.error("Aucun index trouvé pour le niveau 1 dans la base de données.");
    }

    const prompts2 = await Object.find({ level: 2 }).exec();
    const index2Doc = await Index.findOne({ level: 2 }).exec();
    let nextIndex2 = 0;
    if (index2Doc) {
      // Augmenter l'index du promptia choisi
      nextIndex2 = (index2Doc.index + 1) % prompts2.length;
      console.log(nextIndex2, prompts2.length)
      // Mettre à jour l'index de niveau 2 dans la base de données
      await Index.findOneAndUpdate({ level: 2 }, { index: nextIndex2 });
    } else {
      console.error("Aucun index trouvé pour le niveau 3 dans la base de données.");
    }

    const prompts3 = await Object.find({ level: 3 }).exec();
    const index3Doc = await Index.findOne({ level: 3 }).exec();
    let nextIndex3 = 0;
    if (index3Doc) {
      // Augmenter l'index du promptia choisi
      nextIndex3 = (index3Doc.index + 1) % prompts3.length;
      console.log(nextIndex3, prompts3.length)
      // Mettre à jour l'index de niveau 3 dans la base de données
      await Index.findOneAndUpdate({ level: 3 }, { index: nextIndex3 });
    } else {
      console.error("Aucun index trouvé pour le niveau 3 dans la base de données.");
    }
  } catch (error) {
    console.error("Une erreur est survenue:", error);
  }
});

exports.getDailyPrompt = (req, res) => {
  Index.findOne({ level: req.params.level })
    .orFail()
    .then(index => {
      console.log(index)
      Object.find({level: req.params.level})
        .then(objects => {
          console.log(objects[index.index].sentence)
          // Vérifier si l'index est valide
          if (index < 0 || index >= objects.length) {
            return res.status(404).json({ error: "Index invalide" });
          }
          return res.status(200).json(objects[index.index].sentence);
        })
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(404).json({ error: "Index non trouvé" }));
}


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
    console.log(req.body)
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
