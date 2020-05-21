const express = require('express');
const path = require('path');

const app = express();

// serve static files from React app
app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/cart', (req, res) => {
    res.json({
        cart: []
    })
});

// catchall handler => index.html
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Express app running on port ${port}`);
