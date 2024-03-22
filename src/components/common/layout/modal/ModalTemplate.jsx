import { React, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Avatar, Chip } from "@mui/material";
import "./ModalTemplate.css";

const ModalTemplate = ({
	headerIcon,
	headerTitle,
	size,
	dialogClassName,
	toggleComponent,
	children,
}) => {
	const [show, setShow] = useState(false);
	const modalShowHandler = (e) => {
		setShow(!show);
	};
	
	const toggleComponentRender = (toggleComponent) => {
		if(!toggleComponent.nestedComponent){
			return <toggleComponent.component.function onClick={modalShowHandler} {...toggleComponent.component.props} />
		}
		return <toggleComponent.component.function {...toggleComponent.component.props}>
			{toggleComponentRender(toggleComponent.nestedComponent)}
		</toggleComponent.component.function>
	}
	return (
		<>
			{toggleComponentRender(toggleComponent)}

			<Modal
				show={show}
				onHide={modalShowHandler}
				dialogClassName={dialogClassName}
			>
				<Modal.Header closeButton>
					<Modal.Title>
						{headerIcon}
						<h4>{headerTitle}</h4>
					</Modal.Title>
				</Modal.Header>
				{children}
			</Modal>
		</>
	);
};

export default ModalTemplate;
