import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
	const { register } = useAuth();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState<"client" | "gerant">("client");
	const [error, setError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const ok = register(name, email, password, role);

		if (!ok) {
			setError("Un compte existe déjà avec cet email");
			return;
		}

		onSuccess();
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{ display: "flex", flexDirection: "column", gap: "10px" }}
		>
			<input
				type="text"
				placeholder="Nom complet"
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

			<select
				value={role}
				onChange={(e) => setRole(e.target.value as "client" | "gerant")}
			>
				<option value="client">Client</option>
				<option value="gerant">Gérant</option>
			</select>

			{error && <p style={{ color: "red" }}>{error}</p>}

			<button type="submit">Créer un compte</button>
		</form>
	);
}
