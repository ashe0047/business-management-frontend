import React, { useEffect } from "react";
import "./CommissionForm.css";
import { Col, Row } from "react-bootstrap";
import { Stack, Switch, Typography } from "@mui/material";
import { Field, FieldArray } from "formik";
import EmployeeWidget from "../employeeInfo/EmployeeWidget";

const CommissionForm = ({ arrayHelpers, form, granularity, employeeList }) => {
	const isSale = granularity === "sale";
	const saleItems = form.values.sale.saleitem;

	useEffect(() => {
		if (!isSale) {
			form.setFieldValue(
				"commission",
				saleItems.map((item, ind) => {
					return {
						sales_item: null,
						custom_sharing: false,
						emp_share_percent: [],
					};
				})
			);
		} else {
			form.setFieldValue("commission", [
				{
					sales: null,
					custom_sharing: false,
					emp_share_percent: [],
				},
			]);
		}
		form.setFieldTouched("commission", true);
	}, [isSale, saleItems]); //cannot set form as dependency as it will result in a loop

	return (
		<Row>
			<Col>
				{form.values.commission.map((comItem, ind) => {
					return (
						<Stack key={ind} direction={"column"} gap={1}>
							<Stack
								direction={"row"}
								spacing={"auto"}
								marginBottom={2}
							>
								<Typography variant="body">
									Custom Sharing
								</Typography>
								<Field
									name={`commission[${ind}].custom_sharing`}
									as={Switch}
								/>
							</Stack>
							<FieldArray
								name={`commission[${ind}].emp_share_percent`}
							>
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
									...props
								}) => {
									return (
										<EmployeeWidget
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
											comInd={ind}
											employeeList={employeeList}
											isCustomSharing={
												comItem.custom_sharing
											}
										/>
									);
								}}
							</FieldArray>
						</Stack>
					);
				})}
			</Col>
		</Row>
	);
};

export default CommissionForm;
