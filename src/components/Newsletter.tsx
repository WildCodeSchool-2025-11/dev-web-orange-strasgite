import { useState } from "react";
import "../styles/global.css";

function Newsletter() {
	const [email, setEmail] = useState("");
	const [status, setstatus] = useState("idle");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (email) {
			setstatus("success");
			setEmail("");

			setTimeout(() => {
				setstatus("idle");
			}, 5000);
		}
	};
	return (
		<div className="footerSection">
			<h3>Newsletter</h3>
			<p className="newsletterText">
				Restez informé de nos actualités et offres spéciales
			</p>
			<form className="newsletterForm" onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="Votre Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<button type="submit">S'inscrire</button>
				{status === "success" && (
					<p className="confirmMessage success">
						✅ Merci ! Vous recevrez bientôt nos actualités.
					</p>
				)}
				{status === "error" && (
					<p className="confirmMessage error">
						❌ Une erreur est survenue. Réessayez plus tard.
					</p>
				)}
			</form>
		</div>
	);
}
export default Newsletter;
