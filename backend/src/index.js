const app = require('express')();
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/routes');
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use('/api', router);

function startApp() {
  try {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('Connected to MongoDB'))
        .then(() => {
          app.listen(port, () => {
            console.log(`Server started on port ${port}`);
          })
        })

  } catch (e) {
    console.log(e);
  }
}

startApp()
