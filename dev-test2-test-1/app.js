const express = require('express');
const app = express();
const files = require('./routes/files');
const notFound = require('./middleware/not-found');
//const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware

app.use(express.static('./public'));
app.use(express.json());

// routes
app.use('/api/v1/files', files);

app.use(notFound);
//app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
