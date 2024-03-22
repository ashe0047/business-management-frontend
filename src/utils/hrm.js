import { displayFormat, resourceLoader } from "./utilities";
import { GET_EMPLOYEES } from "../apis/hrm-api";

export async function hrmLoader(resourcesList = null) {
	try {
		let resources = [["employeeList", GET_EMPLOYEES]];
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
}
