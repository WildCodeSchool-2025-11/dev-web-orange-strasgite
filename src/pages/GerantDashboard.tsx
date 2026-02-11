import {
	CalendarMonth,
	CheckCircle,
	Close,
	ErrorOutline,
	HourglassEmpty,
	Logout,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardContent,
	Chip,
	Container,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Tooltip as RechartsTooltip,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";
import BurgerMenu from "../components/BurgerMenu/BurgerMenu";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import {
	type Reservation,
	useReservations,
} from "../context/ReservationContext";

export default function GerantDashboard() {
	const { user, logout } = useAuth();
	const { reservations } = useReservations();
	const navigate = useNavigate();
	const [localReservations, setLocalReservations] = useState(reservations);

	// Protection d'accès
	if (!user || user.role !== "gerant") {
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
						Cette page est réservée au gérant.
					</Typography>
				</Card>
			</Box>
		);
	}

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	// Calcul des statistiques
	const stats = {
		total: localReservations.length,
		enAttente: localReservations.filter((r) => r.statut === "en_attente")
			.length,
		validees: localReservations.filter((r) => r.statut === "validee").length,
		refusees: localReservations.filter((r) => r.statut === "refusee").length,
	};

	// Données pour le graphique (répartition par statut)
	const chartData = [
		{
			name: "En attente",
			nombre: stats.enAttente,
			fill: "#ff9800",
		},
		{
			name: "Validées",
			nombre: stats.validees,
			fill: "#4caf50",
		},
		{
			name: "Refusées",
			nombre: stats.refusees,
			fill: "#f44336",
		},
	];

	// Actions pour changer le statut
	const changerStatut = (id: number, nouveauStatut: Reservation["statut"]) => {
		const updated = localReservations.map((r) =>
			r.id === id ? { ...r, statut: nouveauStatut } : r,
		);
		setLocalReservations(updated);
		// Mise à jour du localStorage
		localStorage.setItem("reservations", JSON.stringify(updated));
	};

	// Fonction pour obtenir l'info du statut
	const getStatutInfo = (statut: string) => {
		switch (statut) {
			case "validee":
				return { color: "success" as const, label: "Validée" };
			case "en_attente":
				return { color: "warning" as const, label: "En attente" };
			case "refusee":
				return { color: "error" as const, label: "Refusée" };
			default:
				return { color: "default" as const, label: statut };
		}
	};

	return (
		<>
			<BurgerMenu />
			<Box sx={{ backgroundColor: "#f2e6d8", minHeight: "100vh", py: 4 }}>
				<Container maxWidth="xl">
					{/* En-tête avec bouton déconnexion */}
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							mb: 4,
						}}
					>
						<Box>
							<Typography
								variant="h3"
								component="h1"
								fontWeight="bold"
								sx={{ color: "#692817", mb: 0.5 }}
							>
								Dashboard Gérant
							</Typography>
							<Typography variant="body1" color="text.secondary">
								Bienvenue {user.name}
							</Typography>
						</Box>
						<Button
							variant="outlined"
							startIcon={<Logout />}
							onClick={handleLogout}
							sx={{
								borderColor: "#692817",
								color: "#692817",
								"&:hover": {
									borderColor: "#d19a85",
									backgroundColor: "rgba(105, 40, 23, 0.04)",
								},
							}}
						>
							Déconnexion
						</Button>
					</Box>

					{/* Cartes de statistiques */}
					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: {
								xs: "1fr",
								sm: "repeat(2, 1fr)",
								md: "repeat(4, 1fr)",
							},
							gap: 3,
							mb: 4,
						}}
					>
						{/* Total */}
						<Card
							sx={{
								background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
								color: "white",
								borderRadius: 3,
								boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
							}}
						>
							<CardContent>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<Box>
										<Typography variant="body2" sx={{ opacity: 0.9 }}>
											Total
										</Typography>
										<Typography variant="h3" fontWeight="bold">
											{stats.total}
										</Typography>
									</Box>
									<CalendarMonth sx={{ fontSize: 50, opacity: 0.8 }} />
								</Box>
							</CardContent>
						</Card>

						{/* En attente */}
						<Card
							sx={{
								background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
								color: "white",
								borderRadius: 3,
								boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
							}}
						>
							<CardContent>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<Box>
										<Typography variant="body2" sx={{ opacity: 0.9 }}>
											En attente
										</Typography>
										<Typography variant="h3" fontWeight="bold">
											{stats.enAttente}
										</Typography>
									</Box>
									<HourglassEmpty sx={{ fontSize: 50, opacity: 0.8 }} />
								</Box>
							</CardContent>
						</Card>

						{/* Validées */}
						<Card
							sx={{
								background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
								color: "white",
								borderRadius: 3,
								boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
							}}
						>
							<CardContent>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<Box>
										<Typography variant="body2" sx={{ opacity: 0.9 }}>
											Validées
										</Typography>
										<Typography variant="h3" fontWeight="bold">
											{stats.validees}
										</Typography>
									</Box>
									<CheckCircle sx={{ fontSize: 50, opacity: 0.8 }} />
								</Box>
							</CardContent>
						</Card>

						{/* Refusées */}
						<Card
							sx={{
								background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
								color: "white",
								borderRadius: 3,
								boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
							}}
						>
							<CardContent>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<Box>
										<Typography variant="body2" sx={{ opacity: 0.9 }}>
											Refusées
										</Typography>
										<Typography variant="h3" fontWeight="bold">
											{stats.refusees}
										</Typography>
									</Box>
									<ErrorOutline sx={{ fontSize: 50, opacity: 0.8 }} />
								</Box>
							</CardContent>
						</Card>
					</Box>

					{/* Graphique */}
					<Card
						sx={{
							mb: 4,
							borderRadius: 3,
							boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
						}}
					>
						<CardContent sx={{ p: 3 }}>
							<Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
								Répartition des réservations
							</Typography>
							<ResponsiveContainer width="100%" height={300}>
								<BarChart data={chartData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<RechartsTooltip />
									<Legend />
									<Bar dataKey="nombre" fill="#e6b09b" radius={[8, 8, 0, 0]} />
								</BarChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>

					{/* Tableau des réservations */}
					<Card
						sx={{
							borderRadius: 3,
							boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
						}}
					>
						<CardContent sx={{ p: 3 }}>
							<Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
								Gestion des réservations
							</Typography>

							<TableContainer component={Paper} elevation={0}>
								<Table>
									<TableHead>
										<TableRow sx={{ backgroundColor: "#f9f9f9" }}>
											<TableCell>
												<strong>ID</strong>
											</TableCell>
											<TableCell>
												<strong>Utilisateur</strong>
											</TableCell>
											<TableCell>
												<strong>Chambre</strong>
											</TableCell>
											<TableCell>
												<strong>Arrivée</strong>
											</TableCell>
											<TableCell>
												<strong>Départ</strong>
											</TableCell>
											<TableCell>
												<strong>Personnes</strong>
											</TableCell>
											<TableCell>
												<strong>Statut</strong>
											</TableCell>
											<TableCell align="center">
												<strong>Actions</strong>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{localReservations.length === 0 ? (
											<TableRow>
												<TableCell colSpan={8} align="center" sx={{ py: 6 }}>
													<Typography color="text.secondary">
														Aucune réservation pour le moment
													</Typography>
												</TableCell>
											</TableRow>
										) : (
											localReservations.map((reservation) => {
												const statutInfo = getStatutInfo(reservation.statut);
												return (
													<TableRow
														key={reservation.id}
														sx={{
															"&:hover": { backgroundColor: "#f5f5f5" },
														}}
													>
														<TableCell>#{reservation.id}</TableCell>
														<TableCell>User {reservation.userId}</TableCell>
														<TableCell>
															Chambre {reservation.chambreId}
														</TableCell>
														<TableCell>
															{new Date(
																reservation.dateArrivee,
															).toLocaleDateString("fr-FR")}
														</TableCell>
														<TableCell>
															{new Date(
																reservation.dateDepart,
															).toLocaleDateString("fr-FR")}
														</TableCell>
														<TableCell>{reservation.nombrePersonnes}</TableCell>
														<TableCell>
															<Chip
																label={statutInfo.label}
																color={statutInfo.color}
																size="small"
															/>
														</TableCell>
														<TableCell align="center">
															<Box sx={{ display: "flex", gap: 1 }}>
																{reservation.statut !== "validee" && (
																	<Tooltip title="Valider">
																		<IconButton
																			size="small"
																			onClick={() =>
																				changerStatut(reservation.id, "validee")
																			}
																			sx={{
																				color: "#4caf50",
																				"&:hover": {
																					backgroundColor:
																						"rgba(76, 175, 80, 0.1)",
																				},
																			}}
																		>
																			<CheckCircle />
																		</IconButton>
																	</Tooltip>
																)}
																{reservation.statut !== "refusee" && (
																	<Tooltip title="Refuser">
																		<IconButton
																			size="small"
																			onClick={() =>
																				changerStatut(reservation.id, "refusee")
																			}
																			sx={{
																				color: "#f44336",
																				"&:hover": {
																					backgroundColor:
																						"rgba(244, 67, 54, 0.1)",
																				},
																			}}
																		>
																			<Close />
																		</IconButton>
																	</Tooltip>
																)}
															</Box>
														</TableCell>
													</TableRow>
												);
											})
										)}
									</TableBody>
								</Table>
							</TableContainer>
						</CardContent>
					</Card>
				</Container>
			</Box>
			<Footer />
		</>
	);
}
