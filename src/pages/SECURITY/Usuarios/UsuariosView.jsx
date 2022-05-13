import React from "react";
import { Row, Col  } from "reactstrap";
import TableUsuarios from "./components/TableUsuarios";
import EditUsuario from "./components/EditUsuario"

const UsuariosView = () => {      


  return(
    <>    
    <div className="content">     
      <div className="main-contenido">    
         <div className="card-contenidos"> 
         <Row>
            <Col md={3} className="marco">
            <EditUsuario/>
            </Col>
            <Col md={9} className="marco">
            <TableUsuarios/>
            </Col>            
         </Row>
         </div>
      </div>
    </div>    
    </>
  )

};
export default UsuariosView;
