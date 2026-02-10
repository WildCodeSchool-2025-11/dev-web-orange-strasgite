import Footer from "../components/Footer";
import HeaderClient from "../components/Header-client";
import { useAuth } from "../context/AuthContext";
import { useReservations } from "../context/ReservationContext";

export default function MesReservationsPage() {
	const { user } = useAuth();
	const { reservations } = useReservations();
	if (!user) {
		return <div>Vous devez être connecté pour voir vos réservations</div>;
	}

	console.log("👤 User ID:", user.id);
	console.log("📋 Toutes les réservations:", reservations);

	const mesReservations = reservations.filter(
		(reservation) => reservation.userId === user.id,
	);

	console.log("✅ Mes réservations filtrées:", mesReservations);
	return (
		<>
			<HeaderClient />
			<div>
				<h1>Mes réservations</h1>
				{mesReservations.map((reservation) => (
					<div key={reservation.id}>
						<p> Chambre : {reservation.chambreId}</p>
						<p> Arrivée : {reservation.dateArrivee}</p>
						<p> Départ : {reservation.dateDepart}</p>
						<p>Personnes : {reservation.nombrePersonnes}</p>
						<p> Statut : {reservation.statut}</p>
					</div>
				))}
			</div>
			<Footer />
		</>
	);
}
