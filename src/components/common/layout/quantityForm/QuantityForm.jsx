import { React, useState, forwardRef } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import "./QuantityForm.css";

const QuantityForm = forwardRef(({ field, form, ...props }, ref) => {
	const [quantity, setQuantity] = useState(1);
	const inputChangeHandler = (event) => {
		const value = parseInt(event.target.value);
		!isNaN(value) || value > 0 ? setQuantity(value) : setQuantity(null);
	};
	const incrementHandler = (event) => {
		event.stopPropagation();
		// setQuantity(quantity + 1);
		form.setFieldValue(field.name, field.value + 1);
	};
	const decrementHandler = (event) => {
		event.stopPropagation();
		if (field.value > 1) {
			// setQuantity(quantity - 1);
			form.setFieldValue(field.name, field.value - 1);
		}
	};

	return (
		<InputGroup className="qty-input mx-2 mt-auto">
			<Button
				variant="outlined"
				size="sm"
				className="qty-change-btn"
				onClick={decrementHandler}
			>
				-
			</Button>
			<Form.Control
				type="number"
				size="sm"
				onClick={(e) => e.stopPropagation()}
				{...field}
				{...props}
				// ref={ref}
				className="input-field p-0 text-center"
			/>
			<Button
				variant="outlined"
				size="sm"
				className="qty-change-btn"
				onClick={incrementHandler}
			>
				+
			</Button>
		</InputGroup>
	);
});

export default QuantityForm;
