import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GerantDashboard() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	// Protection d'accès : uniquement pour les gérants
	if (!user || user.role !== "gerant") {
		return (
			<div style={{ padding: "30px" }}>
				<h2>Accès refusé</h2>
				<p>Cette page est réservée au gérant.</p>
			</div>
		);
	}

	const handleLogout = () => {
		logout(); // supprime auth-user
		navigate("/"); // retour à l'accueil
	};

	return (
		<div style={{ padding: "30px" }}>
			<h1 style={{ marginBottom: "10px" }}>Bienvenue {user.name} (Gérant)</h1>

			<p style={{ marginBottom: "20px" }}>
				Vous êtes connecté en tant que gérant.
			</p>

			<button type="button" onClick={handleLogout}>
				Se déconnecter et retourner à l'accueil
			</button>
		</div>
	);
}
