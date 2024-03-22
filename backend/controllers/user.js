const bcrypt = require('bcrypt');
const Object = require('../models/User')
const jwt = require('jsonwebtoken');
const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
const NODEMAILERPASS = process.env.NODEMAILERPASS;
const cron = require('node-cron');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_MENSUEL = process.env.STRIPE_MENSUEL//mensuel
const STRIPE_6MOIS = process.env.STRIPE_6MOIS//6 mois
const STRIPE_12MOIS = process.env.STRIPE_12MOIS//12 mois

const stripe = require("stripe")(STRIPE_SECRET_KEY)

exports.signup = async (req, res, next) => {
  //add user
  // console.log(req.body);
  try {      
    // Vérifier si l'e-mail existe déjà
    const existingUser = await Object.findOne({ email: req.body.email });
    let subscription
    if(req.body.subscriptionId) {
      subscription = await stripe.subscriptions.retrieve(req.body.subscriptionId);
    }
    // console.log("yo",subscription.current_period_end);
    let sub
    if(req.body.foreverFree) {
      sub = "Forever Free"
    }
    else if(subscription.plan.id === STRIPE_MENSUEL) {
      sub = "Mensuel"
    }
    else if(subscription.plan.id === STRIPE_6MOIS) {
      sub = "6 mois"
    }
    else if(subscription.plan.id === STRIPE_12MOIS) {
      sub = "12 mois"
    }
    let endDate
    if(req.body.subscriptionId){
    endDate = new Date(subscription.current_period_end * 1000).toLocaleDateString('fr-FR');
    }
    // user.free = subscription.status === "trialing"
    // await user.save(); 

    let isFree = true
    if(req.body.subscriptionId) {
      isFree = subscription.status === "trialing"
    }

    if (existingUser) {
      // Si l'utilisateur existe déjà, arrêter l'abonnement existant
      if (existingUser.subscriptionId) {
        // console.log("if",existingUser.subscriptionId)
        const canceledSubscription = await stripe.subscriptions.cancel(
          existingUser.subscriptionId
        );
        console.log("Abonnement existant annulé :", canceledSubscription);
      }
      // console.log("end if")

      // Mettre à jour les données de l'utilisateur
      existingUser.name = req.body.name;
      existingUser.stripeId = req.body.stripeId;
      existingUser.sessionId = req.body.sessionId;
      existingUser.subscriptionId = req.body.subscriptionId;
      existingUser.subscription = sub;
      existingUser.free = isFree 
      existingUser.current_period_end = endDate 

      // Sauvegarder les modifications
      const updatedUser = await existingUser.save();
      console.log("Utilisateur existant mis à jour :", updatedUser);

      sendLoginInformationEmail(req.body.email, updatedUser._id); // Envoyer les informations de connexion par e-mail
      return res.status(200).json({ userId: updatedUser._id, message: "Utilisateur existant mis à jour." });
    } else {
      // Créer un nouvel utilisateur
      const newUser = new Object({
        email: req.body.email,
        name: req.body.name,
        stripeId: req.body.stripeId,
        sessionId: req.body.sessionId,
        subscriptionId: req.body.subscriptionId,
        free: isFree,
        current_period_end : endDate,
        subscription: sub,
      });

      const savedUser = await newUser.save();
      console.log("Nouvel utilisateur créé :", savedUser);

      sendLoginInformationEmail(req.body.email, savedUser._id); // Envoyer les informations de connexion par e-mail
      return res.status(201).json({ userId: savedUser._id, message: "Nouvel utilisateur créé." });
    }
    
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    return res.status(500).json({ error });
  }
};


exports.login = async (req, res) => {
  // console.log("login", req.body);
  try {
      const user = await Object.findOne({ email: req.body.email });
      if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });
      }

      console.log(user.subscription)
      let subscritpion
      let endDate
      if(user.subscription !== "Forever Free" && user.subscription !== "free"){
        // console.log("if")
        subscription = await stripe.subscriptions.retrieve(user.subscriptionId);
        
        user.free = subscription.status === "trialing"
        endDate = new Date(subscription.current_period_end * 1000).toLocaleDateString('fr-FR');
        // console.log("end",endDate)

        user.current_period_end = endDate
        await user.save(); 
      }
      
      // console.log("status", subscription.status) //trialing => Essai
      
      //vérifier que l'abonnement est bien payé
      // console.log("satus", subscription.status)
      if(user.subscription === "Forever Free" || user.subscription === "free" || subscription.status === "active" || subscription.status === "trialing"){
        res.status(200).json({
            userId: user._id,
            email: user.email,
            token: jwt.sign(
                { userId: user._id },
                JWT_SECRET_USER,
                { expiresIn: '24h' }
            ),
            subscription: user.subscription,//subscription.items.data.plan, // Utiliser l'abonnement récupéré depuis Stripe
            podcastsLikedArray: user.podcastsLikedArray,
            podcastsListenedArray: user.podcastsListenedArray,
            nbLearnedCards: user.nbLearnedCards,
            level: user.level,
            nbDownloadedPodcastsToday: user.nbDownloadedPodcastsToday,
            nbChatsMade: user.nbChatsMade,
            free: user.free,
            current_period_end: user.current_period_end,
        });
      }
      else {
        res.status(500).json({ error : "Erreur de connexion" });
      }
  } catch (error) {
      console.error("Erreur lors de la connexion de l'utilisateur :", error);
      res.status(500).json({ error });
  }
};
 
exports.get = (req, res, next) => {
    // console.log('get test')
    const filter= req.params //email
    Object.findOne(filter)
        .then(day => res.status(200).json(day))
        .catch(error => res.status(400).json({error}))
}

exports.all = (req, res, next) => {
  Object.find()
    .then(objects => {
      return(res.status(200).json(objects))
    })
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

exports.updateNbChatsMade = async (req, res) => {
  const userId = req.body.userId
  try {
    const user = await Object.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    // Update the liked podcasts array
      user.nbChatsMade++; // Assuming you have a podcastId in the request params
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
  
  exports.sendPasswordResetEmail = async (req, res) => {
    // console.log(req.body);
    const otp = otpGenerator.generate(12, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    try {
        // Générez le hachage de l'OTP
        const otpHashed = await bcrypt.hash(otp, 10);

        // Enregistrez le hachage de l'OTP dans la base de données
        await Object.updateOne({ email: req.body.email }, { otp: otpHashed, otpExpiration: Date.now() + 120000 });

        // Créez un transporteur nodemailer pour envoyer l'e-mail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'hello.lea.english@gmail.com',
                pass: 'rxam uhdt xujr hhyw'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        // console.log(transporter)

        // Définissez les options de l'e-mail
        const mailOptions = {
            from: 'Léa English <hello.lea.english@gmail.com>',
            to: `${req.body.email}`,
            subject: 'Demande de réinitialisation de mot de passe - Léa English',
            text: `Votre code de réinitialisation de mot de passe est : ${otp}`,
            html: `<p>Bonjour,</p>
            <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
            <p>Votre code de réinitialisation de mot de passe est :</p>
            <h1>${otp}</h1>
            <p>Copiez ce code et utilisez-le pour réinitialiser votre mot de passe.</p>
            <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.</p>
            <p>Cordialement,</p>
            <p>Léa English</p>`
        };

        // Envoyez l'e-mail
        const info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé : ' + info.response);

        // Répondez avec succès et renvoyez l'OTP haché
        res.status(200).json({ message: 'Email envoyé avec succès' });
        // Planifiez une tâche de nettoyage pour supprimer l'OTP après 2 minutes
        setTimeout(async () => {
          await Object.updateOne({ email: req.body.email }, { $unset: { otp: "", otpExpiration: "" } });
          console.log('OTP supprimé après expiration.');
      }, 120000); // 120000 ms = 2 minutes
    } catch (error) {
        console.error("Erreur lors de l'envoi du mail :", error);
        res.status(500).json({ error });
    }
};

exports.verifyUser = (req, res) => {
  // console.log(req.body);
  Object.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      
      bcrypt.compare(req.body.enteredOTP, user.otp)
        .then(valid => {
          // console.log("bcrypt", req.body.enteredOTP, user.otp);
          if (!valid) {
            console.log("pas ok");
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          console.log("ok");
          res.status(200).json({
            userId: user._id});
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.updatePW = async (req, res) => {
  // console.log("update");
  const userId = req.body.userId;
  const newPassword = req.body.password; // Renommer la variable pour plus de clarté
  // console.log(userId, newPassword);
  try {
    const user = await Object.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    
    // Hacher le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Mettre à jour le mot de passe de l'utilisateur
    user.password = hashedPassword;
    
    // Enregistrer l'objet utilisateur mis à jour dans la base de données
    await user.save();
    
    res.status(200).json({ message: 'User password updated successfully.' });
  } catch (error) {
    console.error('Error updating user password:', error);
    res.status(500).json({ error: 'Error updating user password.' });
  }
};



//SUBSCRIPTION
exports.updateSubscriptionId = async (req, res) => {
  const userId = req.body.userId
  const subscriptionId = req.body.subscriptionId
  console.log("update",userId,subscriptionId)
  
  try {
    const user = await Object.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    // Update the liked podcasts array
    user.subscriptionId=subscriptionId; // Assuming you have a podcastId in the request params
    // Save the updated user object
    await user.save();
    res.status(200).json({ message: 'User subscriptionId updated successfully.' });
  } catch (error) {
    console.error('Error updating subscriptionId :', error);
    res.status(500).json({ error });
  }
};

exports.updateSessionId = async (req, res) => {
  const userId = req.body.userId
  const sessionId = req.body.sessionId
  console.log("update",userId,sessionId)
  
  try {
    const user = await Object.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    // Update the liked podcasts array
    user.sessionId=sessionId; // Assuming you have a podcastId in the request params
    // Save the updated user object
    await user.save();
    res.status(200).json({ message: 'User sessionId updated successfully.' });
  } catch (error) {
    console.error('Error updating sessionId :', error);
    res.status(500).json({ error });
  }
};

exports.updateStripeId = async (req, res) => {
  const userId = req.body.userId
  const stripeId = req.body.stripeId
  console.log("update",userId,stripeId)
  
  try {
    const user = await Object.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    // Update the liked podcasts array
    user.stripeId=stripeId; // Assuming you have a podcastId in the request params
    // Save the updated user object
    await user.save();
    res.status(200).json({ message: 'User stripeId updated successfully.' });
  } catch (error) {
    console.error('Error updating stripeId :', error);
    res.status(500).json({ error });
  }
};

sendLoginInformationEmail = async (email,userId) => {
  // const otp = otpGenerator.generate(12, { digits: true, alphabets: false, upperCase: false, specialChars: false });
  const otp = otpGenerator.generate(12, { digits: true, alphabets: true, upperCase: true, specialChars: false });
  // console.log("sendLoginInformationEmail",email,otp)
  try {
    const user = await Object.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
      // Générez le hachage de l'OTP
      const hashedPassword = await bcrypt.hash(otp, 10);
    
    // Mettre à jour le mot de passe de l'utilisateur
    user.password = hashedPassword;
    
    // Enregistrer l'objet utilisateur mis à jour dans la base de données
    await user.save();

      // Créez un transporteur nodemailer pour envoyer l'e-mail
      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: 'hello.lea.english@gmail.com',
              pass: 'rxam uhdt xujr hhyw'
          },
          tls: {
              rejectUnauthorized: false
          }
      });

      // Définissez les options de l'e-mail
      const mailOptions = {
          from: 'Léa English <hello.lea.english@gmail.com>',
          to: `${email}`,
          subject: 'Informations de connexion - Léa English',
          html: `<p>Bonjour,</p>
          <p>Votre abonnement à l'application web <b>Léa English</b> est confirmé.</p>
          <p>Voici vos informations de connexion :</p>
          <p>E-mail: ${email}</p>
          <p>Mot de passe: <b>${otp}</b></p>
          <p>Vous pouvez vous connecter à <a href="https://appli-lea-english.com/login">https:appli-lea-english.com/login</a> et modifier votre mot de passe sur cette page.</p>
          <p>Cordialement,</p>
          <p>Léa English</p>`
      };

      // Envoyez l'e-mail
      const info = await transporter.sendMail(mailOptions);
      console.log('Email envoyé : ' + info.response);

      // res.status(200).json({ message: 'Email envoyé avec succès' });
      
  } catch (error) {
      console.error("Erreur lors de l'envoi du mail :", error);
  }
};


//DESABONNEMENT

exports.unsubscribe = async (req, res) => {
  // console.log(req.params);
  const userId = req.params.userId;
  const email = req.params.email
  try {
    const user = await Object.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    if(user.subscription !== "Forever Free" && user.subscription !== "free")
    {
      const isStripeDeleted = await deleteSubscription(user.subscriptionId);
      // console.log("isStripe", isStripeDeleted)
      if (!isStripeDeleted) {
        return res.status(404).json({ error: 'Stripe subscription not deleted.' });
      }
    }
    // console.log("end if")

    const deleteUser = await Object.deleteOne({ _id: userId });
    console.log("delete user", deleteUser)
    if(deleteUser){
      sendUnsubscribeConfirmationEmail(email)
      return res.status(200).json({ message: 'Object deleted!' });
    }
    else {
      return res.status(404).json({ error: 'User not deleted.' });
    }
  } catch (error) {
    console.error('Error updating liked podcasts:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Unsubscribe function
const deleteSubscription = async (subscriptionId) => {
  try {
    console.log("Deleting subscription");
    await stripe.subscriptions.cancel(subscriptionId);
    console.log("Subscription deleted successfully");
    return true;
  } catch (error) {
    console.error('Error while canceling subscription:', error);
    return false;
  }
};

sendUnsubscribeConfirmationEmail = async (email) => {
  console.log("sendUnsubscribeConfirmationEmail",email)
  try {
    // const user = await Object.findById(userId);
    // if (!user) {
    //   return res.status(404).json({ error: 'User not found.' });
    // }

      // Créez un transporteur nodemailer pour envoyer l'e-mail
      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: 'hello.lea.english@gmail.com',
              pass: 'rxam uhdt xujr hhyw'
          },
          tls: {
              rejectUnauthorized: false
          }
      });

      // Définissez les options de l'e-mail
      const mailOptions = {
          from: 'Léa English <hello.lea.english@gmail.com>',
          to: `${email}`,
          subject: 'Désabonnement - Léa English',
          html: `<p>Bonjour,</p>
          <p>Nous vous confirmons que votre désabonnement à l'application web <b>Léa English</b> a été pris en compte avec succès.</p>
          <p>Nous sommes désolés de vous voir partir et espérons avoir l'opportunité de vous accueillir à nouveau dans le futur.</p>
          <p>Cordialement,</p>
          <p>Léa English</p>`
      };

      // Envoyez l'e-mail
      const info = await transporter.sendMail(mailOptions);
      console.log('Email envoyé : ' + info.response);
      // res.status(200).json({ message: 'Email envoyé avec succès' });
      
  } catch (error) {
      console.error("Erreur lors de l'envoi du mail :", error);
  }
};
