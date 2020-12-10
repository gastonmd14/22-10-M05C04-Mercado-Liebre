const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    res.render("products", { productos: products, convertir: toThousand });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let detalle = products.find(function (encontrar) {
      if (encontrar.id == req.params.id) {
        return encontrar;
      }
    });

    res.render("detail", { detalle: detalle, convertir: toThousand });
  },

  // Create - Form to create
  create: (req, res) => {
    res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    let pathFile = path.join("src/data", "newProducts.json");

    let nuevoProduct = fs.readFileSync(pathFile, { encoding: "utf-8" });

    nuevoProduct = JSON.parse(nuevoProduct);

    nuevoProduct.push({
      ...req.body,
      id: nuevoProduct[nuevoProduct.length - 1].id + 1,
	});
	if(req.files.length == []) {
		nuevoProduct.image = "";
	  } else {
		nuevoProduct.image = req.files[0].filename;
	  }

    nuevoProduct = JSON.stringify(nuevoProduct);

    fs.writeFileSync(pathFile, nuevoProduct);

    res.send("Producto Creado");
  },

  // Update - Form to edit
  edit: (req, res) => {
    let editar = products.find(function (buscar) {
      if (buscar.id == req.params.id) {
        return buscar;
      }
    });
    res.render("product-edit-form", { editar: editar });
  },
  // Update - Method to update
  update: (req, res) => {
    let pathFile = path.join("src/data", "newProducts.json");

    let actualProduct = fs.readFileSync(pathFile, { encoding: "utf-8" });

    actualProduct = JSON.parse(actualProduct);

    actualProduct = actualProduct.map(function (buscar) {
      
      if (buscar.id == req.params.id) {
		buscar = { ...req.body };
		if(req.files.length == []) {
			buscar.image = "";
		  } else {
			buscar.image = req.files[0].filename;
		  }
        return buscar;
      }
    });
    

    actualProduct = JSON.stringify(actualProduct);

    fs.writeFileSync(pathFile, actualProduct);

    res.send("Producto Actualizado!!");
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    let pathFile = path.join("src/data", "newProducts.json");

    let actualProduct = fs.readFileSync(pathFile, { encoding: "utf-8" });

    actualProduct = JSON.parse(actualProduct);

    actualProduct = actualProduct.filter(function (buscar) {
      if (buscar.id != req.params.id) {
        return buscar;
      }
    });

    actualProduct = JSON.stringify(actualProduct);

    fs.writeFileSync(pathFile, actualProduct);

    res.send("Producto Borrado!!");
  },
};

module.exports = controller;
