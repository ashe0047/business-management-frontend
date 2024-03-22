import { defer, redirect } from "react-router-dom";
import { crmLoader } from "./crm";
import { inventoryLoader } from "./inventory";
import { hrmLoader } from "./hrm";
import { GET_CUSTOMER } from "../apis/crm-api";
import { GET_EMPLOYEES } from "../apis/hrm-api";
import { GET_POS_LAST_REC_ID, GET_SALE, POST_SALE } from "../apis/pos-api";
import { resourceCreator, resourceLoader } from "./utilities";
import { displayFormat } from "./utilities";

export async function posLoader() {
	const posResource = async (resourcesList = null) => {
		try {
			let resources = [
				["saleList", GET_SALE],
				["last_rec_id", GET_POS_LAST_REC_ID],
			];
			if (resourcesList) {
				resources = resourcesList;
			}

			const resource = await resourceLoader(resources)
				.then((results) => results)
				.catch((error) => {
					throw error;
				});
			return resource
				.map((item, ind, arr) => {
					if (Array.isArray(item.data)) {
						const ret = { data: [...item.data] };
						return ret;
					} else {
						const ret = { data: item.data };
						return ret;
					}
				})
				.reduce((acc, item, ind) => {
					const newAcc = { ...acc };
					const resourceKey = resources[ind][0];
					newAcc[resourceKey] = {
						...item,
						data: displayFormat(item.data),
					};

					return newAcc;
				}, {});
		} catch (error) {
			return Promise.reject(error);
		}
	};

	const currentSaleRecId =
		posResource([["last_rec_id", GET_POS_LAST_REC_ID]]);
	const crmResource = crmLoader([['customerList', GET_CUSTOMER]]);
	const hrmResource = hrmLoader([['employeeList', GET_EMPLOYEES]]);
	const inventoryResource = inventoryLoader();
	return defer({
		data: Promise.all([
			crmResource,
			hrmResource,
			inventoryResource,
			currentSaleRecId,
		])
			.then((results) => {
				return results;
			})
			.catch((error) => {
				throw error;
			}),
	});
}

export async function posAction({ request }) {
	try {
		const data = await request.json();
		const saleData = data.sale;
		const response = resourceCreator([[['saleList', POST_SALE], saleData]]);
		// console.log(data.entries());
		// const posResource = await resourceCreator();

		return redirect("/pos?render=invoice");
	} catch (error) {
		throw error;
	}
}
