import {
	Alert,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
	type Reservation,
	useReservations,
} from "../context/ReservationContext";

type Item = {
	id: number;
	nom: string;
	images_urls: string[];
	prix_par_nuit: number;
};

type ReservationModalProps = {
	isOpen: boolean;
	selectedRoom: Item | null;
	onClose: () => void;
};

function ReservationModal({
	isOpen,
	selectedRoom,
	onClose,
}: ReservationModalProps) {
	const [dateArrivee, setDateArrivee] = useState<string>("");
	const [dateDepart, setDateDepart] = useState<string>("");
	const [nombrePersonne, setNombrePersonne] = useState<string>("");
	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const { ajouterReservation } = useReservations();
	const { user } = useAuth();

	const handleValiderReservation = () => {
		if (!selectedRoom) return;
		if (!user) return;
		const nouvelleReservation: Reservation = {
			id: Date.now(),
			userId: user.id,
			chambreId: selectedRoom.id,
			dateArrivee: dateArrivee,
			dateDepart: dateDepart,
			nombrePersonnes: Number(nombrePersonne),
			statut: "en_attente",
		};

		ajouterReservation(nouvelleReservation);

		setDateArrivee("");
		setDateDepart("");
		setNombrePersonne("");
		onClose();
		setSnackbarOpen(true);
	};

	if (!selectedRoom) return null;

	return (
		<>
			<Dialog
				open={isOpen}
				onClose={onClose}
				maxWidth="sm"
				fullWidth
				slotProps={{
					paper: {
						sx: {
							borderRadius: 3,
							p: 1,
						},
					},
				}}
			>
				{/* Titre */}
				<DialogTitle>
					<Typography
						variant="h5"
						component="span"
						fontWeight="bold"
						color="#692817"
					>
						Réservation
					</Typography>
				</DialogTitle>
				<Divider />

				{/* Contenu */}
				<DialogContent sx={{ pt: 3 }}>
					{/* Info chambre */}
					<Box
						sx={{
							backgroundColor: "#f2e6d8",
							p: 2,
							borderRadius: 2,
							mb: 3,
						}}
					>
						<Typography variant="h6" fontWeight="bold" gutterBottom>
							{selectedRoom.nom}
						</Typography>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<Typography variant="h6" color="primary" fontWeight="bold">
								{selectedRoom.prix_par_nuit} €
							</Typography>
							<Typography variant="body2" color="text.secondary">
								par nuit
							</Typography>
						</Box>
					</Box>

					{/* Formulaire */}
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 2.5,
						}}
					>
						{/* Date d'arrivée */}
						<TextField
							label="Date d'arrivée"
							type="date"
							value={dateArrivee}
							onChange={(e) => setDateArrivee(e.target.value)}
							fullWidth
							slotProps={{
								inputLabel: {
									shrink: true,
								},
							}}
							required
						/>

						{/* Date de départ */}
						<TextField
							label="Date de départ"
							type="date"
							value={dateDepart}
							onChange={(e) => setDateDepart(e.target.value)}
							fullWidth
							slotProps={{
								inputLabel: {
									shrink: true,
								},
								htmlInput: {
									min: dateArrivee,
								},
							}}
							required
						/>

						{/* Nombre de personnes */}
						<TextField
							label="Nombre de personnes"
							type="number"
							value={nombrePersonne}
							onChange={(e) => setNombrePersonne(e.target.value)}
							fullWidth
							slotProps={{
								htmlInput: {
									min: 1,
									max: 10,
								},
							}}
							required
						/>
					</Box>
				</DialogContent>

				<Divider />

				{/* Actions */}
				<DialogActions sx={{ p: 2.5, gap: 1 }}>
					<Button
						onClick={onClose}
						variant="outlined"
						sx={{
							borderRadius: 2,
							textTransform: "none",
							fontWeight: "bold",
							color: "#692817",
							borderColor: "#692817",
							"&:hover": {
								borderColor: "#692817",
								backgroundColor: "rgba(105, 40, 23, 0.08)",
							},
						}}
					>
						Annuler
					</Button>
					<Button
						onClick={handleValiderReservation}
						variant="contained"
						disabled={!dateArrivee || !dateDepart || !nombrePersonne}
						sx={{
							borderRadius: 2,
							textTransform: "none",
							fontWeight: "bold",
							backgroundColor: "#e6b09b",
							"&:hover": {
								backgroundColor: "#d19a85",
							},
							"&:disabled": {
								backgroundColor: "#e0e0e0",
							},
						}}
					>
						Valider ma réservation
					</Button>
				</DialogActions>
			</Dialog>

			{/* Snackbar de confirmation */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={5000}
				onClose={() => setSnackbarOpen(false)}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert
					onClose={() => setSnackbarOpen(false)}
					severity="success"
					sx={{
						borderRadius: 3,
						backgroundColor: "#692817",
						color: "#fff",
						fontWeight: "bold",
						"& .MuiAlert-icon": {
							color: "#e6b09b",
						},
						"& .MuiAlert-action .MuiIconButton-root": {
							color: "#fff",
						},
						boxShadow: "0px 4px 20px rgba(105, 40, 23, 0.35)",
						px: 3,
						py: 1.5,
					}}
				>
					<Typography variant="body1" fontWeight="bold">
						Demande de réservation envoyée !
					</Typography>
					<Typography variant="body2" sx={{ opacity: 0.85 }}>
						Votre demande a bien été prise en compte et sera traitée dans les
						meilleurs délais.
					</Typography>
				</Alert>
			</Snackbar>
		</>
	);
}

export default ReservationModal;
