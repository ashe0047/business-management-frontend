export const fontScale = (parentWidth, scaleFactor) => {
	const scaledFontSize = parentWidth * scaleFactor;
	return `${scaledFontSize}px`;
};

export const tempGDUrlFix = (url) => {
    // Regular expression to match the 'id' parameter in the URL
    const regex = /[?&]id=([^&#]+)/;
    
    // Match the 'id' parameter using the regular expression
    const match = url.match(regex);

    // Check if there is a match
    if (match && match[1]) {
        // Extracted 'id' parameter value
        const idValue = match[1];
        return `https://lh3.googleusercontent.com/d/${idValue}`;
    } else {
        // 'id' parameter not found
        return null;
    }
}

export const displayFormat = (data) => {
	const fieldFormat = ([k, v]) => {
		const formattedEntry = Array.from([k, v]);
		if (
			!isNaN(parseFloat(v)) &&
			["price", "cost", "amt", "amount", "discount"].some((keyword) =>
				k.includes(keyword)
			)
		) {
			formattedEntry[1] = parseFloat(v).toFixed(2);
		}
		return formattedEntry;
	};

	return Array.isArray(data)? data.map((item) => {
		return Object.fromEntries(
			Object.entries(item).map((entry) => {
				return fieldFormat(entry);
			})
		);
	}) : Object.fromEntries(
		Object.entries(data).map((entry) => {
			return fieldFormat(entry);
		})
	);;
};

// POS Utilities Function
export const getInventoryId = (saleItem) => {
	const inventoryIdFields = ["prod", "service", "pkg"];
	for (const key in saleItem) {
		if (inventoryIdFields.includes(key)) {
			return { inventoryType: key, inventoryId: saleItem[key] }; // Found the first match, return key and value
		}

		if (typeof saleItem[key] === "object") {
			const nestedMatch = getInventoryId(saleItem[key]);
			if (nestedMatch) {
				return nestedMatch; // Found the first match in the nested object, return key and value
			}
		}
	}

	return null; // No matching key found
};
export const inventoryTypeToSaleItemKeyMapper = (
	inventoryType,
	saleItemKey = undefined
) => {
	const typeMapping = {
		service: "service",
		prod: "prod",
		pkg: "pkg_sub",
	};
	return Object.entries(typeMapping).find(([k, v]) =>
		inventoryType ? k === inventoryType : v === saleItemKey
	)[inventoryType ? 1 : 0];
};
/**
 * Maps the correct inventory types such as Product, Service, ServicePackage to the saleItem inventory key
 *
 * @param {*} inventoryType
 * @param {*} inventoryItem
 * @param {*} saleItem
 * @returns
 */
export const saleItemProcessor = (inventoryType, inventoryItem, saleItem) => {
	let mappedSaleItem = { ...saleItem };
	mappedSaleItem[inventoryTypeToSaleItemKeyMapper(inventoryType)] =
		inventoryType === "pkg"
			? { pkg: inventoryItem[inventoryType + "_id"] }
			: inventoryItem[inventoryType + "_id"];
	return mappedSaleItem;
};

//API Resource Utilities Functions
export const resourceLoader = async (resources) => {
	try {
		const resourcesRequest = resources.map(
			async ([_, resource]) => await resource()
		);
		const resourcesResponse = await Promise.all(resourcesRequest)
			.then((results) => {
				return results;
			})
			.catch((error) => {
				throw error;
			});
		return resourcesResponse;
	} catch (error) {
		throw error;
	}
};

export const resourceCreator = async (resources) => {
	try {
		const resourcesRequest = resources.map(
			async ([[_, resource], data]) => await resource(data)
		);
		const resourcesResponse = await Promise.all(resourcesRequest)
			.then((results) => results)
			.catch((error) => {
				throw error;
			});
		return resourcesResponse;
	} catch (error) {
		throw error;
	}
};

export const resourceUpdater = async (resources) => {
	try {
	} catch (error) {
		throw error;
	}
};
