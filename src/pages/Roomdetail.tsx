import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Footer from "../components/Footer";
import ReservationModal from "../components/ReservationModal";

type Item = {
	id: number;
	nom: string;
	image_url: string;
	prix_par_nuit: number;
};

function RoomDetail() {
	const { roomId } = useParams();
	const [room, setRoom] = useState<Item | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!roomId) return;
		const id = Number(roomId);
		fetch(`https://api-strasgite.vercel.app/items/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setRoom(data);
			})
			.catch((err) => console.error("Erreur fetch :", err));
	}, [roomId]);

	return (
		<main>
			<div className="rooms-header">
				<BurgerMenu />
			</div>

			<div className="room-detail-container">
				{room ? (
					<>
						<h1>{room.nom}</h1>
						<img src={room.image_url} alt={room.nom} width="400" />
						<p className="prix">{room.prix_par_nuit} € / nuit</p>
						<button
							type="button"
							className="start-btn"
							onClick={() => setIsOpen(true)}
						>
							Réserver
						</button>
					</>
				) : (
					<p>Chargement...</p>
				)}
			</div>

			<Footer />

			<ReservationModal
				isOpen={isOpen}
				selectedRoom={room}
				onClose={() => setIsOpen(false)}
			/>
		</main>
	);
}

export default RoomDetail;
