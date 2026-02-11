import {
	AccessTime,
	CalendarMonth,
	CheckCircle,
	ErrorOutline,
	People,
} from "@mui/icons-material";
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Chip,
	Container,
	Skeleton,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeaderClient from "../components/Header-client";
import { useAuth } from "../context/AuthContext";
import { useReservations } from "../context/ReservationContext";

type Chambre = {
	id: number;
	nom: string;
	images_urls: string[];
	prix_par_nuit: number;
};

export default function MesReservationsPage() {
	const { user } = useAuth();
	const { reservations } = useReservations();
	const [filtreStatut, setFiltreStatut] = useState<string>("all");
	const [chambres, setChambres] = useState<Chambre[]>([]);

	// Fetch des chambres depuis l'API
	useEffect(() => {
		fetch("https://api-projet-2-strasgite.vercel.app/api/chambres")
			.then((res) => res.json())
			.then((data) => setChambres(data))
			.catch((err) => console.error("Erreur fetch chambres:", err));
	}, []);

	// Helper pour trouver une chambre par son id
	const getChambre = (chambreId: number) =>
		chambres.find((c) => c.id === chambreId);

	if (!user) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "100vh",
					backgroundColor: "#f2e6d8",
				}}
			>
				<Card sx={{ p: 4, textAlign: "center", maxWidth: 400 }}>
					<ErrorOutline color="error" sx={{ fontSize: 60, mb: 2 }} />
					<Typography variant="h5" gutterBottom>
						Accès refusé
					</Typography>
					<Typography color="text.secondary">
						Vous devez être connecté pour voir vos réservations
					</Typography>
				</Card>
			</Box>
		);
	}

	const mesReservations = reservations.filter(
		(reservation) => reservation.userId === user.id,
	);

	const reservationsFiltrees =
		filtreStatut === "all"
			? mesReservations
			: mesReservations.filter((r) => r.statut === filtreStatut);

	const getStatutInfo = (statut: string) => {
		switch (statut) {
			case "validee":
				return {
					color: "success" as const,
					icon: <CheckCircle />,
					label: "Validée",
				};
			case "en_attente":
				return {
					color: "warning" as const,
					icon: <AccessTime />,
					label: "En attente",
				};
			case "refusee":
				return {
					color: "error" as const,
					icon: <ErrorOutline />,
					label: "Refusée",
				};
			default:
				return {
					color: "default" as const,
					icon: <AccessTime />,
					label: statut,
				};
		}
	};

	return (
		<>
			<HeaderClient />
			<Box sx={{ backgroundColor: "#f2e6d8", minHeight: "100vh", py: 4 }}>
				<Container maxWidth="lg">
					<Box sx={{ mb: 4 }}>
						<Typography
							variant="h3"
							component="h1"
							fontWeight="bold"
							sx={{ color: "#692817", mb: 1 }}
						>
							Mes réservations
						</Typography>
						<Typography variant="body1" color="text.secondary">
							Gérez et consultez toutes vos réservations
						</Typography>
					</Box>

					<Box
						sx={{
							mb: 4,
							display: "flex",
							justifyContent: "center",
							flexWrap: "wrap",
						}}
					>
						<ToggleButtonGroup
							value={filtreStatut}
							exclusive
							onChange={(_, newValue) => {
								if (newValue !== null) setFiltreStatut(newValue);
							}}
							sx={{
								backgroundColor: "white",
								borderRadius: 2,
								boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
							}}
						>
							<ToggleButton value="all">Toutes</ToggleButton>
							<ToggleButton value="en_attente">En attente</ToggleButton>
							<ToggleButton value="validee">Validées</ToggleButton>
							<ToggleButton value="refusee">Refusées</ToggleButton>
						</ToggleButtonGroup>
					</Box>

					<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
						{reservationsFiltrees.length} réservation
						{reservationsFiltrees.length > 1 ? "s" : ""} trouvée
						{reservationsFiltrees.length > 1 ? "s" : ""}
					</Typography>

					{reservationsFiltrees.length === 0 ? (
						<Card
							sx={{
								p: 6,
								textAlign: "center",
								backgroundColor: "white",
								borderRadius: 3,
							}}
						>
							<CalendarMonth sx={{ fontSize: 80, color: "#e6b09b", mb: 2 }} />
							<Typography variant="h5" gutterBottom>
								Aucune réservation
							</Typography>
							<Typography color="text.secondary">
								{filtreStatut !== "all"
									? "Aucune réservation avec ce statut"
									: "Vous n'avez pas encore de réservation"}
							</Typography>
						</Card>
					) : (
						<Box
							sx={{
								display: "grid",
								gridTemplateColumns: {
									xs: "1fr",
									md: "repeat(2, 1fr)",
									lg: "repeat(3, 1fr)",
								},
								gap: 3,
							}}
						>
							{reservationsFiltrees.map((reservation) => {
								const statutInfo = getStatutInfo(reservation.statut);
								const chambre = getChambre(reservation.chambreId);

								return (
									<Card
										key={reservation.id}
										sx={{
											height: "100%",
											display: "flex",
											flexDirection: "column",
											borderRadius: 3,
											boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
											transition: "transform 0.2s, box-shadow 0.2s",
											"&:hover": {
												transform: "translateY(-4px)",
												boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
											},
											border: "1px solid #f0f0f0",
										}}
									>
										{/* Photo de la chambre */}
										{chambre ? (
											<CardMedia
												component="img"
												height="200"
												image={chambre.images_urls[0]}
												alt={chambre.nom}
												sx={{ objectFit: "cover" }}
											/>
										) : (
											<Skeleton variant="rectangular" height={200} />
										)}

										<CardContent sx={{ p: 3, flexGrow: 1 }}>
											{/* Statut */}
											<Box
												sx={{
													display: "flex",
													justifyContent: "space-between",
													alignItems: "center",
													mb: 2,
												}}
											>
												<Chip
													icon={statutInfo.icon}
													label={statutInfo.label}
													color={statutInfo.color}
													sx={{ fontWeight: "bold" }}
												/>
												<Typography variant="caption" color="text.secondary">
													#{reservation.id}
												</Typography>
											</Box>

											{/* Nom de la chambre */}
											<Typography
												variant="h6"
												fontWeight="bold"
												sx={{ mb: 0.5, color: "#692817" }}
											>
												{chambre
													? chambre.nom
													: `Chambre ${reservation.chambreId}`}
											</Typography>

											{/* Prix */}
											{chambre && (
												<Typography
													variant="body2"
													color="text.secondary"
													sx={{ mb: 2 }}
												>
													{chambre.prix_par_nuit} € / nuit
												</Typography>
											)}

											{/* Dates */}
											<Box sx={{ mb: 2 }}>
												<Box
													sx={{
														display: "flex",
														alignItems: "center",
														gap: 1,
														mb: 1,
													}}
												>
													<CalendarMonth
														sx={{ fontSize: 18, color: "#e6b09b" }}
													/>
													<Typography variant="body2" fontWeight="medium">
														Arrivée :
													</Typography>
													<Typography variant="body2">
														{new Date(
															reservation.dateArrivee,
														).toLocaleDateString("fr-FR", {
															day: "numeric",
															month: "long",
															year: "numeric",
														})}
													</Typography>
												</Box>
												<Box
													sx={{ display: "flex", alignItems: "center", gap: 1 }}
												>
													<CalendarMonth
														sx={{ fontSize: 18, color: "#e6b09b" }}
													/>
													<Typography variant="body2" fontWeight="medium">
														Départ :
													</Typography>
													<Typography variant="body2">
														{new Date(
															reservation.dateDepart,
														).toLocaleDateString("fr-FR", {
															day: "numeric",
															month: "long",
															year: "numeric",
														})}
													</Typography>
												</Box>
											</Box>

											{/* Personnes */}
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													gap: 1,
													p: 1.5,
													backgroundColor: "#f9f9f9",
													borderRadius: 2,
												}}
											>
												<People sx={{ color: "#e6b09b" }} />
												<Typography variant="body2" fontWeight="medium">
													{reservation.nombrePersonnes} personne
													{reservation.nombrePersonnes > 1 ? "s" : ""}
												</Typography>
											</Box>
										</CardContent>
									</Card>
								);
							})}
						</Box>
					)}
				</Container>
			</Box>
			<Footer />
		</>
	);
}
