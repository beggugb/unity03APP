import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux'
import {     
  Table,
  Col,  
  Row,    
  Button } from "reactstrap";

import ReactToPrint from "react-to-print";
import { api } from "../../../../helpers";

 export class ComponentToPrint extends React.PureComponent {
  render() {
    const fechaHoy = new Date(); 
    const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
    return (
      <>
        <div className="reporte">     
        <div className="report-header">        
            <Row className="crl">
              <Col md={12}>
              <h6 className="text-center pio"> <b>Promoción # {this.props.dato.id}</b></h6>              
              <h5 className="text-center pio"> {this.props.dato.nombre}</h5>             
              <h5 className="text-center pio"> Fecha Promoción : <Moment format="DD-MM-YYYY">{this.props.dato.fecha}</Moment></h5>             
              <h5 className="text-center pio"> Hora Promoción : <Moment format="HH:mm:ss">{this.props.dato.createdAt}</Moment></h5>             
              <h5 className="text-center pio"> Tipo: {this.props.dato.tipo}</h5> 
              </Col>            
            </Row>
        </div>
        <div className="report-body">    
          <Row >
          <Col md={4}>
          <img alt="articulo" className="text-center imgPr" src={api + '/static/images/articulos/lg/'+this.props.articulo.filename }/> 
          </Col>      
          <Col md={8}>
          <h4>Detalle</h4>  
          <Table className="table-reporteh">                      
            <tbody>                
                <tr><td width="35%"><b>Nombre Corto :</b></td><td >{this.props.articulo.nombreCorto}</td></tr> 
                <tr><td><b>Precio Venta :</b></td>
                <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda}).format(this.props.articulo.precioVenta)}</td>
                </tr> 
                <tr><td colSpan="2"><b>Descripción :</b></td></tr>   
                <tr><td colSpan="2">{ this.props.articulo.descripcion }</td></tr> 
            </tbody> 
            </Table>
          </Col>      
        </Row> 
        <Row >
          <Col md={12}>
            <h4>Clientes</h4>  
            <Table className="table-reportesh">
            <thead>
              <tr>  
              <th width="15%">Id</th>
                <th width="45%">Nombres</th>                                
                <th width="20%">Email</th>
                <th width="20%">Teléfono</th>                
              </tr>
          </thead>
          {this.props.data && (
              <tbody>
              {this.props.data.map((item, index) => (
                  <tr key={index}>                      
                    <td>{item.cliente.id || ''}</td>
                    <td>{item.cliente.nombres}</td>
                    <td>{item.cliente.email}</td>
                    <td>{item.cliente.telefono}</td>                                        
                  </tr>  
                  ))}
          </tbody>
          )}
            </Table>
          </Col>      
        </Row>       
        </div>    
        <div className="report-footer">        
          <Row>
            <Col md="6">           
              <p>Usuario: {this.props.user.nombres}</p>
            </Col>
            <Col md="6">           
              <p>Fecha/Hora emisión: <Moment format="DD/MM/YYYY HH:mm:ss">{fechaHoy}</Moment></p>
            </Col>
          </Row>          
        </div>
      </div>  
     </> 
    );
  }
}


function ProspectoResumen () {    
const dispatch = useDispatch()
const { item, items } = useSelector(state => state.prospectos)
const itt = useSelector(state => state.articulos.item)
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
const componentRef = useRef();   


 useEffect(() =>{        
     return () =>{            
        dispatch({type:'PROSPECTOS_RESET_ITEMS'}) 
        dispatch({type:'PROSPECTOS_RESET_ITEM'}) 
    };
  }, []);
return(
    <div className="creporte">
        <ReactToPrint
            trigger={() => <Button className="fas fa-print btn-sm btn-info">Imprimir</Button>}
            content={() => componentRef.current}        
        />
        <ComponentToPrint
            ref={componentRef}                      
            dato={item}
            data={items}            
            user={usuario}
            articulo={itt}
        />
    </div>
     )
}


export default ProspectoResumen