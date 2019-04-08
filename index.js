const express = require('express');
const app = express();
const genres = require('./routes/genres');
const mongoose = require('mongoose');
app.use(express.json());
app.use('/api/genres', genres);
mongoose.connect('mongodb://localhost/Cinema-CRM', {useNewUrlParser: true})
.then(() => {
    console.log('Connected to MongoDB.....')
})
.catch((err) => console.error(err))
const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})