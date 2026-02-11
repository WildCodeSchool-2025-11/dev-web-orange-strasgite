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
	Chip,
	Container,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import { useState } from "react";
import Footer from "../components/Footer";
import HeaderClient from "../components/Header-client";
import { useAuth } from "../context/AuthContext";
import { useReservations } from "../context/ReservationContext";

export default function MesReservationsPage() {
	const { user } = useAuth();
	const { reservations } = useReservations();
	const [filtreStatut, setFiltreStatut] = useState<string>("all");

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

	// Filtrer par statut
	const reservationsFiltrees =
		filtreStatut === "all"
			? mesReservations
			: mesReservations.filter((r) => r.statut === filtreStatut);

	// Fonction pour obtenir la couleur et l'icône selon le statut
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
					{/* En-tête */}
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

					{/* Filtres par statut */}
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
								if (newValue !== null) {
									setFiltreStatut(newValue);
								}
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

					{/* Compteur */}
					<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
						{reservationsFiltrees.length} réservation
						{reservationsFiltrees.length > 1 ? "s" : ""} trouvée
						{reservationsFiltrees.length > 1 ? "s" : ""}
					</Typography>

					{/* Liste des réservations */}
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

								return (
									<Card
										key={reservation.id}
										sx={{
											height: "100%",
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
										<CardContent sx={{ p: 3 }}>
											{/* Statut en haut */}
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
													Réservation #{reservation.id}
												</Typography>
											</Box>

											{/* Chambre */}
											<Typography
												variant="h6"
												fontWeight="bold"
												sx={{ mb: 2, color: "#692817" }}
											>
												Chambre {reservation.chambreId}
											</Typography>

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
														sx={{ fontSize: 20, color: "#e6b09b" }}
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
														sx={{ fontSize: 20, color: "#e6b09b" }}
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

											{/* Nombre de personnes */}
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													gap: 1,
													p: 2,
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
