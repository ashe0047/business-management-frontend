import { React, forwardRef } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { Field } from "formik";
import "./PaymentMethodButton.css";

const PaymentMethodButton = () => {
	const paymentMethods = [
		["Cash", "cash"],
		["Credit/Debit Card", "card"],
		["Touch n Go", "touchngo"],
		["Bank Transfer", "banktransfer"],
	];

	// Custom Payment dropdown button
	const PaymentMethodToggle = forwardRef(
		({ children, className, onClick }, ref) => {
			return (
				<Button
					variant="outlined"
					ref={ref}
					onClick={(e) => {
						e.preventDefault();
						onClick(e);
					}}
					className={className}
				>
					{children}
				</Button>
			);
		}
	);
	return (
		<Field name="sale.sales_payment_method">
			{({ field, form, ...props }) => {
				//Default to display Payment Method label if no selection is made
				const displayValue = paymentMethods.find(
					([_, methodValue]) => methodValue === field.value
				);
				return (
					<Dropdown
						drop="down"
						align="end"
						className="d-flex flex-grow-1 w-100"
					>
						<Dropdown.Toggle
							as={PaymentMethodToggle}
							className="payment-method-btn"
						>
							{displayValue ? displayValue[0] : field.value}
						</Dropdown.Toggle>
						<Dropdown.Menu className="payment-method-menu">
							{paymentMethods.map(
								([displayMethod, methodValue], index) => (
									<Dropdown.Item
										key={index}
										eventKey={index}
										onClick={() => {
											form.setFieldValue(
												field.name,
												methodValue
											);
										}}
									>
										{displayMethod}
									</Dropdown.Item>
								)
							)}
						</Dropdown.Menu>
					</Dropdown>
				);
			}}
		</Field>
	);
};

export default PaymentMethodButton;
