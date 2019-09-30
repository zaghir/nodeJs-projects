var express = require('express');
var app = express();
var server = app.listen(5000);

// swagger documentations 
var swaggerUi = require("swagger-ui-express" );
var swaggerDocument = require("./swagger.json");
app.use("/api-docs" , swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/// pour utiliser le post il faut recupere le bodyParser et le fournir au express Js
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

let produits = [
	{ id: 1, nom: "sablé", detail: "bimo au coco" },
	{ id: 2, nom: "henrys", detail: "bimo au au beure" },
	{ id: 3, nom: "spoufi", detail: "cack au oeufs" },
	{ id: 4, nom: "merindina", detail: "cack au chocolat" },
	{ id: 5, nom: "tonic", detail: "pasta au chocolat" }];

let clients = [
	{
        id:3263855094175,
        nom: 'Rbouh',
        prenom: 'Ali',
        adresse: 'rue 12 hay mouhamadi',
        fixe: '05-22-92-31-22',
        mobile: '06-65-41-05-06',
        mail:'rbouh.ali@gmail.com',
        gpsLatitude: 48.929458, 
        gpsLongitude: 2.425534

    },
    {
        id:3263851321015,
        nom: 'cobal',
        prenom: 'Mohamed',
        adresse: 'rue 2 al majd',
        fixe: '05-22-22-11-22',
        mobile: '06-65-44-55-99',
        mail:'cobal.mohamed@gmail.com',
        gpsLatitude: 48.929484, 
        gpsLongitude: 2.425416
    },
    {
        id:3,
        nom: 'maha',
        prenom: 'driss',
        adresse: 'rue 63 hay adi',
        fixe: '05-22-50-01-16',
        mobile: '06-65-15-71-32',
        mail:'maha.driss@gmail.com',
        gpsLatitude: 1.620576,
        gpsLongitude: 0.029316
    },
    {
        id:4,
        nom: 'jato',
        prenom: 'bilal',
        adresse: 'rue 74 hay al kouds',
        fixe: '05-22-40-91-76',
        mobile: '06-65-10-01-36',
        mail:'jato.bilal@gmail.com',
        gpsLatitude: 48.929661, 
        gpsLongitude: 2.425704
    }];

let commandes = [
	{
		id: 1,
		client: clients[0],
		produitsCommander: [
			{
				produit: produits[0],
				quantite: 12
			},
			{
				produit: produits[1],
				quantite: 6
			},
			{
				produit: produits[2],
				quantite: 5
			}],
		status: 'valider'
	},
	{
		id: 2,
		client: clients[1],
		produitsCommander: [
			{
				produit: produits[3],
				quantite: 2
			},
			{
				produit: produits[4],
				quantite: 6
			}],
		status: 'valider'
	}];

let prisecommandes = [];

app.get('/api/mobile/testConnection', function (request, response) {
	response.send('test connection success !')
});
app.get('/api/mobile/produits', function (request, response) {
	response.send(produits);
});

app.get('/api/mobile/clients', function (request, response) {
	response.send(clients);
});

app.get('/api/mobile/commandes', function (request, response) {
	response.send(commandes);
});

app.post('/api/mobile/preCommandes', function (request, response) {
	console.log("========> /api/mobile/preCommandes ");
	let presCommandes = request.body;
	prisecommandes.push(presCommandes);
	console.log(presCommandes);
	response.send(presCommandes);
});

app.post('/api/mobile/syncCommandes', function (request, response) {
	console.log("========> /api/mobile/commandes");	
	let deleteCommandes = request.body;	
	for(let i = 0 ; i< deleteCommandes.length ;i++){		
		for(let index = 0 ;index <commandes.length ; index++ ){			
			if(deleteCommandes[i].id === commandes[index].id && deleteCommandes[i].status ==='delete'){				
				commandes.splice(index,1);				
			}
		}
	}		
	response.send(commandes);
});



