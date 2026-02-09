import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function AccountAvatar() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const [openMenu, setOpenMenu] = useState(false);
	const [openLogin, setOpenLogin] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);

	const menuBtnStyle: React.CSSProperties = {
		width: "100%",
		padding: "10px",
		background: "none",
		border: "none",
		textAlign: "left",
		cursor: "pointer",
		fontSize: "15px",
	};

	return (
		<div
			style={{
				position: "relative",
				display: "flex",
				alignItems: "center",
				gap: "10px",
			}}
		>
			{/* Texte à côté de l’avatar */}
			<span
				style={{
					fontSize: "17px",
					fontWeight: 700,
					color: "#f2e6d8",
				}}
			>
				{!user && "Se connecter"}
				{user && `Bonjour ${user.name}`}
			</span>

			{/* Avatar */}
			<button
				type="button"
				onClick={() => setOpenMenu(!openMenu)}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						setOpenMenu(!openMenu);
					}
				}}
				style={{
					width: "40px",
					height: "40px",
					borderRadius: "50%",
					background: "#692817",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					cursor: "pointer",
					border: "none",
					padding: 0,
				}}
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="#f2e6d8"
					xmlns="http://www.w3.org/2000/svg"
					role="img"
					aria-label="Icône utilisateur"
				>
					<title>Icône utilisateur</title>
					<path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2h19.2v-1.2c0-3.2-6.4-4.8-9.6-4.8z" />
				</svg>
			</button>

			{/* Menu déroulant */}
			{openMenu && (
				<div
					style={{
						position: "absolute",
						top: "50px",
						right: 0,
						background: "white",
						borderRadius: "8px",
						boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
						padding: "10px",
						minWidth: "180px",
						zIndex: 999,
					}}
				>
					{/* Si personne n'est connecté */}
					{!user && (
						<>
							<button
								type="button"
								style={menuBtnStyle}
								onClick={() => {
									setOpenLogin(true);
									setOpenMenu(false);
								}}
							>
								Connexion
							</button>

							<button
								type="button"
								style={menuBtnStyle}
								onClick={() => {
									setOpenRegister(true);
									setOpenMenu(false);
								}}
							>
								Créer un compte
							</button>
						</>
					)}

					{/* Si un client est connecté */}
					{user && user.role === "client" && (
						<>
							<button
								type="button"
								style={menuBtnStyle}
								onClick={() => {
									navigate("/mon-compte");
									setOpenMenu(false);
								}}
							>
								Mon compte
							</button>

							<button
								type="button"
								style={menuBtnStyle}
								onClick={() => {
									navigate("/mes-reservations");
									setOpenMenu(false);
								}}
							>
								Mes réservations
							</button>

							<button
								type="button"
								style={menuBtnStyle}
								onClick={() => {
									navigate("/mes-favoris");
									setOpenMenu(false);
								}}
							>
								Mes favoris
							</button>

							<hr />

							<button
								type="button"
								style={menuBtnStyle}
								onClick={() => {
									logout();
									navigate("/");
								}}
							>
								Se déconnecter
							</button>
						</>
					)}

					{/* Si un gérant est connecté */}
					{user && user.role === "gerant" && (
						<>
							<button
								type="button"
								style={menuBtnStyle}
								onClick={() => {
									navigate("/gerant");
									setOpenMenu(false);
								}}
							>
								Espace gérant
							</button>
							<hr />
							<button
								type="button"
								style={menuBtnStyle}
								onClick={() => {
									logout();
									navigate("/");
								}}
							>
								Se déconnecter
							</button>
						</>
					)}
				</div>
			)}

			{/* Modals */}
			{openLogin && <LoginModal onClose={() => setOpenLogin(false)} />}
			{openRegister && <RegisterModal onClose={() => setOpenRegister(false)} />}
		</div>
	);
}
