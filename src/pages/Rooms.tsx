import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Container,
	IconButton,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AccountAvatar from "../components/AccountAvatar";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Footer from "../components/Footer";
import { useFavorites } from "../context/FavoritesContext";

type Item = {
	id: number;
	nom: string;
	images_urls: string[];
	prix_par_nuit: number;
	isFavorite?: boolean;
};

function Rooms() {
	const [items, setItems] = useState<Item[]>([]);
	const { toggleFavorite, isFavorite } = useFavorites();

	// Mise en place du fetch
	useEffect(() => {
		fetch("https://api-projet-2-strasgite.vercel.app/api/chambres")
			.then((res) => res.json())
			.then((data) => {
				setItems(data);
			})
			.catch((err) => console.error("Erreur fetch:", err));
	}, []);

	return (
		<>
			<AccountAvatar />
			<Box sx={{ backgroundColor: "#f2e6d8", minHeight: "100vh" }}>
				{/* Header avec BurgerMenu */}
				<Box sx={{ py: 2 }}>
					<BurgerMenu />
				</Box>

				{/* Container principal */}
				<Container maxWidth="lg" sx={{ py: 4 }}>
					{/* Titre principal */}
					<Typography
						variant="h3"
						component="h1"
						fontWeight="bold"
						textAlign="center"
						sx={{
							mb: 6,
							color: "#692817",
						}}
					>
						Nos chambres
					</Typography>

					{/* Grille de cartes */}
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: {
								xs: "1fr", // 1 colonne sur mobile
								sm: "repeat(2, 1fr)", // 2 colonnes sur tablette
								md: "repeat(3, 1fr)", // 3 colonnes sur desktop
							},
							gap: 3,
						}}
					>
						{items.map((item) => (
							<Card
								key={item.id}
								sx={{
									height: "100%",
									display: "flex",
									flexDirection: "column",
									borderRadius: 3,
									boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
									transition: "transform 0.3s ease, box-shadow 0.3s ease",
									"&:hover": {
										transform: "translateY(-8px)",
										boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
									},
									position: "relative",
								}}
							>
								{/* Bouton favori en position absolue */}
								<IconButton
									onClick={() =>
										toggleFavorite({
											id: item.id.toString(),
											name: item.nom,
											price: item.prix_par_nuit,
											image: item.images_urls[0],
										})
									}
								>
									{isFavorite(item.id.toString()) ? (
										<Favorite sx={{ color: "#e63946" }} />
									) : (
										<FavoriteBorder />
									)}
								</IconButton>

								{/* Image cliquable */}
								<Link
									to={`/rooms/${item.id}`}
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<CardMedia
										component="img"
										height="240"
										image={item.images_urls[0]}
										alt={item.nom}
										sx={{
											objectFit: "cover",
										}}
									/>
								</Link>

								{/* Contenu de la carte */}
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography
										variant="h5"
										component="h2"
										fontWeight="bold"
										gutterBottom
										sx={{ color: "#692817" }}
									>
										{item.nom}
									</Typography>

									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											mb: 2,
										}}
									>
										<Typography variant="h6" color="primary" fontWeight="bold">
											{item.prix_par_nuit} €
										</Typography>
										<Typography variant="body2" color="text.secondary">
											/ nuit
										</Typography>
									</Box>

									<Chip
										label="Disponible"
										color="success"
										size="small"
										sx={{ fontWeight: "medium" }}
									/>
								</CardContent>

								{/* Actions */}
								<CardActions sx={{ p: 2, pt: 0 }}>
									<Link
										to={`/rooms/${item.id}`}
										style={{ textDecoration: "none", width: "100%" }}
									>
										<Button
											variant="contained"
											fullWidth
											sx={{
												py: 1.5,
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
											Voir détails
										</Button>
									</Link>
								</CardActions>
							</Card>
						))}
					</Box>
				</Container>

				<Footer />
			</Box>
		</>
	);
}

export default Rooms;
