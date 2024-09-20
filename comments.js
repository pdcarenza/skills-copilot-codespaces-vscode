// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comments = require('./models/comments');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/comments');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  Comments.find({}, (err, comments) => {
    res.json(comments);
  });
});

app.post('/', (req, res) => {
  const newComment = new Comments({
    name: req.body.name,
    comment: req.body.comment
  });

  newComment.save((err) => {
    if (err) {
      res.status(500).send('Error');
    } else {
      res.status(201).send('Created');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});