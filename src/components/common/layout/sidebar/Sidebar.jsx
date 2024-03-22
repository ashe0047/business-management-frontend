import { Card, Nav, Accordion, AccordionButton, Button } from "react-bootstrap";
import { useState } from "react";
import "./Sidebar.css";
import { Link, useSubmit } from "react-router-dom";
import {
	Dashboard,
	PointOfSale,
	Inventory,
	KeyboardDoubleArrowRight,
	Person,
} from "@mui/icons-material";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

function Sidebar({ mode, setMode }) {
	const [expanded, setExpanded] = useState(false);

	const handleMouseEnter = () => {
		setExpanded(true);
	};

	const handleMouseLeave = () => {
		setExpanded(false);
	};

	//logout handler
	let submit = useSubmit();
	const logoutHandler = () => {
		submit(null, {
			method: "post",
			action: "/logout",
		});
	};

	return (
		<Card
			className={`sidebar ${expanded ? "open" : ""}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Card.Img></Card.Img>
			<Card.Body>
				{expanded ? (
					<>
						<Card.Title className="text-center p-3 mt-4">
							<h4 className="sidebar-title">Shape Beauty BMS</h4>
						</Card.Title>
						<Accordion className="mt-2">
							<Accordion.Item
								eventKey="0"
								className="sidebar-menuitem"
							>
								<Link to={"/"}>
									<Button className="sidebar-menuitem accordion-button collapsed no-dropdown">
										<Dashboard className="me-3" />
										Dashboard
									</Button>
								</Link>
								<Accordion.Body></Accordion.Body>
							</Accordion.Item>
							<Accordion.Item
								eventKey="1"
								className="sidebar-menuitem"
							>
								<Link to={"/pos"}>
									<AccordionButton className="sidebar-menuitem">
										<PointOfSale className="me-3" />
										Point of Sales
									</AccordionButton>
								</Link>
								<Accordion.Body className="flex-column text-end">
									<Nav.Link as={Link} to={"pos/sales"}>
										View Sales
									</Nav.Link>
								</Accordion.Body>
								<Accordion.Body></Accordion.Body>
							</Accordion.Item>
							<Accordion.Item
								eventKey="2"
								className="sidebar-menuitem"
							>
								<Link to={"/crm"}>
									<AccordionButton className="sidebar-menuitem">
										<Person className="me-3" />
										Customer Relationship Management
									</AccordionButton>
								</Link>
								<Accordion.Body className="flex-column text-end">
									<Nav.Link>Appointment</Nav.Link>
									<Nav.Link>Appointment</Nav.Link>
								</Accordion.Body>
							</Accordion.Item>
							<Accordion.Item
								eventKey="3"
								className="sidebar-menuitem"
							>
								<Link to={"/inventory"}>
									<AccordionButton className="sidebar-menuitem">
										<Inventory className="me-3" />
										Inventory Management
									</AccordionButton>
								</Link>
								<Accordion.Body className="flex-column text-end">
									<Nav.Link
										as={Link}
										to={"inventory/products"}
									>
										Product Management
									</Nav.Link>
									<Nav.Link
										as={Link}
										to={"inventory/services"}
									>
										Service Management
									</Nav.Link>
									<Nav.Link
										as={Link}
										to={"inventory/servicepackages"}
									>
										Service Package Management
									</Nav.Link>
									<Nav.Link
										as={Link}
										to={"inventory/tracking"}
									>
										Inventory Tracking
									</Nav.Link>
									<Nav.Link
										as={Link}
										to={"inventory/analytics"}
									>
										Report & Analytics
									</Nav.Link>
								</Accordion.Body>
								<Accordion.Body></Accordion.Body>
							</Accordion.Item>
						</Accordion>
					</>
				) : (
					<KeyboardDoubleArrowRight className="p-auto m-auto h-100" />
				)}
			</Card.Body>
			{expanded && (
				<Card.Footer>
					{/* <Nav className="flex-column">
						<Nav.Link as={Link} to={"/profile"}>
							Profile
						</Nav.Link>
						<Nav.Link as={Link} to={"/settings"}>
							Settings
						</Nav.Link>
						<Nav.Link as={Link} onClick={logoutHandler}>
							Logout
						</Nav.Link>
					</Nav> */}
					<ToggleButtonGroup
						exclusive
						color="secondary"
						value={mode}
						onChange={setMode}
						className="mode-control"
					>
						<ToggleButton value={"light"} className="mode-options">Light</ToggleButton>
						<ToggleButton value={"system"} className="mode-options">System</ToggleButton>
						<ToggleButton value={"dark"} className="mode-options">Dark</ToggleButton>
					</ToggleButtonGroup>
				</Card.Footer>
			)}
		</Card>
	);
}
export default Sidebar;
