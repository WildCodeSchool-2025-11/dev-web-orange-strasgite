import "../styles/global.css";

export default function Footer() {
	return (
		<footer>
			<p>© {new Date().getFullYear()} Maison d'hôte Strasbourg</p>
			<p>Ehpad Full Stack</p>
		</footer>
	);
}
