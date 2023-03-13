const express = require('express');
const app = express();
const users = require('./routes/users');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');

// middleware
app.use(express.static('./public'));
app.use(express.json());

//db
const db = require('./db/keys').MONGO_URI;

// routes
app.use('/api/v1/users', users);

app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(db);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
