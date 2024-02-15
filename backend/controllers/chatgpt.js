const axios = require('axios');

const CHATGPTAUTORIZATION=process.env.CHATGPTAUTORIZATION
exports.connect = async (req, res, next) => {
    const data = {model: req.body.model, messages:req.body.messages}
    console.log("connect", data);
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            data,
            {
                headers: {
                    'Authorization': `Bearer ${CHATGPTAUTORIZATION}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        //console.error(error);
        console.log(data)
        res.status(500).send('Erreur serveur');
    }
};
