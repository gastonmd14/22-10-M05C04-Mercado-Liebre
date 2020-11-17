// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path')

const multer  = require('multer')

var checkusers = require('../middlewares/checkUsers')

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, './public/images/products/new')
	},
	filename: function (req, file, cb) {
	  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
  })
   
  var upload = multer({ storage: storage })

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/', upload.any(), productsController.store);  

/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', upload.any(), productsController.update); 

/*** DELETE ONE PRODUCT ***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
