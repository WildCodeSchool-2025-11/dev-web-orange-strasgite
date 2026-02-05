import { useEffect } from "react";
import { attractions } from "../data/attractionsData";
import type { Attraction } from "../types/tourisme.types";
import "./Tourisme.css";

const Tourisme = () => {
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
			{/* Hero Section */}
			<div className="hero-tourisme">
				<div className="hero-contenu">
					<h1>Découvrez Strasbourg</h1>
					<p>Une ville authentique au cœur de l'Alsace</p>
				</div>
			</div>

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
							<div
								className="image-attraction"
								style={{ backgroundImage: `url(${attraction.image})` }}
							></div>
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
		</div>
	);
};

export default Tourisme;
