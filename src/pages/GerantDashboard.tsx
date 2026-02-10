import { useNavigate } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useReservations } from "../context/ReservationContext";

export default function GerantDashboard() {
	const { user, logout } = useAuth();
	const { reservations } = useReservations();
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
		<div>
			<BurgerMenu />
			<div style={{ padding: "30px" }}>
				<h1 style={{ marginBottom: "10px" }}>Bienvenue {user.name} (Gérant)</h1>

				<p style={{ marginBottom: "20px" }}>
					Vous êtes connecté en tant que gérant.
				</p>

				<div style={{ marginTop: "30px" }}>
					<h2>Toutes les réservations</h2>

					{reservations.length === 0 ? (
						<p>Aucune réservation pour le moment</p>
					) : (
						reservations.map((reservation) => (
							<div key={reservation.id}>
								<p> Chambre : {reservation.chambreId}</p>
								<p> Arrivée : {reservation.dateArrivee}</p>
								<p> Départ : {reservation.dateDepart}</p>
								<p>Personnes : {reservation.nombrePersonnes}</p>
								<p> Statut : {reservation.statut}</p>
							</div>
						))
					)}
				</div>

				<button type="button" onClick={handleLogout}>
					Se déconnecter et retourner à l'accueil
				</button>
				<Footer />
			</div>
		</div>
	);
}
