import { getApiResource } from "./api-config";


export const GET_PRODUCT = () => getApiResource('inventory', 'product')
export const GET_SERVICE = () => getApiResource('inventory', 'service')
export const GET_SERVICE_PACKAGE = () => getApiResource('inventory', 'service_package')
export const GET_INVENTORY_CATEGORY = () => getApiResource('inventory', 'inventory_category')