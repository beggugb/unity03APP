import React from "react";
import { Card, Row, Col  } from "reactstrap";


const InicioView = () => {
  return(
    <>    
    <div className="content">        
      <div className="main-contenido">             
      <Row>
        <Col md="3">
          <Card>
           
          </Card>
        </Col>
        <Col md="6">
          <Card>
         
          </Card>
        </Col>
        <Col md="3">
         <Row>
           <Col>
            <Card>
              Total Tickets
            </Card>           
           </Col>
         </Row>
         <Row>
           <Col>
            <Card>
            Total Clientes
            </Card>   
           </Col>
         </Row>
        </Col>        
      </Row>
      </div>
    </div>    
    </>
  )

};
export default InicioView;
