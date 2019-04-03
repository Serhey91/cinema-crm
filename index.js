const express = require('express');
const app = express();
const genres = require('./routes/genres');
app.use(express.json());
app.use('/api/genres', genres);

const PORT = process.env.PORT || 3300;

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})