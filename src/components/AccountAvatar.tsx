import { useState } from "react";

export default function AccountAvatar() {
	const [open, setOpen] = useState<boolean>(false);

	const handleLogin = () => {
		console.log("Connexion");
	};

	const handleRegister = () => {
		console.log("Créer un compte");
	};

	return (
		<div style={{ position: "relative" }}>
			{/* Avatar rond */}
			<button
				type="button"
				onClick={() => setOpen(!open)}
				style={{
					width: "40px",
					height: "40px",
					borderRadius: "50%",
					backgroundColor: "#d9f0d0",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					cursor: "pointer",
					border: "2px solid #c0e6b8",
					padding: 0,
				}}
			>
				<span style={{ fontSize: "20px", color: "#333" }}>👤</span>
			</button>

			{/* Menu déroulant */}
			{open && (
				<div
					style={{
						position: "absolute",
						top: "50px",
						right: 0,
						background: "white",
						border: "1px solid #ddd",
						borderRadius: "6px",
						padding: "10px",
						width: "180px",
						boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
						display: "flex",
						flexDirection: "column",
						gap: "8px",
					}}
				>
					<button type="button" style={menuBtnStyle} onClick={handleLogin}>
						Connexion
					</button>

					<button type="button" style={menuBtnStyle} onClick={handleRegister}>
						Créer un compte
					</button>
				</div>
			)}
		</div>
	);
}

const menuBtnStyle: React.CSSProperties = {
	background: "none",
	border: "none",
	textAlign: "left",
	padding: "8px",
	cursor: "pointer",
	borderRadius: "4px",
};
