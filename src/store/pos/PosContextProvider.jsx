import { React, useReducer } from "react";
import PosContext from "./pos-context";

const defaultPosState = {
	sale: {
		cust: null,
		sales_payment_method: "",
		saleitem: [],
		gen_voucher_use: null,
	},
	subTotal: 0,
	total: 0,
	commission: [
		{
			sales: null,
			sales_item: null,
			custom_sharing: false,
			emp_share_percent: [
				{
					emp: null,
					sales_amount: null,
				},
			],
		},
	],
};

const posReducer = (state, action) => {
	if (action.actionType === "ADD") {
		let itemFound = false;
		var updatedItems = [];
		updatedItems = state.sale.saleitem.map((item) => {
			if (item.id === action.item.id && item.type === action.item.type) {
				itemFound = true;
				return { ...item, qty: item.qty + action.item.qty };
			} else {
				return item;
			}
		});
		if (!itemFound) {
			updatedItems = state.sale.saleitem.concat(action.item);
		}
		const updatedTotalAmt =
			state.totalAmt + action.item.price * action.item.qty;
		return {
			...state,
			sale: {...state.sale, saleitem: updatedItems},
			totalAmt: updatedTotalAmt,
		};
	} else if (action.actionType === "REMOVE") {
		const itemToRemove = state.sale.saleitem.find(
			(item) =>
				item.id === action.item.id && item.type === action.item.type
		);
		const updatedItems = state.sale.saleitem.filter(
			(item) =>
				item.id !== action.item.id || item.type !== action.item.type
		);
		const updatedTotalAmt =
			state.totalAmt - itemToRemove.price * itemToRemove.qty;
		return {
			...state,
			sale: {...state.sale, saleitem: updatedItems},
			totalAmt: updatedTotalAmt,
		};
	}

	return defaultPosState;
};

const PosContextProvider = (props) => {
	const [posState, dispatchPosAction] = useReducer(
		posReducer,
		defaultPosState
	);
	//context action functions
	const addItem = (item) => {
		dispatchPosAction({
			actionType: "ADD",
			item: item,
		});
	};
	const removeItem = (item) => {
		if (Object.keys(item).length === 0) {
			dispatchPosAction({});
		} else {
			dispatchPosAction({
				actionType: "REMOVE",
				item: item,
			});
		}
	};

	const posContext = {
		sale: posState.sale,
		subTotal: posState.subTotal,
		total: posState.total,
		commission: posState.commission,
		methods: {
			addItem: addItem,
			removeItem: removeItem,
		},
	};
	return (
		<PosContext.Provider value={posContext}>
			{props.children}
		</PosContext.Provider>
	);
};

export default PosContextProvider;
