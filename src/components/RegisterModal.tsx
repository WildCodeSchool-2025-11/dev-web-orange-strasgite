import RegisterForm from "./RegisterForm";

export default function RegisterModal({ onClose }: { onClose: () => void }) {
	return (
		<div
			role="presentation"
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
			}}
		>
			{/* Overlay cliquable compatible Biome */}
			<button
				type="button"
				aria-hidden="true"
				tabIndex={-1}
				onClick={onClose}
				onKeyDown={(e) => e.stopPropagation()}
				style={{
					position: "absolute",
					inset: 0,
					background: "transparent",
					border: "none",
					padding: 0,
					margin: 0,
					cursor: "pointer",
				}}
			/>

			<div
				role="dialog"
				aria-modal="true"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
				style={{
					background: "white",
					padding: "20px",
					borderRadius: "8px",
					minWidth: "300px",
					position: "relative",
					zIndex: 1,
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
		</div>
	);
}
