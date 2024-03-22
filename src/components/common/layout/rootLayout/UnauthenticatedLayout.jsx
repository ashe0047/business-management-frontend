import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { WavingHand } from "@mui/icons-material";
import "./UnauthenticatedLayout.css";

const UnauthenticatedLayout = (props) => {
  const [currentHeader, setCurrentHeader] = useState({});
  const { icon, title } = currentHeader;

  return (
    <Container fluid="True" className="px-0">
      <Row className="m-0">
        {/* left hand side */}
        <Col className="vh-100 py-3 d-flex flex-column side-header">
          <div className="left-title-container">
            <div className="welcome-container d-flex flex-row">
              <h2>
                <WavingHand className="me-2" fontSize="large" /> Welcome To,
              </h2>
            </div>
            <h1 className="left-title">Shape Beauty</h1>
            <h3 className="left-subtitle">Business Management System</h3>
          </div>
        </Col>
        {/* Right hand side */}
        <Col className="vh-100 py-auto">
          <Row className="d-flex flex-grow-1 h-100">
            <Col className="d-flex flex-column col-auto mx-auto">
              <div className="right-title-container">
                {icon}
                <h1 className="right-title">{title}</h1>
              </div>
              <Outlet context={{ headerHandler: setCurrentHeader }} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UnauthenticatedLayout;
