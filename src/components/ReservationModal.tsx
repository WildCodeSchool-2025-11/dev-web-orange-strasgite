import { useState } from "react";
import "../styles/Rooms.css";
type Item = {
	id: number;
	nom: string;
	image_url: string;
	prix_par_nuit: number;
};
type ReservationModalProps = {
	isOpen: boolean;
	selectedRoom: Item | null;
	onClose: () => void;
};

function ReservationModal({
	isOpen,
	selectedRoom,
	onClose,
}: ReservationModalProps) {
	if (isOpen === false) return null;
	if (!selectedRoom) return null;
	const [dateArrivee, setDateArrivee] = useState<string>("");
	const [dateDepart, setDateDepart] = useState<string>("");
	const [nombrePersonne, setNombrePersonne] = useState<string>("");
	const handleValiderReservation = () => {};

	return (
		<div className="modal-backdrop">
			<div className="modal-content">
				<h2>Réservation</h2>
				<p>{selectedRoom.nom}</p>
				<p>{selectedRoom.prix_par_nuit} €</p>
				<label>
					Date d'arrivée :
					<input
						type="date"
						value={dateArrivee}
						onChange={(e) => setDateArrivee(e.target.value)}
					/>
				</label>
				<label>
					Date de départ :
					<input
						type="date"
						value={dateDepart}
						onChange={(e) => setDateDepart(e.target.value)}
					/>
				</label>
				<label>
					Nombre de personnes :
					<input
						type="number"
						value={nombrePersonne}
						onChange={(e) => setNombrePersonne(e.target.value)}
					/>
				</label>

				<button
					type="button"
					className="reservation-btn"
					onClick={handleValiderReservation}
				>
					Valider ma réservation
				</button>

				<button type="button" className="close-btn" onClick={onClose}>
					Fermer
				</button>
			</div>
		</div>
	);
}
export default ReservationModal;
