const path = require('path');
const express = require('express');
const bodyParser=require('body-parser');

exports.setStatics = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '../../frontend')));
};
