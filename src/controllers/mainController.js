const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let visitada = products.filter(function (estadoVisitada) {
			if(estadoVisitada.category == 'visited') {
				estadoVisitada.price = toThousand(estadoVisitada.price)
				return estadoVisitada
			} 
		})

		let ofertada = products.filter(function (estadoOfertada) {
			if(estadoOfertada.category == 'in-sale') {
				estadoOfertada.price = toThousand(estadoOfertada.price)
				return estadoOfertada
			} 
		})
		res.render('index', {visitada: visitada, ofertada: ofertada});
	},
	search: (req, res) => {
		let data = [...products]		

		let busqueda = data.filter(function (buscar) {
			if(buscar.name == req.query.keywords) {
				return buscar;
			}
		});
		console.log(busqueda);
		res.render('results', {busqueda: busqueda})
	}
};

module.exports = controller;
