import { useState } from "react";

export default function AccountMenu() {
	const [open, setOpen] = useState<boolean>(false);

	const handleLogin = () => {
		console.log("Connexion");
	};

	const handleRegister = () => {
		console.log("Créer un compte");
	};

	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			<button
				type="button"
				onClick={() => setOpen(!open)}
				style={{
					padding: "10px 16px",
					background: "#1a1a1a",
					color: "white",
					border: "none",
					borderRadius: "6px",
					cursor: "pointer",
				}}
			>
				Mon compte ▼
			</button>

			{open && (
				<div
					style={{
						position: "absolute",
						top: "45px",
						right: 0,
						background: "white",
						border: "1px solid #ddd",
						borderRadius: "6px",
						padding: "10px",
						display: "flex",
						flexDirection: "column",
						gap: "8px",
						width: "200px",
						boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
					}}
				>
					<button type="button" onClick={handleLogin} style={menuBtnStyle}>
						Connexion
					</button>

					<button type="button" onClick={handleRegister} style={menuBtnStyle}>
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
