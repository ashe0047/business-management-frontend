import { createContext } from "react";

const saleItem = {
	service: 0,
	pkg_sub: {
		pkg_sub_id: 0,
		pkg: 0,
		paid_amt: "0.00",
	},
	prod: 0,
	sale_item_type: "",
	sales_item_qty: 0,
	voucher_sale: {
		voucher_sale_type: "",
		voucher_sale_id: 0,
	},
	voucher_use: {
		voucher_use_type: "",
		voucher_use_id: 0,
	},
};
const sale = {
	cust: {
		cust_name: "",
		cust_phone_num: 0,
		cust_address: "",
		cust_dob: "",
		cust_email: "",
		cust_nric: 0,
		cust_occupation: "",
		cust_source: "advertisement",
		cust_med_hist: "",
	},
	sales_payment_method: "",
	saleitem: [
		{
			service: 0,
			pkg_sub: {
				pkg_sub_id: 0,
				pkg: 0,
				paid_amt: "0.00",
			},
			prod: 0,
			sale_item_type: "",
			sales_item_qty: 0,
			voucher_sale: {
				voucher_sale_type: "",
				voucher_sale_id: 0,
			},
			voucher_use: {
				voucher_use_type: "",
				voucher_use_id: 0,
			},
		},
	],
	gen_voucher_use: [0],
};

const commission = [
	{
		sales: 0,
		custom_sharing: false,
		emp_share_percent: [],
	},
];
const PosContext = createContext({
	sale: {
		cust: {},
		sales_payment_method: "Payment Method",
		saleitem: [],
		gen_voucher_use: [],
	},
	subTotal: 0,
	total: 0,
	commission: commission,
	methods: {
		addItem: (item) => {},
		removeItem: (id) => {},
	},
});

export default PosContext;
