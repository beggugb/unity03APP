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
  const almacen = JSON.parse(localStorage.getItem('@userAlmacen'))
  var d = new Date();

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
      <Col md="3" className="cardCo">
            <Card>        
              <CardBody>
               <h6>Datos Venta</h6> 
               <p><b>VENTA Nº : </b> {item.id} </p>
               <p><b>Almacen origen : </b> {almacen.nombre} </p>
               <p><b>Fecha : </b> <Moment format="DD/MM/YYYY">{d}</Moment> </p>                             
               <p><b>Cantidad : </b> {item.nroItems}</p>               
               <p><b>Valor Total : </b>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.totalGeneral)}</p>
              <FormVenta/> 
              </CardBody>   
            </Card>
        </Col>          
        <Col md="9" className="cardCo">
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
