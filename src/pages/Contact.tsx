import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/Contact.css";

export default function Contact() {
	return (
		<>
			{/* Header en haut */}
			<Header />
			<div className="contact-container">
				<h1 className="contact-title">Nous Contacter</h1>

				<div className="contact-grid-three">
					{/* Colonne 1 : Coordonnées */}
					<div className="contact-details">
						<h2>Nos Coordonnées</h2>

						<div className="contact-item">
							<span className="icon">📍</span>
							<div className="contact-item-content">
								<strong>Adresse</strong>
								<p>
									123 Rue du Gîte
									<br />
									67000 Strasbourg, France
								</p>
							</div>
						</div>

						<div className="contact-item">
							<span className="icon">📞</span>
							<div className="contact-item-content">
								<strong>Téléphone</strong>
								<p>
									<a href="tel:+33123456789">+33 1 23 45 67 89</a>
								</p>
							</div>
						</div>

						<div className="contact-item">
							<span className="icon">✉️</span>
							<div className="contact-item-content">
								<strong>Email</strong>
								<p>
									<a href="mailto:contact@gite-strasbourg.fr">
										contact@gite-strasbourg.fr
									</a>
								</p>
							</div>
						</div>
					</div>

					{/* Colonne 2 : Formulaire */}
					<div className="contact-form-section">
						<h2>Envoyez-nous un message</h2>

						<form className="contact-form">
							<div className="form-group">
								<label htmlFor="name">Nom complet</label>
								<input
									type="text"
									id="name"
									name="name"
									placeholder="Votre nom"
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input
									type="email"
									id="email"
									name="email"
									placeholder="votre@email.com"
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="message">Message</label>
								<textarea
									id="message"
									name="message"
									rows={5}
									placeholder="Votre message..."
									required
								></textarea>
							</div>

							<button type="submit" className="submit-btn">
								Envoyer le message
							</button>
						</form>
					</div>

					{/* Colonne 3 : Carte */}
					<div className="contact-map">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42330.15!2d7.7521!3d48.5734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796c8495e18b2e9%3A0x971a483118ec8d0!2sStrasbourg!5e0!3m2!1sfr!2sfr!4v1234567890"
							allowFullScreen={true}
							loading="lazy"
							title="Localisation du gîte à Strasbourg"
						></iframe>
					</div>
				</div>

				{/* Avis en pleine largeur en bas */}
				<div className="contact-reviews">
					<ReviewsCarousel />
				</div>
			</div>
			{/* Footer en bas */}
			<Footer />
		</>
	);
}

import ReviewsCarousel from "../components/ReviewsCarousel";
