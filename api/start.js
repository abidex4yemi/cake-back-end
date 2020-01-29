const app = require('./index');

const PORT = process.env.PORT || 2020;

// Start application
app.listen(PORT);

module.exports = app;
