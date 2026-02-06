import RegisterForm from "./RegisterForm";

export default function RegisterModal({ onClose }: { onClose: () => void }) {
	const handleKey = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") onClose();
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	return (
		<button
			type="button"
			onClick={onClose}
			onKeyDown={handleKey}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				background: "rgba(0,0,0,0.5)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 1000,
				border: "none",
				padding: 0,
				cursor: "pointer",
			}}
		>
			<div
				role="dialog"
				aria-modal="true"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()} // ← Correction Biome
				style={{
					background: "white",
					padding: "20px",
					borderRadius: "8px",
					minWidth: "300px",
				}}
			>
				<button
					type="button"
					onClick={onClose}
					style={{
						float: "right",
						border: "none",
						background: "none",
						cursor: "pointer",
						fontSize: "18px",
					}}
				>
					✕
				</button>

				<h2>Créer un compte</h2>

				<RegisterForm onSuccess={onClose} />
			</div>
		</button>
	);
}
