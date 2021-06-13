const app = require('./app');

const ping = require('./routes/ping');
const login = require('./routes/login');
const signup = require('./routes/signup');
const profile = require('./routes/profile');
const images = require('./routes/images');
const predict = require('./routes/prediction');

app.use('/api/ping', ping);
app.use('/api/login', login);
app.use('/api/signup', signup);
app.use('/api/profile', profile);
app.use('/api/images', images);
app.use('/api/prediction', predict);

require('./config/mongoose');

const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");

// let url = "mongodb://username:password@localhost:27017/";
const URL= require('./config/config');
// let url=mongoDB;

// csvtojson()
//   .fromFile("Prediction.csv")
//   .then(csvData => {
//     // console.log(csvData);

//     mongodb.connect(
//         URL.mongoDB,
//       { useNewUrlParser: true, useUnifiedTopology: true },
//       (err, client) => {
//         if (err) throw err;

//         client
//         .db("travel")
//         .collection("predictions")
//         .insertMany(csvData, (err, res) => {
//             if (err) throw err;

//             console.log(`Inserted: ${res.insertedCount} rows`);
//             client.close();
//           });
//       }
//     );
//   });

const port = process.env.PORT || 3001;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
