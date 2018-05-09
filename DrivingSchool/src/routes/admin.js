const Router = require('express').Router;
const AdminController = require('../controllers/admin');
let adminModel = require('../models/admin');
var adminRoutes = new Router();

// injecting the admin model in the controller instance
var adminControllerIns = new AdminController(adminModel);

adminRoutes.get('/', (req, res) => {
  adminControllerIns.getAdmins((err, docs) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.json(docs);
  });
});

adminRoutes.post('/', (req, res) => {
  adminControllerIns.addAdmin(req.body, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    console.log(result);
    res.status(201).end();
  });
});

adminRoutes.delete('/:cnp', (req, res) => {
  adminControllerIns.deleteAdmin(req.params.cnp, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.status(204).end();
  });
});

module.exports = adminRoutes;