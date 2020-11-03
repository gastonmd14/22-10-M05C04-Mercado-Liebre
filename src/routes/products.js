// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path')

const multer  = require('multer')

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
router.post('/', productsController.store); 

/*** CREATE ONE IMAGE-PRODUCT ***/
router.get('/createImage/', productsController.createImage); 

/*** GET ONE PRODUCT ***/ 
router.get('/:id/', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); 
router.put('/:id', productsController.update); 

/*** EDIT ONE IMAGE-PRODUCT ***/
router.get('/:id/edit/image', productsController.editImage);
router.put('/:id/image', upload.any() ,productsController.updateImage);


/*** DELETE ONE PRODUCT ***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
