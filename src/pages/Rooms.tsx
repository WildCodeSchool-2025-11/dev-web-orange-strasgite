import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
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
			<Header />
			<h1>Nos chambres</h1>
			<div className="bedroom-content">
				{items.map((item) => (
					<div key={item.id}>
						<h2>{item.nom}</h2>
						<img src={item.image_url} alt={item.nom} width="200" />
						<p>{item.prix_par_nuit} € / nuit</p>
						<p>Disponible</p>
					</div>
				))}
			</div>
			<Footer />
		</main>
	);
}

export default Rooms;
