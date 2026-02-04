import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Footer from "../components/Footer";
import ReservationModal from "../components/ReservationModal";
import "../styles/RoomDetail.css";

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
	console.log(roomId);

	useEffect(() => {
		if (!roomId) return;
		const id = Number(roomId);
		fetch(`https://api-strasgite.vercel.app/items/${id}`)
			.then((res) => res.json())
			.then((data) => {
				console.log("Données reçues :", data);
				setRoom(data);
			})
			.catch((err) => console.error("Erreur fetch :", err));
	}, [roomId]);

	return (
		<div>
			<BurgerMenu />

			<h1>RoomDetail Page</h1>
			{room ? (
				<div>
					<h2>{room.nom}</h2>
					<img src={room.image_url} alt={room.nom} />
					<p> {room.prix_par_nuit} € / nuit </p>
					<button type="button" onClick={() => setIsOpen(true)}>
						Réserver
					</button>
				</div>
			) : (
				<p>Chargement ...</p>
			)}

			<Footer />
			<ReservationModal
				isOpen={isOpen}
				selectedRoom={room}
				onClose={() => setIsOpen(false)}
			/>
		</div>
	);
}

export default RoomDetail;
