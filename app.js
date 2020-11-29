const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

const adminRoutes = require('./routes/admin');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);


mongoose
  .connect(
    'mongodb+srv://demouser1:ZM69Y5fw3TxrF3RK@cluster0.iixnv.mongodb.net/shop?retryWrites=true&w=majority'
  )
  .then(result => {
    console.log("CONNECTED")
    // User.findOne().then(user => {
    //   if (!user) {
    //     const user = new User({
    //       name: 'Max',
    //       email: 'max@test.com',
    //       cart: {
    //         items: []
    //       }
    //     });
    //     user.save();
    //   }
    // });
    app.listen(3000);
  })
  .catch(err => {
    console.log("CONNECTION ERR",err);
  });
