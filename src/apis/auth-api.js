import { redirect } from "react-router-dom";
import axios from "axios";
import { TOKEN_TYPE, TOKEN_OPERATION, manageTokens, userLogout } from "../utils/auth";
// const API_URL = "https://localhost:8080";

//Axios Instance
export const axiosInstance = axios.create({});

// Function to refresh the access token
const refreshAccessToken = async () => {
	try {
		// Make the refresh token request to your backend to get a new access token
		const response = await axios.post("/api/auth/token/refresh/", {
			refresh: manageTokens(TOKEN_TYPE.REFRESH, TOKEN_OPERATION.GET), // Replace with your refresh token retrieval logic
		});

		// Save the new access token in localStorage
		manageTokens(
			TOKEN_TYPE.ACCESS,
			TOKEN_OPERATION.SET,
			response.data.access
		);
		// Update the Authorization header with the new access token
		axiosInstance.defaults.headers.common[
			"Authorization"
		] = `Bearer ${response.data.access}`;

		return Promise.resolve();
	} catch (error) {
		return Promise.reject(error);
	}
};

// Add a request interceptor to attach the access token to each request
axiosInstance.interceptors.request.use(
	(config) => {
		const authToken = manageTokens(TOKEN_TYPE.ACCESS, TOKEN_OPERATION.GET);
		if (authToken) {
			config.headers["Authorization"] = `Bearer ${authToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Add a response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		const authToken = manageTokens(TOKEN_TYPE.ACCESS, TOKEN_OPERATION.GET);

		// If the response status is 401 and there's an authToken, try to refresh the token
		if (error.response.status === 401 && authToken) {
			try {
				await refreshAccessToken();
				// Retry the original request with the new access token
				const authToken = manageTokens(
					TOKEN_TYPE.ACCESS,
					TOKEN_OPERATION.GET
				);
				originalRequest.headers[
					"Authorization"
				] = `Bearer ${authToken}`;
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				// If token refresh fails, logoutuser and redirect to login page
				userLogout();
				throw redirect('/auth?status=expired');
				// You might want to redirect the user to the login page or show a message
			}
		}

		throw error;
	}
);

/* User authentication */
/**
 * User login
 * @param {*} param0
 * @returns
 */
export async function userAuth({ request }) {
	try {
		const data = await request.formData();
		const authData = {
			username: data.get("username"),
			password: data.get("password"),
		};
		const response = await axios.post("/api/auth/token/", authData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		const tokenData = await response.data;
		manageTokens(TOKEN_TYPE.ACCESS, TOKEN_OPERATION.SET, tokenData.access);
		manageTokens(
			TOKEN_TYPE.REFRESH,
			TOKEN_OPERATION.SET,
			tokenData.refresh
		);

		return redirect("/");
	} catch (error) {
		if (error.response) {
			return error.response;
		} else {
			throw error;
		}
	}
}

/**
 * User Registration
 * @param {*} param0
 * @returns
 */
export async function userRegister({ request }) {
	try {
		const data = await request.formData();
		const registrationData = {
			name: data.get("name"),
			username: data.get("username"),
			email: data.get("email"),
			password: data.get("password"),
			phone_num: data.get("phone_num"),
		};

		const response = await axios.post(
			"/api/auth/register/",
			registrationData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const tokenData = await response.data;

		manageTokens(TOKEN_TYPE.ACCESS, TOKEN_OPERATION.SET, tokenData.token);
		manageTokens(
			TOKEN_TYPE.REFRESH,
			TOKEN_OPERATION.SET,
			tokenData.refresh
		);

		return redirect("/");
	} catch (error) {
		if (error.response) {
			return error.response;
		} else {
			throw error;
		}
	}
}

/* User Password Reset */
export async function passwordReset({ request }) {
	try {
		const data = await request.formData();
		const resetEmailData = {
			email: data.get("email"),
		};

		const response = await axios.post(
			"/api/auth/passwordreset/",
			resetEmailData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		return redirect("/auth/passwordreset?status=done");
	} catch (error) {
		if (error.response) {
			return error.response;
		} else {
			throw error;
		}
	}
}
export async function passwordResetTokenCheck({ params }) {
	try {
		const uidb64 = params.uidb64;
		const token = params.token;
		if (uidb64 && token) {
			const response = await axios.get(
				`/api/auth/reset/${uidb64}/${token}`
			);

			const validationData = await response.data;
			if ("redirect_url" in validationData) {
				return redirect(validationData["redirect_url"]);
			}
			return response;
		} else {
			throw new Error("Missing uidb64 or token parameters.");
		}
	} catch (error) {
		if (error.response) {
			return error.response;
		} else {
			throw error;
		}
	}
}

export async function passwordResetConfirm({ request, params }) {
	try {
		const uidb64 = params.uidb64;
		const token = params.token;
		if (uidb64 && token) {
			const data = await request.formData();
			const resetPasswordData = {
				password1: data.get("password1"),
				password2: data.get("password2"),
			};
			const response = await axios.post(
				`/api/auth/reset/${uidb64}/${token}/`,
				resetPasswordData,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			return redirect(`/auth/reset/${uidb64}/${token}?status=done`);
		}else {
			throw new Error("Missing uidb64 or token parameters.");
		}
	} catch (error) {
		if(error.response){
			return error.response;
		}else {
			throw error;
		}
	}
}

