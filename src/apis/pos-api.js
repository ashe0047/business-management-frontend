import { createApiResource, getApiResource, updateApiResource } from "./api-config";

export const GET_SALE = () => getApiResource('pos', 'sale')
export const POST_SALE = (data) => createApiResource(data, 'pos', 'sale')
export const PUT_SALE = (data, resId) => updateApiResource(data, 'pos', 'sale', resId, 'PUT')
export const PATCH_SALE = (data, resId) => updateApiResource(data, 'pos', 'sale', resId, 'PATCH')

export const GET_POS_LAST_REC_ID = () => getApiResource('core','last_rec_id', null, 'pos', 'sale')