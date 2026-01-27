import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/global.css";

export default function Contact() {
	return (
		<>
			<Header />
			<main>
				<h1>Nous contacter</h1>
				{/*Coordonnées*/}
				<section className="coordonnees">
					<h2>Coordonnées</h2>
				<p>📍Adresse : quai Mullenheim, 67000 Strasbourg</p>
				<p>📞Téléphone : 03 88 12 34 56</p>
				<p>✉️Email : contact@strasgite.fr</p>
				<p>🕒Horaires d'ouverture : 9h - 18h du lundi au samedi</p>
				</section>
				
				{/*Carte*/}
				<section className="carte">  
				<h2>Où nous trouver</h2>
				<div className="map-container">
					<p>Carte interactive à intégrer ici</p>
				</div>
				</section>

				{/*Formulaire de contact*/}
				<section className="formulaire-contact">
					<h2>Envoyez-nous un message</h2>
					<p>formulaire à ajouter</p>
				</section>
				{/*Avis clients*/}
				<section className="avis-clients">
					<h2>Avis de nos clients</h2>
					<p>avis à intégrer ici</p>
				</section>
			</main>
			<Footer />
		</>
	);
}
