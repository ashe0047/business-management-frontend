import { React, useEffect, useState } from "react";
import { Card, ListGroup, Row, Col, Accordion } from "react-bootstrap";
import "./CustomerWidget.css";
import { Field, useFormikContext } from "formik";
import CustomerModal from "./CustomerModal";
import { Person2Sharp } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faIdCard,
	faCalendar,
	faPhone,
	faAt,
	faLocationDot,
	faBriefcase,
	faFilter,
	faFileMedical,
} from "@fortawesome/free-solid-svg-icons";

const CustomerWidget = ({ menuList, ...props }) => {
	//formik context
	const { values } = useFormikContext();
	const selectedCust =
		Object.keys(values.sale.cust).length === 0 ? null : values.sale.cust;

	const displayFieldMapping = () => {
		const displayFields = [
			[["", "Name"], "name"],
			[["", "#"], "id"],
			[[faIdCard, "IC No."], "nric"],
			[[faCalendar, "D.O.B"], "dob"],
			[[faBriefcase, "Occupation"], "occupation"],
			[[faFilter, "Source"], "source"],
			[[faFileMedical, "Medical History"], "med"],
			[[faPhone, "Phone No."], "phone"],
			[[faAt, "E-mail"], "email"],
			[[faLocationDot, "Address"], "address"],
		];
		const keys = Object.keys(menuList[0]);
		return displayFields.reduce((acc, [fieldName, keyword]) => {
			const key = keys.find((k) => k.includes(keyword));
			return acc.concat([[key, fieldName]]);
		}, []);
	};

	const custFieldKeys = displayFieldMapping();
	// const [selectedCust, setSelectedCust] = useState(null);
	// const custSelectHandler = (custData) => {
	// 	setSelectedCust(custData);
	// };

	// useEffect(() => {
	// 	form.setFieldValue(field.name, selectedCust);
	// }, [selectedCust])

	const selectedCustDisplay =
		selectedCust !== null ? (
			<Row xl={2}>
				<Col>
					{custFieldKeys
						.slice(2, 6)
						.map(([key, [fieldName, _]], index) => {
							return (
								<ListGroup
									key={index}
									horizontal
									className="flex-grow-1"
								>
									<ListGroup.Item className="cust-info-col">
										<FontAwesomeIcon icon={fieldName} />
									</ListGroup.Item>
									<ListGroup.Item className="cust-contact-col">
										{selectedCust[key]}
									</ListGroup.Item>
								</ListGroup>
							);
						})}
				</Col>
				<Col>
					{custFieldKeys
						.slice(7)
						.map(([key, [fieldName, _]], index) => {
							return (
								<ListGroup
									key={index}
									horizontal
									className="flex-grow-1"
								>
									<ListGroup.Item className="cust-info-col">
										<FontAwesomeIcon icon={fieldName} />
									</ListGroup.Item>
									<ListGroup.Item className="cust-contact-col">
										{selectedCust[key]}
									</ListGroup.Item>
								</ListGroup>
							);
						})}
				</Col>
			</Row>
		) : (
			<div style={{ color: "red", fontWeight: "bold" }}>
				Please select a customer
			</div>
		);
	// return (
	// 	<Accordion.Item eventKey="0">
	// 		<Card.Header className="widget-header">
	// 			<Accordion.Button>
	// 				{selectedCust === null ? (
	// 					<h5 className="me-auto mb-0">
	// 						<Person2Sharp />
	// 						Customer
	// 					</h5>
	// 				) : (
	// 					<ListGroup horizontal className="flex-grow-1">
	// 						<h5 className="mb-0">
	// 							{selectedCust[custFieldKeys[0][0]]}
	// 						</h5>
	// 						<h5 className="ms-auto mb-0">{`# ${
	// 							selectedCust[custFieldKeys[1][0]]
	// 						}`}</h5>
	// 					</ListGroup>
	// 				)}
	// 			</Accordion.Button>
	// 			{/* <div className="btn-divider"/> */}
	// 			<Field name="sale.cust">
	// 				{({ field, form, ...props }) => {
	// 					return (
	// 						<CustomerModal
	// 							field={field}
	// 							form={form}
	// 							// onSelect={custSelectHandler}
	// 							menuList={menuList}
	// 							custFieldKeys={custFieldKeys}
	// 							{...props}
	// 						/>
	// 					);
	// 				}}
	// 			</Field>
	// 		</Card.Header>
	// 		<Accordion.Body className="d-flex flex-column widget-body">
	// 			{selectedCustDisplay}
	// 		</Accordion.Body>
	// 	</Accordion.Item>
	// );

	return (
		<Field name="sale.cust">
			{({ field, form, ...props }) => {
				return (
					<CustomerModal
						field={field}
						form={form}
						// onSelect={custSelectHandler}
						menuList={menuList}
						custFieldKeys={custFieldKeys}
						{...props}
					/>
				);
			}}
		</Field>
	);
};

export default CustomerWidget;
