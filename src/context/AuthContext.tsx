import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

export type User = {
	id: number;
	name: string;
	email: string;
	password: string;
	role: "client" | "gerant";
};

type AuthContextType = {
	user: User | null;
	users: User[];
	login: (email: string, password: string) => boolean;
	register: (
		name: string,
		email: string,
		password: string,
		role: "client" | "gerant",
	) => boolean;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [users, setUsers] = useState<User[]>([]);
	const [user, setUser] = useState<User | null>(null);

	// Charger depuis localStorage
	useEffect(() => {
		const storedUsers = localStorage.getItem("auth-users");
		const storedUser = localStorage.getItem("auth-user");

		if (storedUsers) setUsers(JSON.parse(storedUsers));
		if (storedUser) setUser(JSON.parse(storedUser));
	}, []);

	// Sauvegarder les users
	const saveUsers = (list: User[]) => {
		setUsers(list);
		localStorage.setItem("auth-users", JSON.stringify(list));
	};

	// Sauvegarder l'utilisateur connecté
	const saveUser = (u: User | null) => {
		setUser(u);
		if (u) {
			localStorage.setItem("auth-user", JSON.stringify(u));
		} else {
			localStorage.removeItem("auth-user");
		}
	};

	// Connexion
	const login = (email: string, password: string): boolean => {
		const found = users.find(
			(u) => u.email === email && u.password === password,
		);

		if (!found) return false;

		saveUser(found);
		return true;
	};

	// Inscription
	const register = (
		name: string,
		email: string,
		password: string,
		role: "client" | "gerant",
	): boolean => {
		const exists = users.some((u) => u.email === email);
		if (exists) return false;

		const newUser: User = {
			id: Date.now(), // number
			name,
			email,
			password,
			role,
		};

		const updated = [...users, newUser];
		saveUsers(updated);
		saveUser(newUser);

		return true;
	};

	// Déconnexion
	const logout = () => {
		saveUser(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				users,
				login,
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}
