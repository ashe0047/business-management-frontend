import React from "react";
import { ListGroup, Card, Row, Col } from "react-bootstrap";
import "./ReceiptItem.css";
import QuantityForm from "../../common/layout/quantityForm/QuantityForm";
import { getInventoryId } from "../../../utils/utilities";
import { Field } from "formik";

const ReceiptItem = ({
	field,
	form,
	getInventoryItem,
	saleItemIndex,
	...props
}) => {
	const { inventoryType, inventoryId } = getInventoryId(field.value);

	const inventory = getInventoryItem(inventoryType, inventoryId);
	const inventoryTotalPrice = (parseFloat(inventory[inventoryType+'_price'])*field.value.sales_item_qty).toFixed(2)
	return (
		<Card className="checkout-item-container">
			<ListGroup.Item className="d-flex flex-row border-0 bg-transparent">
				<Row className="d-flex flex-grow-1">
					<Col className="checkout-item-left">
						<img className="rounded" />
						<span className="item-name">
							{inventory[inventoryType + "_name"]}
						</span>
						<span className="item-qty">{`x${field.value.sales_item_qty}`}</span>
					</Col>
					<Col xl={4} className="checkout-item-right">
						<span className="item-price">{`RM ${
							inventoryTotalPrice
						}`}</span>
						<Field
							name={`sale.saleitem[${saleItemIndex}].sales_item_qty`}
						>
							{({ field, form, ...props }) => {
								return (
									<QuantityForm
										field={field}
										form={form}
										{...props}
									/>
								);
							}}
						</Field>
					</Col>
				</Row>
			</ListGroup.Item>
		</Card>
	);
};

export default ReceiptItem;
