import { useEffect, useState } from "react";

interface Avis {
	id: number;
	nom: string;
	note: number;
	commentaire: string;
	photo: string;
	ville: string;
}

interface RandomUserResult {
	results: Array<{
		name: {
			first: string;
			last: string;
		};
		picture: {
			large: string;
			medium: string;
			thumbnail: string;
		};
		location: {
			city: string;
			country: string;
		};
	}>;
}

// Avis mockés pour votre gîte à Strasbourg
const avisMockes: Avis[] = [
	{
		id: 1,
		nom: "Sophie Laurent",
		note: 5,
		commentaire:
			"Un excellent gîte avec un emplacement parfait pour explorer Strasbourg. Très propre et confortable. L'accueil chaleureux des propriétaires a rendu notre séjour inoubliable.",
		photo: "https://randomuser.me/api/portraits/women/44.jpg",
		ville: "Paris",
	},
	{
		id: 2,
		nom: "Marc Dubois",
		note: 5,
		commentaire:
			"Séjour merveilleux ! Le gîte est décoré avec goût et l'accueil est chaleureux. Nous avons adoré la proximité avec le centre-ville. Je recommande vivement pour une escapade en Alsace.",
		photo: "https://randomuser.me/api/portraits/men/32.jpg",
		ville: "Lyon",
	},
	{
		id: 3,
		nom: "Claire Martin",
		note: 4,
		commentaire:
			"Très bien situé, à deux pas du centre. Endroit calme et reposant pour découvrir l'Alsace. Le gîte est authentique et plein de charme. Parfait pour un week-end détente.",
		photo: "https://randomuser.me/api/portraits/women/68.jpg",
		ville: "Bordeaux",
	},
	{
		id: 4,
		nom: "Thomas Bernard",
		note: 5,
		commentaire:
			"Parfait pour une escapade en famille. Les propriétaires sont aux petits soins. Un vrai havre de paix au cœur de Strasbourg. Nous reviendrons sans hésiter !",
		photo: "https://randomuser.me/api/portraits/men/22.jpg",
		ville: "Marseille",
	},
	{
		id: 5,
		nom: "Émilie Rousseau",
		note: 5,
		commentaire:
			"Gîte magnifique et authentique. La décoration alsacienne est sublime. Très propre, bien équipé et idéalement situé. Une adresse à retenir absolument !",
		photo: "https://randomuser.me/api/portraits/women/90.jpg",
		ville: "Nantes",
	},
];

export default function ReviewsCarousel() {
	const [avis, setAvis] = useState<Avis[]>([]);
	const [indexActuel, setIndexActuel] = useState(0);
	const [chargement, setChargement] = useState(true);

	useEffect(() => {
		const fetchAvis = async () => {
			try {
				const response = await fetch(
					"https://randomuser.me/api/?results=5&nat=fr",
				);

				if (!response.ok) {
					throw new Error("Erreur réseau");
				}

				const data: RandomUserResult = await response.json();

				const commentairesGite = [
					"Un excellent gîte avec un emplacement parfait pour explorer Strasbourg. Très propre et confortable. L'accueil chaleureux des propriétaires a rendu notre séjour inoubliable.",
					"Séjour merveilleux ! Le gîte est décoré avec goût et l'accueil est chaleureux. Nous avons adoré la proximité avec le centre-ville. Je recommande vivement.",
					"Très bien situé, à deux pas du centre. Endroit calme et reposant pour découvrir l'Alsace. Le gîte est authentique et plein de charme.",
					"Parfait pour une escapade en famille. Les propriétaires sont aux petits soins. Un vrai havre de paix au cœur de Strasbourg.",
					"Gîte magnifique et authentique. La décoration alsacienne est sublime. Très propre, bien équipé et idéalement situé !",
				];

				const avisAPI = data.results.map((user, index) => ({
					id: index + 1,
					nom: `${user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1)} ${user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1)}`,
					note: Math.random() > 0.3 ? 5 : 4,
					commentaire: commentairesGite[index],
					photo: user.picture.large,
					ville:
						user.location.city.charAt(0).toUpperCase() +
						user.location.city.slice(1),
				}));

				setAvis(avisAPI);
			} catch (error) {
				console.error("Erreur lors de la récupération des avis :", error);
				setAvis(avisMockes);
			} finally {
				setChargement(false);
			}
		};

		fetchAvis();
	}, []);

	useEffect(() => {
		if (avis.length === 0) return;

		const changerAvis = () => {
			setIndexActuel((prevIndex) => (prevIndex + 1) % avis.length);
		};

		const timer = setInterval(changerAvis, 6000);
		return () => clearInterval(timer);
	}, [avis]);

	if (chargement) {
		return (
			<div className="reviews-carousel">
				<p>Chargement des avis...</p>
			</div>
		);
	}

	if (avis.length === 0) {
		return (
			<div className="reviews-carousel">
				<p>Aucun avis disponible pour le moment.</p>
			</div>
		);
	}

	const avisActuel = avis[indexActuel];

	return (
		<div className="reviews-carousel">
			<h2 className="reviews-title">Ce que disent nos clients</h2>

			<div className="review-card-horizontal">
				<img
					src={avisActuel.photo}
					alt={avisActuel.nom}
					className="review-photo-horizontal"
				/>
				<div className="review-content">
					<div className="stars">
						{"★".repeat(avisActuel.note)}
						{"☆".repeat(5 - avisActuel.note)}
					</div>
					<p className="commentaire">"{avisActuel.commentaire}"</p>
					<div className="review-author">
						<p className="nom-client">{avisActuel.nom}</p>
						<p className="ville-client">{avisActuel.ville}</p>
					</div>
				</div>
			</div>

			<div className="carousel-indicators">
				{avis.map((_, index) => (
					<button
						key={index}
						className={`indicator ${index === indexActuel ? "active" : ""}`}
						onClick={() => setIndexActuel(index)}
						aria-label={`Afficher l'avis ${index + 1}`}
						type="button"
					/>
				))}
			</div>
		</div>
	);
}
