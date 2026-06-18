const express = require('express');
const app = express();
const connectdb = require('./config/db');
const productRoute = require('./router/productRoute');
const authroute = require('./router/authRouter');
const quoteRoute = require('./router/quoteRouter');
const jokeRoute = require('./router/jokeRouter');

// Middleware
app.use(express.json());

// DB connection
connectdb();

// Routes
app.use('/api/v1', productRoute);
app.use('/auth', authroute);
app.use('/api/v1/quotes', quoteRoute);
app.use('/api/v1/jokes', jokeRoute);

app.get('/', (req, res) => {
  res.send('Server is working');
});

app.listen(3002, () => {
  console.log('Server started on port 3002');
});
