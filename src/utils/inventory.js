import {
	GET_PRODUCT,
	GET_SERVICE,
	GET_INVENTORY_CATEGORY,
	GET_SERVICE_PACKAGE,
} from "../apis/inventory-api";
import { displayFormat, resourceLoader } from "./utilities";

export async function inventoryLoader(resourcesList = null) {
	try {
		let resources = [
			["productList", GET_PRODUCT],
			["serviceList", GET_SERVICE],
			["servicePackageList", GET_SERVICE_PACKAGE],
			["inventoryCategoryList", GET_INVENTORY_CATEGORY],
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
				let ret = item;
				// Processing for resources other than inventorycategory
				if (ind !== arr.length - 1) {
					if (Array.isArray(item.data)) {
						ret = { data: [...item.data] };
						if (item.data.length !== 0) {
							const inventoryType =
								item.data[0][
									Object.keys(item.data[0]).filter((key) =>
										key.includes("category")
									)[0]
								].type;
							const inventoryTypeCategories = arr[
								arr.length - 1
							].data.filter(
								(item) => item.type === inventoryType
							);
							ret["categories"] = inventoryTypeCategories;
						} else {
							ret["categories"] = [];
						}
					}else{
						ret = {data: item.data}
					}
				}
				return ret;
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
