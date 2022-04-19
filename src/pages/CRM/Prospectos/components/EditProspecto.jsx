import React from "react";
import { useSelector } from 'react-redux'
import {  Button, Row, Col, Card, CardBody } from "reactstrap"
import FormProspecto from './FormProspecto' 
import ProspectoCliente from '../../Clientes/components/ProspectoCliente'
import ListaProspectos from "./ListaProspectos";
import ArticuloProspecto from "../../../INVENTARIOS/Articulos/components/ArticuloProspecto"
import SearchArticuloProspecto from "../../../INVENTARIOS/Articulos/components/SearchArticuloProspecto"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const EditProspecto = ({getComponent}) => {

    return (              
      <>
      <Row>        
        <Col md="3" className="btnBack">  
          <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> LISTA PROMOCIONES
          </Button>              
        </Col>  
      </Row>  

      <Row>         
        <Col md="3">        
          <Card>
            <CardBody>
              <FormProspecto/>                                      
            </CardBody>   
          </Card>     
        </Col> 
        <Col md="3">        
          <Card>
            <CardBody>
              <SearchArticuloProspecto/>
              <ArticuloProspecto/>                                     
            </CardBody>   
          </Card>     
        </Col> 
        <Col md="6">        
          <Card>
            <CardBody>
              <ProspectoCliente/>
              <ListaProspectos/>
            </CardBody>   
          </Card>     
        </Col> 
      </Row>
                               
      </>  
                                                   
    );
};
export default EditProspecto;
