import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Footer from "../components/Footer";

import "../styles/global.css";
import "../styles/Rooms.css";
type Item = {
	id: number;
	nom: string;
	image_url: string;
	prix_par_nuit: number;
	isFavorite?: boolean;
};

function Rooms() {
	const [items, setItems] = useState<Item[]>([]);
	const toggleFavorite = (chambreId: number) => {
		const nouveauxItems = items.map((item) => {
			if (item.id === chambreId) {
				return { ...item, isFavorite: !item.isFavorite };
			}
			return item;
		});
		setItems(nouveauxItems);
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
				{items.slice(0, 6).map((item) => (
					<div className="bedroom-card" key={item.id}>
						<h2>{item.nom}</h2>
						<Link to={`/rooms/${item.id}`}>
							<img src={item.image_url} alt={item.nom} width="200" />
						</Link>
						<p className="text-content">{item.prix_par_nuit} € / nuit</p>
						<p className="text-content">Disponible</p>
						<Link to={`/rooms/${item.id}`}>
							<button type="button" className="start-btn">
								Voir détails
							</button>
						</Link>
						<button
							type="button"
							onClick={() => toggleFavorite(item.id)}
							className="favorite-btn"
						>
							{item.isFavorite ? "❤️" : "🤍"}
						</button>
					</div>
				))}
			</div>
			<Footer />
		</main>
	);
}

export default Rooms;
