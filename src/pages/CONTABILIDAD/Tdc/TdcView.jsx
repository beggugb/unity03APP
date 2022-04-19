import React from "react";
import { Col, Row, Card } from 'reactstrap'
import Calendar from './components/Calendar'
import FormTdc from './components/FormTdc'

const TareasView = () => (
  <div className="content">        
    <div className="main-contenido"> 
      <Row>        
        <Col md="12">
          <Card>
            <Calendar />
          </Card>
        </Col>               
      </Row>
    </div>
  </div>  
 );

export default TareasView
