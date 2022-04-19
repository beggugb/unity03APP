import React from "react";
import { Row, Col  } from "reactstrap";
import TableEstudios from "./components/TableEstudios";
import EditEstudio from "./components/EditEstudio"

const EstudiosView = () => {      


  return(          
      <div className="card-contenidos"> 
        <Row>
            <Col md={3} className="marco">
            <EditEstudio/>
            </Col>
            <Col md={9} className="marco">
            <TableEstudios/>
            </Col>            
         </Row>
      </div>    
  )

};
export default EstudiosView;
