import { useEffect, useState } from "react";

interface Avis {
	id: number;
	nom: string;
	note: number;
	commentaire: string;
}
interface CommentApi {
	id: number;
	name: string;
	body: string;
}
//Données mockées pour le developpement
const avisMockes: Avis[] = [
	{
		id: 1,
		nom: "Jean Dupont",
		note: 5,
		commentaire:
			"Un excellent gîte avec un emplacement parfait pour explorer Strasbourg.",
	},
	{
		id: 2,
		nom: "Marie Martin",
		note: 4,
		commentaire:
			"Très bien décoré et propre. Un endroit chaleureux pour se reposer.",
	},
	{
		id: 3,
		nom: "Pierre Durand",
		note: 5,
		commentaire:
			"Parfait pour une escapade en famille. Le personnel est très accueillant.",
	},
];

export default function ReviewsCarousel() {
	//stock les avis recupérés
	const [avis, setAvis] = useState<Avis[]>([]);
	//index de l'avis affiché
	const [indexActuel, setIndexActuel] = useState(0);
	//savoir si les avis sont en cours de chargement
	const [Chargement, setChargement] = useState(true);
	//recupérer les avis depuis une API fictive avec fallback aux données mockées
	useEffect(() => {
		const fetchAvis = async () => {
			try {
				//tentative de récupération des avis depuis une API fictive
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/comments?_limit=5",
				);
				if (!response.ok) {
					throw new Error("Erreur réseau");
				}
				const data: CommentApi[] = await response.json();
				//transformer les données reçues en tableau d'avis
				const avisFictifs = data.map((item: CommentApi) => ({
					id: item.id,
					nom: item.name,
					note: Math.floor(Math.random() * 2) + 4, //note aléatoire entre 4 et 5
					commentaire: `${item.body.substring(0, 100)}...`,
					//limiter le commentaire à 100 caractères
				}));
				setAvis(avisFictifs); //stocker les avis
			} catch (error) {
				console.error("Erreur lors de la récupération des avis :", error);
				console.log("Utilisation des avis mockés.");
				setAvis(avisMockes); //utiliser les données mockées en cas d'erreur
			} finally {
				setChargement(false);
			}
		};
		fetchAvis();
	}, []);
	//fonction pour changer l'avis affiché
	useEffect(() => {
		if (avis.length === 0) {
			return;
		}
		const changerAvis = () => {
			setIndexActuel((prevIndex) => (prevIndex + 1) % avis.length);
		};
		const timer = setInterval(changerAvis, 5000);
		return () => clearInterval(timer);
	}, [avis]);
	if (Chargement) {
		return (
			<div className="reviews-carousel">
				<p>Chargement des avis...</p>
			</div>
		);
	} //si pas d'avis
	if (avis.length === 0) {
		return (
			<div className="reviews-carousel">
				<p>Aucun avis disponible pour le moment.</p>
			</div>
		);
	} //afficher l'avis actuel
	const avisActuel = avis[indexActuel];
	return (
		<div className="reviews-carousel">
			<div className="review-card">
				{/*afficher des étoiles en fonction de la note*/}
				<div className="stars">{"★".repeat(avisActuel.note)}</div>
				<p className="commentaire">"{avisActuel.commentaire}"</p>
				<p className="nom-client">- {avisActuel.nom}</p>
			</div>

			<div className="carousel-indicators">
				{avis.map((_, index) => (
					<button
						type="button"
						key={index}
						className={`indicator ${index === indexActuel ? "active" : ""}`}
						onClick={() => setIndexActuel(index)}
					></button>
				))}
			</div>
		</div>
	);
}
