var app = require('express')();
app.use(express.static('src'));
app.listen(process.env.PORT);
