import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import contactImage from "../assets/images/contact-hero.jpg";
import AccountAvatar from "../components/AccountAvatar";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero/PageHero";
import ReviewsCarousel from "../components/ReviewsCarousel";

import "../styles/Home.css";
import "../styles/Contact.css";

export default function ContactPage() {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!formRef.current) return;

		setSubmitted(false);
		setErrorMessage(null);
		setLoading(true);

		emailjs
			.sendForm(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
				formRef.current,
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
			)
			.then(() => {
				setSubmitted(true);
				formRef.current?.reset();
			})
			.catch(() => {
				setErrorMessage("Erreur lors de l'envoi ❌");
			})
			.finally(() => setLoading(false));
	};

	return (
		<>
			<div className="home-header">
				<AccountAvatar />
				<BurgerMenu />
			</div>

			<main>
				<PageHero
					title="Contactez-nous"
					subtitle="Nous sommes là pour répondre à vos questions"
					backgroundImage={contactImage}
				/>

				<div className="contact-container">
					<div className="contact-grid-three">
						{/* Coordonnées */}
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

						{/* Formulaire */}
						<div className="contact-form-section">
							<h2>Envoyez-nous un message</h2>

							<form ref={formRef} onSubmit={sendEmail} className="contact-form">
								<div className="form-group">
									<label htmlFor="name">Nom complet</label>
									<input
										type="text"
										id="name"
										name="name"
										required
										autoComplete="name"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input
										type="email"
										id="email"
										name="email"
										required
										autoComplete="email"
									/>
								</div>

								<div className="form-group">
									<label htmlFor="message">Message</label>
									<textarea id="message" name="message" rows={5} required />
								</div>

								<button type="submit" className="submit-btn" disabled={loading}>
									{loading ? "Envoi..." : "Envoyer le message"}
								</button>

								{submitted && (
									<p className="success-message">
										Merci pour votre message ! Nous vous répondrons bientôt.
									</p>
								)}

								{errorMessage && (
									<p className="error-message">{errorMessage}</p>
								)}
							</form>
						</div>

						{/* Carte */}
						<div className="contact-map">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42330.15!2d7.7521!3d48.5734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4796c8495e18b2e9%3A0x971a483118ec8d0!2sStrasbourg!5e0!3m2!1sfr!2sfr!4v1234567890"
								allowFullScreen
								loading="lazy"
								title="Localisation du gîte à Strasbourg"
							/>
						</div>
					</div>

					<div className="contact-reviews">
						<ReviewsCarousel />
					</div>
				</div>

				<Footer />
			</main>
		</>
	);
}
