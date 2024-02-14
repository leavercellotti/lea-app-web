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
                    //testa.webdev : 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
                    //coral dev : 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
                    //Lea : 'Bearer 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'${CHATGPTAUTORIZATION}
                    'Authorization': `Bearer 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`,
                    'Content-Type': 'application/json',
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        //console.error(error);
        console.log(error, data)
        res.status(500).send('Erreur serveur');
    }
};
