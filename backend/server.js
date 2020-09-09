const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();


const app = express();
const Port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//DATABASE CONNECTION

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, });

try {
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("MongoDB connection successfull....");
    }
    )
} catch (err) {
    console.log(err);
}

//TO USE THE FILES IN ROUTES

app.use('/exercises', require('./routes/exercises'));
app.use('/users', require('./routes/users'));

app.get('/', (req, res) => {
    res.send("WELCOMEE!!!!");
})

app.listen(Port, () => {
    console.log("Server connected at port 35000");
}
);