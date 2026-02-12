import {
	Avatar,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import Footer from "../components/Footer";
import HeaderClient from "../components/Header-client";
import { type User, useAuth } from "../context/AuthContext";

export default function MonComptePage() {
	const { user } = useAuth();

	const [openEdit, setOpenEdit] = useState(false);
	const [openPassword, setOpenPassword] = useState(false);

	const [editName, setEditName] = useState(user?.name || "");
	const [editEmail, setEditEmail] = useState(user?.email || "");

	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	if (!user) {
		return (
			<>
				<HeaderClient />
				<Box sx={{ mt: 4, textAlign: "center" }}>Vous n'êtes pas connecté.</Box>
				<Footer />
			</>
		);
	}

	const handleSaveProfile = () => {
		const updated: User = {
			...user,
			name: editName,
			email: editEmail,
		};

		const allUsers: User[] = JSON.parse(
			localStorage.getItem("auth-users") || "[]",
		);

		const newUsers = allUsers.map((u: User) =>
			u.id === user.id ? updated : u,
		);

		localStorage.setItem("auth-users", JSON.stringify(newUsers));
		localStorage.setItem("auth-user", JSON.stringify(updated));

		setOpenEdit(false);
		window.location.reload();
	};

	const handleSavePassword = () => {
		if (!newPassword) return;

		const updated: User = {
			...user,
			password: newPassword,
		};

		const allUsers: User[] = JSON.parse(
			localStorage.getItem("auth-users") || "[]",
		);

		const newUsers = allUsers.map((u: User) =>
			u.id === user.id ? updated : u,
		);

		localStorage.setItem("auth-users", JSON.stringify(newUsers));
		localStorage.setItem("auth-user", JSON.stringify(updated));

		alert("Mot de passe mis à jour");
		setOpenPassword(false);
		window.location.reload();
	};

	return (
		<>
			<HeaderClient />

			<Box sx={{ maxWidth: "900px", mx: "auto", mt: 4, mb: 6, px: 2 }}>
				<Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
					<Grid container spacing={3} alignItems="center">
						<Grid>
							<Avatar
								sx={{
									width: 80,
									height: 80,
									bgcolor: "#A5654C",
									fontSize: 32,
								}}
							>
								{user?.name?.[0]?.toUpperCase() || "?"}
							</Avatar>
						</Grid>

						<Grid>
							<Typography variant="h5" fontWeight="bold">
								Mon compte
							</Typography>
							<Typography color="text.secondary">
								Informations personnelles et paramètres
							</Typography>
						</Grid>

						<Grid>
							<Button variant="contained" onClick={() => setOpenEdit(true)}>
								Modifier
							</Button>
						</Grid>
					</Grid>

					<Divider sx={{ my: 3 }} />

					<Box>
						<Typography variant="h6" fontWeight="bold" gutterBottom>
							Informations personnelles
						</Typography>
						<Typography>
							<strong>Nom :</strong> {user?.name}
						</Typography>
						<Typography>
							<strong>Email :</strong> {user?.email}
						</Typography>
					</Box>

					<Divider sx={{ my: 3 }} />

					<Box>
						<Typography variant="h6" fontWeight="bold" gutterBottom>
							Sécurité
						</Typography>
						<Button variant="outlined" onClick={() => setOpenPassword(true)}>
							Changer mon mot de passe
						</Button>
					</Box>

					<Divider sx={{ my: 3 }} />

					<Box>
						<Button
							variant="contained"
							onClick={() => {
								window.location.href = "/";
							}}
						>
							Retour à l’accueil
						</Button>
					</Box>
				</Paper>
			</Box>

			<Footer />

			<Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
				<DialogTitle>Modifier mes informations</DialogTitle>
				<DialogContent
					sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
				>
					<TextField
						label="Nom"
						value={editName}
						onChange={(e) => setEditName(e.target.value)}
					/>
					<TextField
						label="Email"
						value={editEmail}
						onChange={(e) => setEditEmail(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenEdit(false)}>Annuler</Button>
					<Button variant="contained" onClick={handleSaveProfile}>
						Enregistrer
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={openPassword} onClose={() => setOpenPassword(false)}>
				<DialogTitle>Changer mon mot de passe</DialogTitle>
				<DialogContent
					sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
				>
					<TextField
						label="Ancien mot de passe"
						type="password"
						value={oldPassword}
						onChange={(e) => setOldPassword(e.target.value)}
					/>
					<TextField
						label="Nouveau mot de passe"
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenPassword(false)}>Annuler</Button>
					<Button variant="contained" onClick={handleSavePassword}>
						Valider
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
