import type { Attraction } from "../types/tourisme.types";

export const attractions: Attraction[] = [
	{
		id: 1,
		titre: "Cathédrale Notre-Dame",
		categorie: "",
		description:
			"Chef-d'œuvre de l'art gothique, la cathédrale domine Strasbourg avec sa flèche de 142 mètres. Son horloge astronomique et ses vitraux médiévaux sont exceptionnels.",
		image: "./src/assets/images/cathedrale.jpg",
		lieu: "Place de la Cathédrale",
		distance: "10 min à pied",
	},
	{
		id: 2,
		titre: "La Petite France",
		categorie: "",
		description:
			"Quartier pittoresque aux maisons à colombages, canaux romantiques et ruelles pavées. L'âme médiévale de Strasbourg s'y dévoile à chaque coin de rue.",
		image: "./src/assets/images/petitefrance.jpg",
		lieu: "Quartier historique",
		distance: "15 min à pied",
	},
	{
		id: 3,
		titre: "Palais Rohan",
		categorie: "",
		description:
			"Ancien palais épiscopal du XVIIIe siècle abritant trois musées : arts décoratifs, beaux-arts et archéologie. Architecture somptueuse de style classique français.",
		image: "./src/assets/images/palais.jpg",
		lieu: "2 Place du Château",
		distance: "8 min à pied",
	},
	{
		id: 4,
		titre: "Parlement Européen",
		categorie: "",
		description:
			"Symbole de l'Europe moderne, ce bâtiment impressionnant se visite pour comprendre le fonctionnement des institutions européennes.",
		image: "./src/assets/images/parlement.png",
		lieu: "Quartier européen",
		distance: "20 min en tram",
	},
	{
		id: 5,
		titre: "Parc de l'Orangerie",
		categorie: "",
		description:
			"Plus ancien parc public de Strasbourg, ce havre de paix offre 26 hectares de verdure, un lac, une mini-ferme et de magnifiques promenades.",
		image: "./src/assets/images/PARC.jpg",
		lieu: "Avenue de l'Europe",
		distance: "25 min en tram",
	},
	{
		id: 6,
		titre: "Christkindelsmärik",
		categorie: "",
		description:
			"Le plus ancien marché de Noël de France (depuis 1570) transforme Strasbourg en capitale de Noël. Illuminations féeriques, vin chaud et bredele vous attendent.",
		image: "./src/assets/images/noel.jpg",
		lieu: "Centre-ville",
		distance: "Nov-Déc uniquement",
	},
];
