import Footer from "../components/Footer";
import HeaderClient from "../components/Header-client";
import { useFavorites } from "../context/FavoritesContext";

export default function MesFavorisPage() {
	const { favorites, removeFromFavorites } = useFavorites();

	return (
		<>
			<HeaderClient />
			<div className="favorites-page">
				<h1>Mes favoris ({favorites.length})</h1>

				{favorites.length === 0 ? (
					<div className="empty-favorites">
						<h2> Aucun favoris pour le moment</h2>
						<p>Ajoutez des chambres à vos favoris depuis la page Chambres</p>
						<a href="/rooms">Voir les chambres</a>
					</div>
				) : (
					<div className="favorites-grid">
						{favorites.map((room) => (
							<div key={room.id} className="favorite-card">
								<img src={room.image} alt={room.name} />
								<h3>{room.name}</h3>
								<p>{room.price}€ / nuit</p>

								<div className="actions">
									<button
										type="button"
										onClick={() => removeFromFavorites(room.id)}
									>
										Retirer des favoris
									</button>

									<a href={`/rooms/${room.id}`}>Voir les détails</a>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<Footer />
		</>
	);
}
