import { FavoriteBorder } from "@mui/icons-material";
import { Box, Button, Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
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
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							minHeight: "50vh",
						}}
					>
						<Card
							sx={{
								p: 6,
								textAlign: "center",
								backgroundColor: "white",
								borderRadius: 3,
								maxWidth: 500,
								boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
							}}
						>
							<FavoriteBorder sx={{ fontSize: 80, color: "#e6b09b", mb: 2 }} />
							<Typography variant="h5" gutterBottom fontWeight="bold">
								Aucun favori pour le moment
							</Typography>
							<Typography color="text.secondary" sx={{ mb: 3 }}>
								Ajoutez des chambres à vos favoris depuis la page Chambres
							</Typography>
							<Link to="/rooms" style={{ textDecoration: "none" }}>
								<Button
									variant="contained"
									sx={{
										py: 1.5,
										px: 4,
										borderRadius: 2,
										textTransform: "none",
										fontSize: "1rem",
										fontWeight: "bold",
										backgroundColor: "#e6b09b",
										"&:hover": {
											backgroundColor: "#d19a85",
										},
									}}
								>
									Voir les chambres
								</Button>
							</Link>
						</Card>
					</Box>
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
