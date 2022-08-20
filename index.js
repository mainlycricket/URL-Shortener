require('dotenv').config();
const express = require('express');
const app = express();

const helmet = require('helmet')
const cors = require('cors');
const xss = require(('xss-clean'))
const rateLimiter = require('express-rate-limit')

const connectDB = require('./db/connect')
const urlRouter = require('./routes/url')

app.set('trust proxy', 1)

app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per 15 minutes
}))
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())

// Basic Configuration
const port = process.env.PORT || 3000;

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({extended: false}))
app.use('/api/shorturl', urlRouter)

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const start = async() => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => console.log(`Server is listening at ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
