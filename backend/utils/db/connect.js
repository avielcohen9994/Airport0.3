const mongoose = require('mongoose');


//there are changes in this mthode from the youtube tutorial.
const connectDb = (url) => {
  mongoose.connect(url)
  .then(() => console.log('connected to Db...'))
  .catch((err) => console.log(err))
}

module.exports = connectDb;