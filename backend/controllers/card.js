const User = require('../models/User');
const Card = require('../models/Card');
const Object = require('../models/Card');
const moment = require('moment');

exports.getRandomCards = async (req, res) => {
  try {
      // Get the user's viewed cards
      const level = req.params.level;
      const userId = req.params.userId; // Assuming you have the userId in the request params
      const user = await User.findById(userId).populate('viewedCards.cardId');

      if (!user) {
          return res.status(404).json({ error: 'User not found.' });
      }

      // Get all cards for the specified level
      const allCards = await Card.find({ level: req.params.level });
      // console.log("all",allCards)

      // Filter out cards that are in the user's viewedCards array
      const filteredCards = allCards.filter((card) => {
          return !user.viewedCards.some((viewedCard) => viewedCard.cardId.equals(card._id));
      });
      
      // Shuffle the filtered cards to get a random order
      const shuffledCards = shuffleArray(filteredCards);

      // Take the first 5 cards (or fewer if there are less than 5 available)
      const finalCards = shuffledCards.slice(0, Math.min(5, shuffledCards.length));

      res.status(200).json(finalCards);
  } catch (error) {
      console.error('Error in getRandomCard:', error);
      res.status(500).json({ error });
  }
};

// Helper function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

exports.getAllRecentlyViewedCards = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('viewedCards.cardId');

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const recentlyViewedCards = user.viewedCards.map((viewedCard) => {
      const card = viewedCard.cardId;
      const knowledge = viewedCard.knowledge;

      // Ajoutez la propriété `knowledge` à l'objet `card`
      return {
        ...card.toObject(), // Convertit la carte Mongoose en objet JavaScript
        knowledge: knowledge,
      };
    });

    res.status(200).json(recentlyViewedCards);
  } catch (error) {
    console.error('Error in getAllRecentlyViewedCards:', error);
    res.status(500).json({ error });
  }
};


exports.getRecentlyViewedCards = async (req, res) => {
    try {
        const userId = req.params.userId;
        const nbDays = req.params.nbDays;
        const knowledge = req.params.knowledge;

        // Validez userId et nbDays si nécessaire

        const user = await User.findById(userId).populate('viewedCards.cardId');
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Calcul de la date de début et de fin pour la comparaison
        const startDate = moment().subtract(nbDays, 'days').startOf('day').toDate();
        const endDate = moment().subtract(nbDays - 1, 'days').startOf('day').toDate();
        // Filtrer les cartes vues en fonction de la date de création
        const recentlyViewedCards = user.viewedCards.filter((viewedCard) => {
          const cardCreatedAt = moment(viewedCard.timestamp).toDate();
          return (
              cardCreatedAt >= startDate &&
              cardCreatedAt < endDate &&
              (knowledge === 'false' ? !viewedCard.knowledge : true)
          );
      });

        // Extraire les cardIds de chaque viewedCard
        const cardIds = recentlyViewedCards.map((viewedCard) => viewedCard.cardId);

        // Populer les objets de cartes en fonction des cardIds
        const cards = await Card.find({ _id: { $in: cardIds } });
        res.status(200).json(cards);
    } catch (error) {
        console.error('Error in getRecentlyViewedCards:', error);
        res.status(500).json({ error });
    }
};



exports.getAll = (req, res) => {
  console.log("all", req.body)
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
  
