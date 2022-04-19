import React from "react";
import { Row, Col  } from "reactstrap";
import TableExperiencias from "./components/TableExperiencias";
import EditExperiencia from "./components/EditExperiencia"

const ExperienciasView = () => {      


  return(          
      <div className="card-contenidos"> 
        <Row>
            <Col md={3} className="marco">
            <EditExperiencia/>
            </Col>
            <Col md={9} className="marco">
            <TableExperiencias/>
            </Col>            
         </Row>
      </div>    
  )

};
export default ExperienciasView;
