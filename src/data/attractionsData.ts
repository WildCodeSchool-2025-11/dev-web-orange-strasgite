import type { Attraction, Conseil } from "../types/tourisme.types";

export const attractions: Attraction[] = [
	{
		id: 1,
		titre: "Cathédrale Notre-Dame",
		categorie: "Monument",
		description:
			"Chef-d'œuvre de l'art gothique, la cathédrale domine Strasbourg avec sa flèche de 142 mètres. Son horloge astronomique et ses vitraux médiévaux sont exceptionnels.",
		image: "/images/tourisme/cathedrale.jpg",
		lieu: "Place de la Cathédrale",
		distance: "10 min à pied",
	},
	{
		id: 2,
		titre: "La Petite France",
		categorie: "Quartier",
		description:
			"Quartier pittoresque aux maisons à colombages, canaux romantiques et ruelles pavées. L'âme médiévale de Strasbourg s'y dévoile à chaque coin de rue.",
		image: "/images/tourisme/petite-france.jpg",
		lieu: "Quartier historique",
		distance: "15 min à pied",
	},
	{
		id: 3,
		titre: "Palais Rohan",
		categorie: "Musée",
		description:
			"Ancien palais épiscopal du XVIIIe siècle abritant trois musées : arts décoratifs, beaux-arts et archéologie. Architecture somptueuse de style classique français.",
		image: "/images/tourisme/palais-rohan.jpg",
		lieu: "2 Place du Château",
		distance: "8 min à pied",
	},
	{
		id: 4,
		titre: "Parlement Européen",
		categorie: "Institution",
		description:
			"Symbole de l'Europe moderne, ce bâtiment impressionnant se visite pour comprendre le fonctionnement des institutions européennes.",
		image: "/images/tourisme/parlement.jpg",
		lieu: "Quartier européen",
		distance: "20 min en tram",
	},
	{
		id: 5,
		titre: "Parc de l'Orangerie",
		categorie: "Nature",
		description:
			"Plus ancien parc public de Strasbourg, ce havre de paix offre 26 hectares de verdure, un lac, une mini-ferme et de magnifiques promenades.",
		image: "/images/tourisme/orangerie.jpg",
		lieu: "Avenue de l'Europe",
		distance: "25 min en tram",
	},
	{
		id: 6,
		titre: "Christkindelsmärik",
		categorie: "Événement",
		description:
			"Le plus ancien marché de Noël de France (depuis 1570) transforme Strasbourg en capitale de Noël. Illuminations féeriques, vin chaud et bredele vous attendent.",
		image: "/images/tourisme/noel.jpg",
		lieu: "Centre-ville",
		distance: "Nov-Déc uniquement",
	},
];

export const conseils: Conseil[] = [
	{
		id: 1,
		icone: "🚲",
		titre: "Se déplacer",
		description:
			"Strasbourg est la ville du vélo ! Louez un Vélhop pour découvrir la ville en toute liberté. Le tram et les bus sont également très pratiques.",
	},
	{
		id: 2,
		icone: "🍷",
		titre: "Gastronomie",
		description:
			"Ne manquez pas la choucroute, le baeckeoffe et la tarte flambée dans une Winstub traditionnelle. Accompagnez le tout d'un Riesling ou Gewurztraminer local.",
	},
	{
		id: 3,
		icone: "📅",
		titre: "Meilleure période",
		description:
			"Décembre pour le marché de Noël, printemps et été pour les balades en bateau sur l'Ill. Chaque saison a son charme particulier à Strasbourg.",
	},
	{
		id: 4,
		icone: "🎫",
		titre: "Pass Strasbourg",
		description:
			"Le Strasbourg Pass vous donne accès à de nombreux musées et monuments, plus les transports en commun gratuits. Idéal pour 2-3 jours de visite.",
	},
];
