import { useEffect, useState } from "react";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Footer from "../components/Footer";
import ReservationModal from "../components/ReservationModal";
import "../styles/global.css";
import "../styles/Rooms.css";
type Item = {
	id: number;
	nom: string;
	image_url: string;
	prix_par_nuit: number;
};

function Rooms() {
	const [items, setItems] = useState<Item[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedRoom, setSelectedRoom] = useState<Item | null>(null);

	const handleRoomClick = (room: Item) => {
		setIsOpen(true);
		setSelectedRoom(room);
	};
	const handleCloseModal = () => {
		setIsOpen(false);
		setSelectedRoom(null);
	};
	// mise en place du fetch
	useEffect(() => {
		fetch("https://api-strasgite.vercel.app/items")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setItems(data);
			});
	}, []);
	return (
		<main>
			<div className="rooms-header">
				<BurgerMenu />
			</div>
			<h1 className="main-title">Nos chambres</h1>
			<div className="bedroom-content">
				{items.map((item) => (
					<div className="bedroom-card" key={item.id}>
						<h2>{item.nom}</h2>
						<img src={item.image_url} alt={item.nom} width="200" />
						<p className="text-content">{item.prix_par_nuit} € / nuit</p>
						<p className="text-content">Disponible</p>
						<button
							type="button"
							className="start-btn"
							onClick={() => handleRoomClick(item)}
						>
							Réserver
						</button>
					</div>
				))}
			</div>
			<Footer />
			<ReservationModal
				isOpen={isOpen}
				selectedRoom={selectedRoom}
				onClose={handleCloseModal}
			/>
		</main>
	);
}

export default Rooms;
