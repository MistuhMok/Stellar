const api = (module.exports = require('express').Router());

api.use('/snippets', require('./snippets'));

// No routes matched? 404.
api.use((req, res) => res.status(404).end());
