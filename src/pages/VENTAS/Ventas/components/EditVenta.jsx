import React from "react";
import { useSelector } from 'react-redux'
import {  Button, Row, Col, Card, CardBody } from "reactstrap"
import FormVenta from './FormVenta'
import SearchvArticulos from '../../../INVENTARIOS/Articulos/components/SearchvArticulo'
import ListaVentas from "./ListaVentas";
import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const EditVenta = ({getComponent}) => {
  const { item  } = useSelector(state => state.ventas)  
  const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
  var d = new Date();
  console.log(item.nroItems)

    return (              
      <>
      <Row>        
        <Col md="3" className="btnBack">  
          <Button className="bg-success text-white" onClick={()=> getComponent('data',1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> LISTA VENTAS
          </Button>              
        </Col>  
      </Row> 
      <Row> 
      <Col md="12">
        <Card>
            <CardBody>
             <Row>
               <Col md="2" className="barraz">
               <h5><b>VENTA Nº : </b> {item.id} </h5>
               </Col> 
               <Col md="2" className="barrac">
               <h5><b>Fecha : </b> <Moment format="DD/MM/YYYY">{d}</Moment> </h5>
               </Col> 
               <Col md="2" className="barrac">
               <h5><b>Estado : </b> {item.estado}</h5>
               </Col> 
               <Col md="3" className="barrac">
               <h5><b>Cantidad : </b> {item.nroItems}</h5>
               </Col> 
               <Col md="3" className="barrac">
               <h5><b>Valor Total : </b>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.totalGeneral)}</h5>
               </Col> 
              </Row>  
            </CardBody>   
        </Card>       
      </Col>  
      </Row>
      <Row>
        <Col md="4" className="cardCo">
            <Card>        
              <CardBody>
              <h6>Datos Venta</h6> 
                <FormVenta/> 
              </CardBody>   
            </Card>
        </Col>          
        <Col md="8" className="cardCo">
          <Card>
            <CardBody>
            <h6>Productos</h6> 
              <SearchvArticulos/>
              <ListaVentas/>
            </CardBody>
          </Card>     
        </Col>          
      </Row>                                         
      </>  
                                                   
    );
};
export default EditVenta;
