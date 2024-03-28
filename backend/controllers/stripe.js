const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

// const ONE_MONTH_SUBSCRIPTION_KEY = process.env.ONE_MONTH_SUBSCRIPTION_KEY
// const EVERYDAY_SUBSCRIPTION_KEY = process.env.EVERYDAY_SUBSCRIPTION_KEY
const STRIPE_6MOIS = process.env.STRIPE_6MOIS
const STRIPE_MENSUEL = process.env.STRIPE_MENSUEL
const STRIPE_12MOIS = process.env.STRIPE_12MOIS

const stripe = require("stripe")(STRIPE_SECRET_KEY)
const YOUR_DOMAIN = 'https://appli-lea-english.com';


const User = require('../models/User')

// async function getCoupons() {
//     try {
//         const coupons = await stripe.coupons.list();
//         console.log("coupons", coupons)
//         return coupons.data;
//     } catch (error) {
//         console.error("Error fetching coupons:", error);
//         throw error;
//     }
// }

exports.checkout = async (req, res) => {
    console.log("stripe - checkout", req.body)
    
    const subscription = req.body.subscription
    const freeTrial = req.body.freeTrial

    const price = subscription === "Mensuel" ? STRIPE_MENSUEL : (subscription === "6 mois"? STRIPE_6MOIS : STRIPE_12MOIS)
    // console.log("price,", subscription, price)

    let subscriptionData = {}; // Créez un objet pour stocker les données d'abonnement

    // Vérifiez si la période d'essai gratuite est activée
    if (freeTrial) {
        // Si la période d'essai est activée, définissez le nombre de jours de la période d'essai
        subscriptionData.trial_period_days = 7; // Vous pouvez modifier le nombre de jours selon vos besoins
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'bancontact', 'link', 'paypal'], // Ajoutez 'paypal' comme méthode de paiement
    
        line_items: [
            {
                price: price,//STRIPE_6MOIS, // Remplacez par votre clé de prix appropriée
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `${YOUR_DOMAIN}/checkout-success/{CHECKOUT_SESSION_ID}`, // Utilisez {CHECKOUT_SESSION_ID} pour inclure automatiquement le sessionId
        cancel_url: `${YOUR_DOMAIN}/subscription`,
        // customer: req.body.stripeId,
        automatic_tax: {
            enabled: true,
        },
        // customer_update: {
        //     address: 'auto', // Mettre à jour automatiquement l'adresse du client
        // },
        expand: ['total_details'],
        subscription_data: subscriptionData,
        // discounts: [{coupon: '6zq54XdZ'}]
    });

    console.log("end checkout", session.id);
    res.json({url: session.url, sessionId: session.id });
};



exports.subscription =async (req, res) => {;//ajouter route et api
    try {
        console.log("stripe - subsciption",req.params)
        // const session = await stripe.checkout.sessions.retrieve("cs_test_a11oGebPzdQm9NfPhHfqSVfLz11TT9ykazONRxCHm33pUCrvpCXBKibIFC")
        const session = await stripe.checkout.sessions.retrieve(req.params._sessionId)
        //console.log("session", session)
        if(session.payment_status === "paid") {
            const subscriptionId = session.subscription
            console.log(subscriptionId,session.subscription)
        }
        
        res.status(200).json({ subscriptionId: session.subscription });
    } catch (error) {
        console.error('Erreur lors de la création de l\'abonnement :', error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'abonnement' });
    }
}

exports.createSubscription =async (req, res) => {
    try {
        console.log("createSubscription")
        const subscription = await stripe.subscriptions.create({
            customer: 'cus_PfzWXOdDJGgyvG',
            items: [
            {
                price: ONE_MONTH_SUBSCRIPTION_KEY,
                quantity: 1,
            },
            ],
        });
        res.status(200).json({ subscriptionId: subscription.id });
    } catch (error) {
        console.error('Erreur lors de la création de l\'abonnement :', error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'abonnement' });
    }
}


exports.sessionInfo =async (req, res) => {;//ajouter route et api
    try {
        console.log("sessionInfo", req.params)
        // const session = await stripe.checkout.sessions.retrieve("cs_test_a11oGebPzdQm9NfPhHfqSVfLz11TT9ykazONRxCHm33pUCrvpCXBKibIFC")
        const session = await stripe.checkout.sessions.retrieve(req.params._sessionId)
        console.log("session", session)
        res.status(200).json({ session: session });
    } catch (error) {
        console.error('Erreur lors de la création de l\'abonnement :', error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'abonnement' });
    }
}
exports.createCustomer = async (req, res) => { // Ajouter route et API + nom complet
    try {
        console.log("createCustomer", req.body)
      const existingUser = await User.findOne({ email: req.body.email }); // Vérifier si l'e-mail existe déjà
      if (existingUser) { // Si l'e-mail existe déjà, renvoyer une erreur
        console.log("customer already exists");
        return res.status(400).json({ error: 'Données incorrectes' });
      } else {
        console.log("new customer");
        const customer = await stripe.customers.create({
          name: req.body.name,
          email: req.body.email,
        });
        console.log("id of the new customer : ", customer.id);
        res.status(200).json({ customerId: customer.id });
      }
    } catch (error) {
      console.error('Erreur lors de la création de l\'abonnement :', error);
      res.status(500).json({ message: 'Erreur lors de la création de l\'abonnement' });
    }
  };
  
// exports.deleteSubscription =async (req, res) => {
//     try {
//         console.log("del")
//         const subscription = await stripe.subscriptions.cancel(
//             'sub_1OqdXNCKZA5F4MLXa4ERbKoV'
//           );
//           console.log(subscription)
//         res.status(200).json({ subscription: subscription });
//     } catch (error) {
//         console.error('Erreur lors de la création de l\'abonnement :', error);
//         res.status(500).json({ message: 'Erreur lors de la création de l\'abonnement' });
//     }
// }


exports.getProductFromSubscription = async (req, res) => {
    console.log(getProductFromSubscription, req.params)
    subscriptionId = req.params
    try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        console.log(subscription)
        const productId = subscription.items.data[0].price.product;
        return productId;
    } catch (error) {
        console.error('Erreur lors de la récupération du produit de l\'abonnement :', error);
        throw error;
    }
}

// Ajouter un utilisateur avec createCustomer et obtenir son id
// Créer un session de paiement avec checkoutEveryDay en mettant customer:'cus_PgFDJAvbaE6u3r'->id du client,
//  Retrouver la session grace à subscription pour obtenir l'id de l'abonnement. 
// -----> En utilisant l'id de la session cs_test_a11oGebPzdQm9NfPhHfqSVfLz11TT9ykazONRxCHm33pUCrvpCXBKibIFC on obtient l'id de l'abo sub_1Oqzq5CKZA5F4MLXO63rrNE1