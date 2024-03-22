import { React } from "react";
import "./EmployeeWidget.css";
import { Row, Col, Dropdown } from "react-bootstrap";
import {
	Button,
	IconButton,
	TableContainer,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	OutlinedInput,
	InputAdornment,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { Field } from "formik";
import DropdownTemplate from "../../../../common/layout/dropdown/DropdownTemplate";

const EmployeeWidget = ({
	arrayHelpers,
	form,
	comInd,
	employeeList,
	isCustomSharing,
}) => {
	const inSelectedEmp = (empData) =>
		form.values.commission[comInd].emp_share_percent.some(
			(item) => item.emp === empData.emp_id
		);
	//For +staff button
	const addStaffHandler = (empData) => {
		if (inSelectedEmp(empData)) {
			const itemIndex = form.values.commission[
				comInd
			].emp_share_percent.findIndex(
				(item) => item.emp === empData.emp_id
			);
			arrayHelpers.remove(itemIndex);
		} else {
			arrayHelpers.push({
				emp: empData.emp_id,
				sales_amount: null,
			});
		}
	};
	//For each record's delete btn
	const removeStaffHandler = (emp) => {
		const itemIndex = form.values.commission[
			comInd
		].emp_share_percent.findIndex((item) => item.emp === emp.emp);
		arrayHelpers.remove(itemIndex);
	};

	const selectedEmpDisplay = (
		<Row className="d-flex flex-grow-1">
			<Col className="d-flex">
				<TableContainer>
					<Table aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Staff Name</TableCell>
								{isCustomSharing && (
									<TableCell align="right">Amount</TableCell>
								)}
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							{form.values.commission[
								comInd
							].emp_share_percent.map((emp, ind) => {
								return (
									<TableRow
										className="bg-transparent"
										key={ind}
									>
										<TableCell>
											{
												employeeList.find(
													(item) =>
														item.emp_id === emp.emp
												)?.emp_name
											}
										</TableCell>
										{isCustomSharing && (
											<TableCell
												className="w-50"
												align="right"
											>
												<Field
													name={`commission[${comInd}].emp_share_percent[${ind}].sales_amount`}
													className="w-75"
													size="small"
													startAdornment={
														<InputAdornment position="start">
															RM
														</InputAdornment>
													}
													as={OutlinedInput}
												/>
											</TableCell>
										)}
										<TableCell align="right">
											<IconButton
												edge="end"
												aria-label="delete"
												onClick={() =>
													removeStaffHandler(emp)
												}
											>
												<Delete />
											</IconButton>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Col>
		</Row>
	);
	return (
		<>
			<Row className="d-flex flex-grow-1">
				<Col className="d-flex flex-row">
					<DropdownTemplate
						toggleContent={"Staff"}
						toggleComponent={Button}
						extraProps={{
							dropdown: { className: "ms-auto" },
							menu: {
								align: "end",
							},
							toggle: {
								startIcon: <Add fontSize="small" />,
								color: "tertiary",
								variant: "text",
								className: "me-2 add-staff-btn",
							},
						}}
					>
						{employeeList.map((emp, index) => {
							return (
								<Dropdown.Item
									key={index}
									onClick={() => addStaffHandler(emp)}
								>
									{emp.emp_name}
								</Dropdown.Item>
							);
						})}
					</DropdownTemplate>
				</Col>
			</Row>
			{selectedEmpDisplay}
		</>
	);
};

export default EmployeeWidget;
