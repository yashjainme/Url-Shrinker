import express from 'express';
import mongoose from 'mongoose';
import ShortUrl from './models/shortUrl.js';
const app = express();
import { configDotenv } from 'dotenv';
app.use(express.urlencoded({extended: false}))

const result = configDotenv({ path: '.env' });
if (result.error) {
    throw result.error;
  }
  
const MONGO_URI = process.env.MONGO_URI

const connectToMongo = () => {
    mongoose.connect(MONGO_URI);
    console.log('Connected');
}

connectToMongo()


app.set('view engine', 'ejs');

app.get('/', async(req, res) => {
    const shortUrls = await ShortUrl.find()

    res.render('index', {shortUrls: shortUrls})

})

app.post('/shortUrls', async(req, res) => {
    await ShortUrl.create({full: req.body.fullUrl})
    res.redirect('/')
})


app.get('/:shortUrl', async(req, res) => {
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
    if (shortUrl == null ) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);