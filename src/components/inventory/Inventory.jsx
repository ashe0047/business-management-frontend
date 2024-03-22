import {React, useEffect} from "react";
import { useOutletContext } from "react-router-dom";import {Row, Col} from 'react-bootstrap'

const Inventory = () => {
  //Sets the icon and title for the root layout
  const headerHandler = useOutletContext().headerHandler;
  useEffect(
    () =>
      headerHandler({
        icon: "",
        title: "Inventory Management",
      }),[]
  );
  return (
    <Row className='d-flex flex-grow-1'>
      <Col>
      </Col>
    </Row>
  )
}

export default Inventory