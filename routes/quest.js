const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');

router.get('/', function(req, res, next) {
  res.render('quest', { title: 'Formulaire' });
});

router.post('/', upload.array('monfichier'), function(req, res, next) {
  fs.rename(req.files.path, 'public/images/' + req.files.originalname, function(
    err
  ) {
    if (err) {
      res.send('problème durant le déplacement');
    } else {
      res.send('Fichier uploadé avec succès');
    }
  });
});

module.exports = router;
