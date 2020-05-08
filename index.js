const app = require('express')();
const helmet = require('helmet');
const Config = require('./config');
const mongoose = require('mongoose');

app.use(helmet());
app.use(require('express').json());

mongoose.connect(Config.MONGOURI, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('Connected to database'))
.catch(err => console.log(`Couldn't connect to database err:${err.message}`));

app.get('/', (req, res) => {
    res.send('Welcome to the homepage');
});

app.listen(Config.PORT, () => console.log(`App has started on port ${Config.PORT}`));