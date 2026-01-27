import { useState } from "react";

export default function ContactForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name">Nom :</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="email">Email :</label>
				<input
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="message">Message :</label>
				<textarea
					id="message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				></textarea>
			</div>
			<button type="submit">Envoyer</button>
			{submitted && (
				<p>Merci pour votre message ! Nous vous répondrons bientôt.</p>
			)}
		</form>
	);
}
