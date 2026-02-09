import AccountAvatar from "./AccountAvatar";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

export default function HeaderClient() {
	return (
		<header
			style={{
				width: "100%",
				padding: "15px 20px",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				background: "#692817",
			}}
		>
			{/* Menu burger fonctionnel */}
			<BurgerMenu />

			{/* Avatar + menu */}
			<AccountAvatar />
		</header>
	);
}
