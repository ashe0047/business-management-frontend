import { redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

//constants
export const TOKEN_TYPE = {
	ACCESS: "accesstoken",
	REFRESH: "refreshtoken",
};
export const TOKEN_OPERATION = {
	GET: "GET_TOKEN",
	SET: "SET_TOKEN",
	REMOVE: "REMOVE_TOKEN",
};
//Token Management
export function manageTokens(tokenType, setTokensOperation, token = null) {
	if (setTokensOperation === TOKEN_OPERATION.SET) {
		if (!token) {
			throw new Error("Token must have a value for SET operation");
		}
		localStorage.setItem(tokenType, token);
	} else if (setTokensOperation === TOKEN_OPERATION.REMOVE) {
		localStorage.removeItem(tokenType);
	}else if  (setTokensOperation === TOKEN_OPERATION.GET) {
        return localStorage.getItem(tokenType);
    }
}

export function tokenLoader() {
	return manageTokens(TOKEN_TYPE.ACCESS, TOKEN_OPERATION.GET);
}

export function checkAuthLoader({ request }) {
	const accessToken = manageTokens(TOKEN_TYPE.ACCESS, TOKEN_OPERATION.GET);
	if (!accessToken) {
		return redirect("/auth");
	} else {
		return accessToken;
	}
}

export function userLogout() {
	manageTokens(TOKEN_TYPE.ACCESS, TOKEN_OPERATION.REMOVE);
	manageTokens(TOKEN_TYPE.REFRESH, TOKEN_OPERATION.REMOVE);

	return redirect("/auth");
}

export function isTokenExpired() {
	try {
		const accessToken = manageTokens(TOKEN_TYPE.ACCESS, TOKEN_OPERATION.GET);
		const decodedToken = jwtDecode(accessToken);
		const currentTime = Date.now() / 1000; // Convert current time to seconds
		return decodedToken.exp < currentTime;
	} catch (error) {
		return true; // Error in decoding the token or token has expired
	}
}

export function checkTokenExpirationAndRefresh() {
	const authToken = manageTokens(TOKEN_TYPE.ACCESS, TOKEN_OPERATION.GET);
	if (authToken && isTokenExpired(authToken)) {
		// Perform the refresh token request to the backend
		// You should implement the actual refresh token request to your Django backend here
		// After a successful response, update the token and its expiration time in localStorage
		// localStorage.setItem('authToken', newToken);
		// localStorage.setItem('authExpirationTime', newExpirationTime);
	}
}

// Set up the timer when the app starts or after login
export function setupTokenRefreshTimer(tokenRefreshInterval) {
	setInterval(checkTokenExpirationAndRefresh, tokenRefreshInterval);
}

// Clear the timer when the user logs out or after token refresh
export function clearTokenRefreshTimer(refreshTimer) {
	clearInterval(refreshTimer);
}

//replace refreshtoken and reset timer after a token refresh
//clear refreshtoken and reset timer after logout

//decided to implement refresh during api call instead of interval based as
//it is hard to time the refresh and user action is unpredictable so there might be occurences where the token has expired but has not yet been renewed and user attempted an action that calls api which will result in error
//might be solvable by implementing refresh mechanism in api call independent of the interval mechanism
