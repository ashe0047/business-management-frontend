import React, { useContext } from 'react'
import { useAccordionButton, AccordionContext, Card } from 'react-bootstrap'
import './MenuHeaderButton.css'

const MenuHeaderButton = ({children, eventKey, callback, className}) => {
    const {activeEventKey} = useContext(AccordionContext)
    const menuHeaderClick = useAccordionButton(eventKey, () => callback && callback(eventKey))
    const isCurrentEventKey = activeEventKey[0] === eventKey
  return (
    <Card className={`${className} accordion-button ${isCurrentEventKey? "":"collapsed"}`} onClick={menuHeaderClick}>{children}</Card>
  )
}

export default MenuHeaderButton