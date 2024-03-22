import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Inventory from "./components/inventory/Inventory";
import Pos from "./components/pos/Pos";
import Crm from "./components/crm/Crm";
import AuthenticatedLayout from "./components/common/layout/rootLayout/AuthenticatedLayout";
import UnauthenthicatedLayout from "./components/common/layout/rootLayout/UnauthenticatedLayout";
import UserAuth from "./components/auth/UserAuth";
import {
	passwordReset,
	passwordResetConfirm,
	passwordResetTokenCheck,
	userAuth,
	userRegister,
} from "./apis/auth-api";
import { checkAuthLoader, tokenLoader, userLogout } from "./utils/auth";
import UserRegister from "./components/auth/UserRegister";
import PasswordResetConfirm from "./components/auth/PasswordResetConfirm";
import PasswordReset from "./components/auth/PasswordReset";
import { posAction, posLoader } from "./utils/pos";
import { ThemeProvider as BSThemeProvider } from "react-bootstrap";
import { ThemeProvider as MDThemeProvider } from "@mui/material";
import { createMDTheme } from "./styles/theme";
import useMediaQuery from "@mui/material/useMediaQuery";

const mdPrefix = {
	btn: "btn-md",
	badge: "badge-md",
};

function AppRoutes() {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const [mode, setMode] = useState("light");

	const setModeHandler = (e, value) => {
		setMode(value);
	};
	const modeHandler = () =>
		mode === "system" ? prefersDarkMode : mode === "dark" ? true : false;

	const mdTheme = createMDTheme(modeHandler());

	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<AuthenticatedLayout {...{ mode: mode, setMode: setModeHandler }} />
			),
			// errorElement: <ErrorBoundary />,
			id: "root",
			loader: checkAuthLoader,
			children: [
				{ index: true, element: <Dashboard /> },
				{ path: "/inventory", element: <Inventory /> },
				{
					path: "/pos",
					element: <Pos />,
					loader: posLoader,
					action: posAction,
					children: [{}],
				},
				{ path: "/crm", element: <Crm /> },
				{ path: "/logout", loader: userLogout },
			],
		},
		{
			path: "/auth",
			element: <UnauthenthicatedLayout />,
			id: "auth",
			loader: () => {
				return tokenLoader() ? redirect("/") : null;
			},
			children: [
				{ index: true, element: <UserAuth />, action: userAuth },
				{
					path: "register",
					element: <UserRegister />,
					action: userRegister,
				},
				{
					path: "passwordreset",
					element: <PasswordReset />,
					action: passwordReset,
				},
				{
					path: "reset/:uidb64/:token",
					element: <PasswordResetConfirm />,
					loader: passwordResetTokenCheck,
					action: passwordResetConfirm,
				},
			],
		},
	]);

	return (
		<BSThemeProvider prefixes={mdPrefix}>
			<MDThemeProvider theme={mdTheme}>
				<RouterProvider router={router} />
			</MDThemeProvider>
		</BSThemeProvider>
	);
}
export default AppRoutes;
