require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    
    try {
        // Tentative de vérification avec la clé spécifiée pour l'utilisateur
        const decodedTokenUser = jwt.verify(token, JWT_SECRET_USER);
        req.auth = {
            userId: decodedTokenUser.userId
        };
        return next();
    } catch (errorUser) {
        try {
            // Si la vérification avec la clé utilisateur échoue, essayer avec l'autre clé
            const decodedToken = jwt.verify(token, JWT_SECRET);
            req.auth = {
                userId: decodedToken.userId
            };
            return next();
        } catch (error) {
            // Aucune des clés n'a permis de vérifier le token
            console.error('Erreur de vérification du JWT :', error.message);
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
};
