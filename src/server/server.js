const express = require('express');
const path = require('path');
const app = express();
const resourceRouter = require('./routes/resourceRouter');
const PORT = 3000;
const cors = require('cors');

// parse request body
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up routers
app.use('/resource', resourceRouter);

// send main app
app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, './client/index.html'));
});

// catch-all route handler
app.use('*', (req, res) => {
  return res.sendStatus(404);
});

// global error handler
app.use((err, req, res, next) => {
  console.log('invoking global error handler');
  const defaultErr = {
    log: 'Express error handler caught unknown middleware',
    status: 400,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
