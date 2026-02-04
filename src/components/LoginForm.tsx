import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ onSuccess }: { onSuccess: () => void }) {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const ok = login(email, password);

		if (!ok) {
			setError("Email ou mot de passe incorrect");
			return;
		}

		// 🔥 On lit le rôle APRÈS login, pas via hasRole()
		const isGerant = email === "gerant@strasgite.fr";

		if (isGerant) {
			navigate("/gerant");
		} else {
			navigate("/");
		}

		// 🔥 On ferme le modal après la redirection
		setTimeout(() => {
			onSuccess();
		}, 50);
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "12px",
				width: "100%",
			}}
		>
			<h2>Connexion</h2>

			{error && (
				<p style={{ color: "red", margin: 0, fontSize: "14px" }}>{error}</p>
			)}

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

			<button type="submit">Se connecter</button>
		</form>
	);
}
