import { React, useState, useContext, useEffect } from "react";
import { Row, Col, Accordion } from "react-bootstrap";
import { FieldArray, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
	Form as RouterForm,
	useSubmit,
	useSearchParams,
} from "react-router-dom";
import { PointOfSale } from "@mui/icons-material";
import Receipt from "./checkout/Receipt";
import PosContextProvider from "../../store/pos/PosContextProvider";
import PosContext from "../../store/pos/pos-context";
import InvoiceTemplate from "./invoice/InvoiceTemplate";
import TabbedMenuList from "./tabMenuList/TabbedMenuList";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Spa, Inventory } from "@mui/icons-material";
import LoadingIndicator from "../common/layout/feedback/LoadingIndicator";
import PageError from "../common/layout/feedback/PageError";
import Feedback from "../common/layout/feedback/Feedback";
import CommissionWidget from "./TransactionInfo/commissionInfo/CommissionWidget";
import "./Pos.css";
import TransactionInfo from "./TransactionInfo/TransactionInfo";

const saleValidationSchema = Yup.object().shape({
	cust: Yup.object()
		.shape({
			cust_name: Yup.string().required("Customer name is required"),
			cust_phone_num: Yup.number().required(
				"Customer phone number is required"
			),
			cust_address: Yup.string(),
			cust_dob: Yup.string(),
			cust_email: Yup.string().required("Customer email is required"),
			cust_nric: Yup.number().required("Customer IC number is required"),
			cust_occupation: Yup.string(),
			cust_source: Yup.string(),
			cust_med_hist: Yup.string(),
		})
		.required("Customer is required. Please select a customer"),
	sales_payment_method: Yup.string()
		.test(
			"notDisplayLabelValue",
			"Please select a payment method",
			(value) => {
				return value !== "Payment Method";
			}
		)
		.required("Please select a payment method"),
	saleitem: Yup.array()
		.of(
			Yup.object().shape({
				service: Yup.number().notRequired(),
				pkg_sub: Yup.object()
					.shape({
						pkg_sub_id: Yup.number(),
						pkg: Yup.number(),
						paid_amt: Yup.string(),
					})
					.notRequired(),
				prod: Yup.number().notRequired(),
				sale_item_type: Yup.string().required(
					"Sale item type cannot be empty"
				),
				sales_item_qty: Yup.number().required(
					"Sale item must have a quantity"
				),
				voucher_sale: Yup.object().shape({
					voucher_sale_type: Yup.string(),
					voucher_sale_id: Yup.number(),
				}),
				voucher_use: Yup.object().shape({
					voucher_use_type: Yup.string(),
					voucher_use_id: Yup.number(),
				}),
			})
		)
		.min(1, "At least 1 sale item is required"),
	gen_voucher_use: Yup.array().notRequired(),
});

const commissionValidationSchema = Yup.array()
	.of(
		Yup.object().shape({
			sales: Yup.number().when("sales_item", {
				is: (sales_item) => !sales_item || sales_item.trim() === "",
				then: (schema) =>
					schema.required(
						"At least one of sales or sales_item is required"
					),
				otherwise: (schema) => schema.notRequired(),
			}),
			sale_item: Yup.number()
				.when("sales", {
					is: (sales) => !sales || sales.trim() === "",
					then: (schema) =>
						schema.required(
							"At least one of sales or sales_item is required"
						),
					otherwise: (schema) => schema.notRequired(),
				})
				.test(
					"exclusive-fields",
					"Both fields cannot have values at the same time",
					function () {
						const { sales, sales_item } = this.parent;
						return (sales && !sales_item) || (!sales && sales_item);
					}
				),
			custom_sharing: Yup.boolean().notRequired(),
			emp_share_percent: Yup.array().of(
				Yup.object({
					emp: Yup.number().required("Please select a staff"),
					share_amount: Yup.string().when("custom_sharing", {
						is: true,
						then: (schema) =>
							schema.required(
								"Custom sharing is on, please specify the sharing amount"
							),
						otherwise: (schema) => schema,
					}),
				})
			),
		})
	)
	.min(1, "Add at least 1 sale item to show setting");

const posValidationSchema = Yup.object().shape({
	sale: saleValidationSchema,
	subTotal: Yup.number(),
	total: Yup.number(),
	commission: commissionValidationSchema,
});
const Pos = (props) => {
	//inventory data loading
	const loaderData = useLoaderData();

	const posCtx = useContext(PosContext);

	//Sets the icon and title for the root layout
	const headerHandler = useOutletContext().headerHandler;
	useEffect(
		() =>
			headerHandler({
				icon: <PointOfSale className="me-2 h-100 p-auto m-auto fs-2" />,
				title: "POS",
			}),
		[]
	);
	//Invoice display
	const [searchParams, setSearchParams] = useSearchParams();
	const renderInvoice = searchParams.get("render") === "invoice";

	//Submission
	const submit = useSubmit();
	const formik = useFormik({
		initialValues: posCtx,
		validationSchema: posValidationSchema,
		onSubmit: (values) => {
			submit(values, {
				method: "post",
				encType: "application/json",
			});
		},
	});

	return (
		<Feedback
			fallback={<LoadingIndicator />}
			// errorelement={<PageError />}
			resolve={loaderData.data}
		>
			{(resolvedLoaderData) => {
				const [
					crmResource,
					hrmResource,
					inventoryResource,
					{
						last_rec_id: {
							data: { id: lastRecId },
						},
					},
				] = resolvedLoaderData;
				const { productList, serviceList, servicePackageList } =
					inventoryResource;
				const { customerList } = crmResource;
				const { employeeList } = hrmResource;
				return renderInvoice ? (
					<PosContextProvider>
						<InvoiceTemplate
							customerName={"test"}
							invoiceDate={"test"}
							lineItems={[]}
						/>
					</PosContextProvider>
				) : (
					<PosContextProvider>
						<RouterForm
							noValidate
							method="post"
							onSubmit={formik.handleSubmit}
							className="d-flex flex-grow-1"
						>
							<FormikProvider value={formik}>
								<Row className="d-flex flex-grow-1">
									<Col md={6} className="d-flex flex-column">
										<Row className="flex-grow-1">
											<Col className="d-flex flex-column">
												<TabbedMenuList
													items={[
														{
															icon: (
																<Inventory className="me-2" />
															),
															title: "Products",
															key: "prod",
															menuList:
																productList.data,
															filterList:
																productList.categories,
														},
														{
															icon: (
																<Spa className="me-2" />
															),
															title: "Services",
															key: "service",
															menuList:
																serviceList.data,
															filterList:
																serviceList.categories,
														},
														{
															icon: (
																<Spa className="me-2" />
															),
															title: "Service Packages",
															key: "pkg",
															menuList:
																servicePackageList.data,
															filterList:
																servicePackageList.categories,
														},
													]}
												/>
											</Col>
										</Row>
										{/* Transaction section  */}
									</Col>
									{/* <Col md={3} className="d-flex flex-column">
										<Accordion defaultActiveKey={"0"} flush>
											<CustomerWidget
												menuList={customerList.data}
											/>
											<EmployeeWidget
												menuList={employeeList.data}
											/>
										</Accordion>
										<CommissionWidget />
									</Col> */}
									<Col className="d-flex flex-column">
										<Row>
											<Col>
												<TransactionInfo
													customerList={
														customerList.data
													}
													employeeList={
														employeeList.data
													}
												/>
											</Col>
										</Row>
										<Row className="d-flex flex-grow-1">
											<Col>
												<CommissionWidget
													employeeList={
														employeeList.data
													}
												/>
											</Col>
											<Col className="d-flex flex-column">
												<FieldArray name="saleitem">
													{({
														move,
														swap,
														push,
														insert,
														unshift,
														pop,
														remove,
														replace,
														form,
													}) => {
														return (
															<Receipt
																arrayHelpers={{
																	move,
																	swap,
																	push,
																	insert,
																	unshift,
																	pop,
																	remove,
																	replace,
																}}
																form={form}
																inventoryResource={
																	inventoryResource
																}
																lastRecId={
																	lastRecId
																}
															/>
														);
													}}
												</FieldArray>
											</Col>
										</Row>
									</Col>
								</Row>
							</FormikProvider>
						</RouterForm>
					</PosContextProvider>
				);
			}}
		</Feedback>
	);
};

export default Pos;
