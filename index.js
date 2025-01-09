import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import 'dotenv/config'

const port = 3000;
const API_URL = process.env.API_URL

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index.ejs');
    });

app.post("/convert", async (req, res) =>{
    const params = {
        amount: req.body.amount,
        from: req.body.from,
        to: req.body.to,
        date: new Date().toISOString().split('T')[0],
    };
    console.log(params);
    try {
        const results = await axios.get(`${API_URL}from=${params.from}&to=${params.to}&date=${params.date}&amount=${params.amount}&format=json`);
        console.log(results.data);
        const rate = (results.data.result).toFixed(2);
        console.log(rate);
        res.render('index.ejs', { result: rate, error: null, currencyCode: params.to });
    } catch (error) {
        console.error(error);
        res.render('index.ejs', { result: null, error: 'An error occurred during conversion. Please try again.' });
    };
    
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});