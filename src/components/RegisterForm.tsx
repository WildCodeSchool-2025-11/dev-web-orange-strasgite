import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
	const { register } = useAuth();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const ok = register(name, email, password);

		if (!ok) {
			setError("Cet email existe déjà");
			return;
		}

		setError("");
		onSuccess();
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{ display: "flex", flexDirection: "column", gap: "12px" }}
		>
			<h3>Créer un compte</h3>

			{error && <p style={{ color: "red" }}>{error}</p>}

			<input
				type="text"
				placeholder="Votre nom"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>

			<input
				type="email"
				placeholder="Adresse email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>

			<input
				type="password"
				placeholder="Mot de passe"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>

			<button type="submit">Créer mon compte</button>
		</form>
	);
}
