// ContactForm.tsx

import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

export default function ContactForm() {
	const formRef = useRef<HTMLFormElement | null>(null);
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setSubmitted(false);
		setErrorMessage(null);

		if (!formRef.current) {
			console.error("Form reference is null");
			setErrorMessage("Le formulaire n'a pas été trouvé !");
			return;
		}

		// 🔹 Vérification des variables d'environnement
		console.log("Service ID :", import.meta.env.VITE_EMAILJS_SERVICE_ID);
		console.log("Template ID :", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
		console.log("Public Key :", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

		// 🔹 Affichage des données du formulaire pour debug
		const formData = new FormData(formRef.current);
		console.log(
			"Données du formulaire :",
			Object.fromEntries(formData.entries()),
		);

		setLoading(true);

		emailjs
			.sendForm(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
				formRef.current,
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
			)
			.then(() => {
				console.log("Email envoyé ✅");
				setSubmitted(true);
				formRef.current?.reset();
			})
			.catch((error) => {
				console.error("Erreur EmailJS :", error);
				setErrorMessage(
					"Erreur lors de l'envoi du message. Vérifie la console.",
				);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<form ref={formRef} onSubmit={sendEmail}>
			<div>
				<label htmlFor="name">Nom :</label>
				<input type="text" id="name" name="name" required autoComplete="name" />
			</div>

			<div>
				<label htmlFor="email">Email :</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					autoComplete="email"
				/>
			</div>

			<div>
				<label htmlFor="message">Message :</label>
				<textarea id="message" name="message" required autoComplete="off" />
			</div>

			<button type="submit" disabled={loading}>
				{loading ? "Envoi..." : "Envoyer"}
			</button>

			{submitted && (
				<p style={{ color: "green", marginTop: "10px" }}>
					Merci pour votre message ! Nous vous répondrons bientôt.
				</p>
			)}

			{errorMessage && (
				<p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
			)}
		</form>
	);
}
