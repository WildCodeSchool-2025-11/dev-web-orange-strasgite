// Import des icônes MUI
import {
	AcUnit,
	ArrowBack,
	Kitchen,
	LocalParking,
	Pets,
	Tv,
	Wifi,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Chip,
	Container,
	Divider,
	Paper,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import ReservationModal from "../components/ReservationModal";

type Item = {
	id: number;
	nom: string;
	image_url: string;
	prix_par_nuit: number;
};

function RoomDetail() {
	const { roomId } = useParams();
	const navigate = useNavigate();
	const [room, setRoom] = useState<Item | null>(null);
	const [isOpen, setIsOpen] = useState(false);

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

	// Loading state
	if (!room) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "100vh",
				}}
			>
				<Typography variant="h5" color="text.secondary">
					Chargement...
				</Typography>
			</Box>
		);
	}

	return (
		<>
			<Header />
			<Box sx={{ backgroundColor: "#f2e6d8", minHeight: "100vh" }}>
				{/* Container principal */}
				<Container maxWidth="lg" sx={{ py: 4 }}>
					{/* Bouton retour */}
					<Button
						startIcon={<ArrowBack />}
						onClick={() => navigate("/rooms")}
						sx={{
							mb: 3,
							color: "#692817",
							"&:hover": {
								backgroundColor: "rgba(105, 40, 23, 0.08)",
							},
						}}
					>
						Retour aux chambres
					</Button>

					{/* Titre de la chambre */}
					<Typography
						variant="h4"
						component="h1"
						fontWeight="bold"
						gutterBottom
					>
						{room.nom}
					</Typography>

					{/* Image principale - Style Airbnb avec bordure arrondie */}
					<Box
						sx={{
							width: "100%",
							height: { xs: "300px", md: "500px" }, // Responsive
							borderRadius: 3,
							overflow: "hidden",
							mb: 4,
							boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
						}}
					>
						<img
							src={room.image_url}
							alt={room.nom}
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
							}}
						/>
					</Box>

					{/* Layout 2 colonnes avec Flexbox */}
					<Box
						sx={{
							display: "flex",
							flexDirection: { xs: "column", md: "row" }, // Colonne sur mobile, ligne sur desktop
							gap: 4,
						}}
					>
						{/* Colonne de gauche : Informations */}
						<Box sx={{ flex: { md: "1 1 58%" } }}>
							{/* Section Prix */}
							<Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
								<Typography variant="h5" fontWeight="bold" gutterBottom>
									Informations
								</Typography>
								<Divider sx={{ my: 2 }} />

								<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
									<Typography variant="h4" color="primary" fontWeight="bold">
										{room.prix_par_nuit} €
									</Typography>
									<Typography variant="body1" color="text.secondary">
										par nuit
									</Typography>
								</Box>
							</Paper>

							{/* Section Commodités */}
							<Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
								<Typography variant="h5" fontWeight="bold" gutterBottom>
									Commodités
								</Typography>
								<Divider sx={{ my: 2 }} />

								{/* Grille d'icônes avec Flexbox */}
								<Box
									sx={{
										display: "flex",
										flexWrap: "wrap",
										gap: 2,
									}}
								>
									{/* WiFi */}
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											width: { xs: "100%", sm: "calc(50% - 8px)" },
										}}
									>
										<Wifi color="primary" />
										<Typography>WiFi gratuit</Typography>
									</Box>

									{/* Parking */}
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											width: { xs: "100%", sm: "calc(50% - 8px)" },
										}}
									>
										<LocalParking color="primary" />
										<Typography>Parking</Typography>
									</Box>

									{/* Climatisation */}
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											width: { xs: "100%", sm: "calc(50% - 8px)" },
										}}
									>
										<AcUnit color="primary" />
										<Typography>Climatisation</Typography>
									</Box>

									{/* Télévision */}
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											width: { xs: "100%", sm: "calc(50% - 8px)" },
										}}
									>
										<Tv color="primary" />
										<Typography>Télévision</Typography>
									</Box>

									{/* Cuisine */}
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											width: { xs: "100%", sm: "calc(50% - 8px)" },
										}}
									>
										<Kitchen color="primary" />
										<Typography>Cuisine équipée</Typography>
									</Box>

									{/* Animaux */}
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											width: { xs: "100%", sm: "calc(50% - 8px)" },
										}}
									>
										<Pets color="primary" />
										<Typography>Animaux acceptés</Typography>
									</Box>
								</Box>
							</Paper>
						</Box>

						{/* Colonne de droite : Card de réservation sticky */}
						<Box sx={{ flex: { md: "1 1 42%" } }}>
							<Paper
								elevation={3}
								sx={{
									p: 3,
									borderRadius: 3,
									position: { md: "sticky" }, // Sticky sur desktop
									top: 100,
									border: "1px solid #ddd",
								}}
							>
								<Typography variant="h5" fontWeight="bold" gutterBottom>
									Réserver cette chambre
								</Typography>

								<Divider sx={{ my: 2 }} />

								{/* Prix récapitulatif */}
								<Box sx={{ mb: 3 }}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											mb: 1,
										}}
									>
										<Typography variant="h6">{room.prix_par_nuit} €</Typography>
										<Typography variant="body2" color="text.secondary">
											par nuit
										</Typography>
									</Box>

									<Chip
										label="Disponible"
										color="success"
										size="small"
										sx={{ mt: 1 }}
									/>
								</Box>

								{/* Bouton Réserver - Style thème gîte */}
								<Button
									variant="contained"
									fullWidth
									size="large"
									onClick={() => setIsOpen(true)}
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
									Réserver maintenant
								</Button>

								<Typography
									variant="caption"
									color="text.secondary"
									sx={{ display: "block", textAlign: "center", mt: 2 }}
								>
									Vous ne serez pas débité pour le moment
								</Typography>
							</Paper>
						</Box>
					</Box>
				</Container>

				<Footer />

				{/* Modal de réservation */}
				<ReservationModal
					isOpen={isOpen}
					selectedRoom={room}
					onClose={() => setIsOpen(false)}
				/>
			</Box>
		</>
	);
}

export default RoomDetail;
