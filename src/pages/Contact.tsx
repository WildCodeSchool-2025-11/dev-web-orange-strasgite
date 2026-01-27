import ContactForm from "../components/ContactForm";
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
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2639.0649297328196!2d7.7608167767438045!3d48.58945561959435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796c8f7c00ec99d%3A0xecd3442f9a6ecd8a!2sQuai%20Mullenheim%2C%2067000%20Strasbourg!5e0!3m2!1sfr!2sfr!4v1769511593585!5m2!1sfr!2sfr"
							width="600"
							height="450"
							style={{ border: 0 }}
							allowFullScreen={true}
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							title="localiser le gite"
						></iframe>
					</div>
				</section>

				{/*Formulaire de contact*/}
				<section className="formulaire-contact">
					<h2>Envoyez-nous un message</h2>
					<ContactForm />
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
