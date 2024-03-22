import React from "react";
import { Dropdown } from "react-bootstrap";
import "./DropdownTemplate.css";

const DropdownTemplate = ({
	btnTitle,
	headerTitle,
	toggleContent,
	toggleComponent,
	icon,
	align,
	drop,
	className,
	headerOn,
	children,
	extraProps,
	...props
}) => {
	const dropdownMenu = (
		<Dropdown.Menu {...extraProps.menu}>
			{headerOn ? (
				<>
					<Dropdown.Header>{headerTitle}</Dropdown.Header>
					<Dropdown.Divider />
				</>
			) : (
				""
			)}
			{children}
		</Dropdown.Menu>
	);

	return (
		<Dropdown
			onClick={(e) => e.stopPropagation()}
			{...extraProps.dropdown}
		>
			<Dropdown.Toggle as={toggleComponent} {...extraProps.toggle}>
				{toggleContent}
			</Dropdown.Toggle>
			{dropdownMenu}
		</Dropdown>
	);
};

export default DropdownTemplate;
