import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

type User = {
	id: string;
	name: string;
	email: string;
	password: string;
	role: "client" | "gerant";
};

type AuthContextType = {
	user: User | null;
	isAuthenticated: boolean;
	login: (email: string, password: string) => boolean;
	register: (name: string, email: string, password: string) => boolean;
	logout: () => void;
	hasRole: (role: "client" | "gerant") => boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const DEFAULT_USERS = [
	{
		id: 1,
		name: "Client Test",
		email: "client@strasgite.fr",
		password: "client123",
		role: "client",
	},
	{
		id: 2,
		name: "Gérant",
		email: "gerant@strasgite.fr",
		password: "gerant123",
		role: "gerant",
	},
];

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [users, setUsers] = useState(DEFAULT_USERS);

	useEffect(() => {
		const savedUser = localStorage.getItem("auth-user");
		const savedUsers = localStorage.getItem("auth-users");

		if (savedUser) setUser(JSON.parse(savedUser));
		if (savedUsers) setUsers(JSON.parse(savedUsers));
	}, []);

	const saveUsers = (list: User[]) => {
		setUsers(list);
		localStorage.setItem("auth-users", JSON.stringify(list));
	};

	const login = (email: string, password: string): boolean => {
		const found = users.find(
			(u) => u.email === email && u.password === password,
		);

		if (!found) return false;

		const safeUser = {
			id: found.id,
			email: found.email,
			name: found.name,
			role: found.role,
		};

		setUser(safeUser);
		localStorage.setItem("auth-user", JSON.stringify(safeUser));
		return true;
	};

	const register = (name: string, email: string, password: string): boolean => {
		const exists = users.some((u) => u.email === email);
		if (exists) return false;

		const newUser = {
			id: Date.now(),
			name,
			email,
			password,
			role: "client",
		};

		const updated = [...users, newUser];
		saveUsers(updated);

		const safeUser = {
			id: newUser.id,
			name,
			email,
			role: "client",
		};

		setUser(safeUser);
		localStorage.setItem("auth-user", JSON.stringify(safeUser));

		return true;
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("auth-user");
	};

	const hasRole = (role: "client" | "gerant") => user?.role === role;

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: user !== null,
				login,
				register,
				logout,
				hasRole,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth doit être utilisé dans un AuthProvider");
	return ctx;
}
