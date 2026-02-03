import { useState } from "react";

export default function LoginForm() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [message, setMessage] = useState<string | null>(null);

	const handleLogin = () => {
		if (!email || !password) {
			setMessage("Veuillez remplir tous les champs.");
			return;
		}

		const role = email.endsWith("@strasgite.fr") ? "gerant" : "client";

		localStorage.setItem("auth", "true");
		localStorage.setItem("role", role);
		localStorage.setItem("email", email);

		setMessage(`Connexion réussie (${role})`);
	};

	return (
		<div style={{ padding: "20px" }}>
			{message && <p>{message}</p>}

			<input
				type="email"
				placeholder="Adresse email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<input
				type="password"
				placeholder="Mot de passe"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button type="button" onClick={handleLogin}>
				Se connecter
			</button>
		</div>
	);
}
