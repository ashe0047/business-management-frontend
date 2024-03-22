import { React, useEffect, useState } from "react";
import { ListGroup, Card, Button, Row, Col } from "react-bootstrap";
import { Receipt as ReceiptIcon, RestartAlt } from "@mui/icons-material";
import ReceiptItem from "./ReceiptItem";
import CardStyled from "../../common/layout/card/CardStyled";
import "./Receipt.css";
import PaymentMethodButton from "./PaymentMethodButton";
import { Field } from "formik";
import { getInventoryId } from "../../../utils/utilities";

const Receipt = ({
	arrayHelpers,
	form,
	inventoryResource,
	lastRecId,
	...props
}) => {

	const currentSaleOrderId = `#SO-${(lastRecId+1).toString().padStart(5, "0")}`
	const getInventoryItem = (inventoryType, inventoryId) => {
		const inventory = {
			prod: inventoryResource.productList.data,
			service: inventoryResource.serviceList.data,
			pkg: inventoryResource.servicePackageList.data,
		};
		return inventory[inventoryType].find(
			(item) => item[inventoryType + "_id"] === inventoryId
		);
	};

	useEffect(() => {
		const { subTotal, total } = form.values.sale.saleitem.reduce(
			(acc, saleitem, ind) => {
				const { inventoryType, inventoryId } = getInventoryId(saleitem);
				const inventory = getInventoryItem(inventoryType, inventoryId);
				const inventoryTotalPrice =
					parseFloat(inventory[inventoryType + "_price"]) *
					parseInt(saleitem["sales_item_qty"]);

				return { ...acc, total: acc.total + inventoryTotalPrice };
			},
			{
				subTotal: 0,
				total: 0,
			}
		);
		form.setFieldValue("total", total);
	}, [form.values.sale.saleitem]);

	const checkoutItems = (
		<ListGroup variant="flush">
			{form.values.sale.saleitem.map((item, index) => {
				return (
					<Field name={`sale.saleitem[${index}]`} key={index}>
						{({ field, form, ...props }) => {
							return (
								<ReceiptItem
									saleItemIndex={index}
									field={field}
									form={form}
									getInventoryItem={getInventoryItem}
								/>
							);
						}}
					</Field>
				);
			})}
		</ListGroup>
	);
	const subTotal = `RM ${form.values.subTotal.toFixed(2)}`;
	const totalAmt = `RM ${form.values.total.toFixed(2)}`;
	const clearFormHandler = () => {
		form.resetForm();
	};
	return (
		<CardStyled
			className={""}
			title={
				<>
					<ReceiptIcon className="title-icon" />
					<h4>{currentSaleOrderId}</h4>
				</>
			}
			headerComponents={[PaymentMethodButton]}
		>
			<Card.Body
				style={{ height: 0, overflowY: "auto" }}
				className="trans-summ"
			>
				{checkoutItems}
			</Card.Body>
			<Card.Footer className="d-flex flex-column summary">
				<Row className="d-flex flex-grow-1 footer-row">
					<Col className="checkout-summ-left">
						<div className="amt-summ-label">Subtotal</div>
						<div className="amt-summ-label">
							<h5>Total</h5>
						</div>
					</Col>
					<Col className="checkout-summ-right">
						<div className="amt-summ-val">{subTotal}</div>
						<div className="amt-summ-val">
							<h5>{totalAmt}</h5>
						</div>
					</Col>
				</Row>
				<Row className="d-flex flex-row flex-grow-1 mt-3 receipt-btns">
					<Col className="d-flex flex-grow-0">
						<Button
							variant="filled-tonal"
							className="cancel-btn"
							onClick={clearFormHandler}
						>
							<RestartAlt />
						</Button>
					</Col>
					<Col className="d-flex">
						<Button
							type="submit"
							variant="filled"
							className="submit-btn"
						>
							Submit
						</Button>
					</Col>
				</Row>
			</Card.Footer>
		</CardStyled>
	);
};

export default Receipt;
