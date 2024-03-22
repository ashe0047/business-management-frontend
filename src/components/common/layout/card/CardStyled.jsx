import React from "react";
import { Card } from "react-bootstrap";
import "./CardStyled.css";

const CardStyled = ({icon, title, headerComponents, className, children}) => {
	return (
		<Card className={`styled-card ${className}`}>
			<Card.Header className="styled-card-header">
				<Card.Title>
					{icon}
					{title}
				</Card.Title>
				{headerComponents &&
					headerComponents.map((Component, key) => (
						<Component key={key} />
					))}
			</Card.Header>
			{children}
		</Card>
	);
};

export default CardStyled;
