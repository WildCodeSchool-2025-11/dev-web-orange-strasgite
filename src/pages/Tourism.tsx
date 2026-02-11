import { useEffect } from "react";

import strasbourgImage from "../assets/images/strasbourg.jpg";
import AccountAvatar from "../components/AccountAvatar";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero/PageHero";
import { attractions } from "../data/attractionsData";
import type { Attraction } from "../types/tourisme.types";
import "../styles/global.css";
import "../styles/Home.css";
import "../styles/Tourism.css";

const Tourism = () => {
	useEffect(() => {
		// Animation au scroll
		const observateur = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("visible");
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: "0px 0px -50px 0px",
			},
		);

		document.querySelectorAll(".fade-in-scroll").forEach((element) => {
			observateur.observe(element);
		});

		return () => observateur.disconnect();
	}, []);

	return (
		<div className="page-tourisme">
			{/* Header personnalisé avec BurgerMenu */}
			<div className="home-header">
				<AccountAvatar />
				<BurgerMenu />
			</div>

			{/* Hero Section avec le composant réutilisable */}
			<PageHero
				title="Découvrez Strasbourg"
				subtitle="Une ville authentique au cœur de l'Alsace"
				backgroundImage={strasbourgImage}
			/>

			{/* Contenu principal */}
			<div className="conteneur">
				{/* Introduction */}
				<div className="intro fade-in-scroll">
					<h2>Que faire à Strasbourg ?</h2>
					<p>
						Capitale européenne et alsacienne, Strasbourg vous offre un
						patrimoine historique exceptionnel, une gastronomie généreuse et une
						atmosphère unique. Depuis notre gîte, partez à la découverte des
						trésors de cette ville magnifique.
					</p>
				</div>

				{/* Grille des attractions */}
				<div id="monuments" className="grille-attractions">
					{attractions.map((attraction: Attraction) => (
						<div
							key={attraction.id}
							className="carte-attraction fade-in-scroll"
						>
							<a
								href={attraction.url}
								target="_blank"
								rel="noopener noreferrer"
								className="image-attraction-link"
							>
								<div
									className="image-attraction"
									style={{ backgroundImage: `url(${attraction.image})` }}
								>
									<div className="badge-categorie">{attraction.categorie}</div>
								</div>
							</a>
							<div className="contenu-attraction">
								<h3>{attraction.titre}</h3>
								<p>{attraction.description}</p>

								<div className="infos-pratiques">
									<div className="info-item">
										<svg
											className="icone"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<title>Localisation</title>
											<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
										</svg>
										<span>{attraction.lieu}</span>
									</div>
									<div className="info-item">
										<svg
											className="icone"
											viewBox="0 0 24 24"
											aria-hidden="true"
										>
											<title>Temps de trajet</title>
											<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
										</svg>
										<span>{attraction.distance}</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default Tourism;
