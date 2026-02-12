import "./PageHero.css";

interface PageHeroProps {
	title?: string;
	subtitle?: string;
	backgroundImage: string;
	className?: string;
	children?: React.ReactNode; // Pour ajouter des classes CSS personnalisées si besoin
}

const PageHero = ({
	title,
	subtitle,
	backgroundImage,
	className = "",
	children,
}: PageHeroProps) => {
	return (
		<div
			className={`hero-section ${className}`}
			style={{
				backgroundImage: `linear-gradient(rgba(159, 127, 52, 0.2), rgba(156, 109, 77, 0.2)), url(${backgroundImage})`,
			}}
		>
			<div className="hero-contenu">
				<h1>{title}</h1>
				<p>{subtitle}</p>
				{children}
			</div>
		</div>
	);
};

export default PageHero;
