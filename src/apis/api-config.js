import { axiosInstance } from "./auth-api";

export const GET_API_ENDPOINTS = (app, resource, id = null, ...args) => {

	const API_RESOURCE = {
		auth: {
			register: "register",
			token: "token",
			refresh_token: "token/refresh",
			password_reset: "passwordreset",
			reset: (uidb64, token) => `reset/${uidb64}/${token}`,
			user: "user",
			users: "users",
		},
		core: {
			commission: "commission",
			last_rec_id: (app, resource) => `last_rec_id/${app}/${resource}`,
			percentage_multiplier_threshold: "percentagemultiplierthreshold",
			product_commission_structure: "productcommissionstructure",
			service_commission_structure: "servicecommissionstructure",
			voucher_commission_structure: "vouchercommissionstructure",
		},
		crm: {
			cust: "cust",
			treatment: "treatment",
		},
		hrm: {
			bank_database: "bankdatabase",
			emp: "emp",
			emp_accounts: "emp/accounts",
			emps: "emps",
		},
		inventory: {
			inventory_category: "inventorycategory",
			product: "product",
			service: "service",
			service_package: "servicepackage",
		},
		marketing: {
			category_voucher: "categoryvoucher",
			generic_voucher: "genericvoucher",
			item_voucher: "itemvoucher",
		},
		pos: {
			sale: "sale",
			sale_item: "saleitem",
		},
	};
	const res = API_RESOURCE[app][resource];
	if (res === undefined) {
		throw new Error("app or resource param is invalid");
	}
	if (typeof res === "function") {
		const ENDPOINT_URL = `/api/${app}/${res(...args)}/`;
		return ENDPOINT_URL;
	} else {
		const ENDPOINT_URL = `/api/${app}/${res}${
			id === null ? "/" : `/${id}`
		}`;
		return ENDPOINT_URL;
	}
};

export async function getApiResource(app, resource, id = null, ...args) {
	try {
		const response = await axiosInstance.get(
			GET_API_ENDPOINTS(app, resource, id, ...args)
		);

		return response;
	} catch (error) {
		throw error;
	}
}

export async function createApiResource(data, app, resource, id = null) {
	try {
		const response = await axiosInstance.post(
			GET_API_ENDPOINTS(app, resource, id),
			data
		);

		return response;
	} catch (error) {
		throw error;
	}
}

export async function updateApiResource(
	data,
	app,
	resource,
	id = null,
	operation = "PUT"
) {
	try {
		if (operation === "PUT") {
			const response = await axiosInstance.put(
				GET_API_ENDPOINTS(app, resource, id),
				data
			);
			return response;
		} else if (operation === "PATCH") {
			const response = await axiosInstance.patch(
				GET_API_ENDPOINTS(app, resource, id),
				data
			);
			return response;
		} else {
			throw new Error("Operation is not valid");
		}
	} catch (error) {
		throw error;
	}
}
