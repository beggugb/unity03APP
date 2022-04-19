import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux'
import {     
  Table,
  Col,  
  Row,    
  Button } from "reactstrap";

import ReactToPrint from "react-to-print";


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
              <h6 className="text-center pio"> <b>Venta # {this.props.dato.id}</b></h6>              
              <h5 className="text-center pio"> Fecha Venta : <Moment format="DD-MM-YYYY">{this.props.dato.fechaVenta}</Moment></h5>             
              <h5 className="text-center pio"> Hora Venta : <Moment format="HH:mm:ss">{this.props.dato.createdAt}</Moment></h5>             
              </Col>            
            </Row>
        </div>
        <div className="report-body">    
          <Row >
          <Col md={12}>
          <h4>Detalle</h4>  
          <Table className="table-reporteh">                      
              <tbody>                  
                <tr>                      
                  <td><b>Nº Items</b></td>
                  <td>{this.props.dato.nroItems}</td>                                          
                  <td><b>Tipo : </b></td>
                  <td>{this.props.dato.tipo}</td>
                </tr>                
                <tr>      
                  <td><b>Vendedor : </b></td>
                  <td>{this.props.dato.usuario.nombres || ''}</td> 
                  <td><b>Total : </b></td>                  
                  <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.dato.totalGeneral)}</td>                                      
                </tr>
                <tr>                        
                  <td><b>Cliente : </b></td>
                  <td>{this.props.dato.cliente.nombres || ''} </td>
                  <td><b>Descuento : </b></td>                  
                  <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.dato.descuento)}</td> 
                </tr>
                <tr>      
                  <td><b>Glosa : </b></td>
                  <td colSpan="3">{ this.props.dato.observaciones }</td>                                       
                </tr>                  
              </tbody>          
            </Table>
            <h4>Items</h4>  
            <Table className="table-reportesh">
            <thead>
              <tr>  
              <th width="15%">Código</th>
                <th width="45%">Nombre</th>                                
                <th width="10%">Precio</th>
                <th width="10%">Cantidad</th>
                <th width="20%">Sub-Total</th>                                          
              </tr>
          </thead>
          {this.props.data && (
              <tbody>
              {this.props.data.map((item, index) => (
                  <tr key={item.articuloId}>                      
                    <td>{item.codigo}</td>
                    <td>{item.nombre}</td>                                                                                                         
                    <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.valor)}</td>                                                   
                    <td className="text-center">{item.cantidad}</td>
                    <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.subTotal)}</td>                 
                  </tr>  
                  ))}
                  <tr>                                                                                                
                    <td colSpan="4" className="text-right"><b>Sub-Total</b></td>
                    <td >{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.dato.subTotal)}</td>
                  </tr> 
                  <tr>                            
                    <td colSpan="4" className="text-right"><b>Impuesto</b></td>                                                                    
                    <td >{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.dato.impuesto)}</td>
                  </tr> 
                  <tr>                      
                    <td colSpan="4" className="text-right"><b>Descuento</b></td>                                                                          
                    <td >{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.dato.descuento)}</td>
                  </tr> 
                  <tr>                       
                    <td colSpan="4" className="text-right"><b>Total</b></td>                                                                         
                    <td ><b>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.dato.totalGeneral)}</b></td>
                  </tr> 

          </tbody>
          )}
            </Table>
          </Col>      
        </Row>        

        <Row>
          <Col md="4" className="mr-2">
          <h4>Nota de venta</h4>  
            <Table className="table-reportesh">
            <tbody>                  
                <tr>                      
                  <td><b>Nº </b></td>
                  <td>{this.props.xnota.id}</td>                                                            
                </tr>  
                <tr>      
                  <td><b>Nº Cuotas : </b></td>
                  <td>{this.props.xnota.cuotas}</td>                                       
                </tr>              
                <tr>      
                  <td><b>Total : </b></td>                  
                  <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.xnota.montoTotal)}</td>                                    
                </tr>
                <tr>      
                  <td><b>Pago Total : </b></td>                  
                  <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.xnota.pagoTotal)}</td>                                    
                                                     
                </tr>
                <tr>      
                  <td><b>Saldo Total : </b></td>
                  <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.xnota.saldoTotal)}</td>                                    
                </tr>                
              </tbody>             
            </Table>  
          </Col>
          <Col md="7">
            <h4>Pagos</h4>  
            <Table className="table-reportesh">
            <thead>
              <tr>                  
                <th width="20%">Cuota</th>
                <th width="30%">Fecha Pago</th>
                <th width="10%">Estado</th>
                <th width="30%">Monto</th>                
                <th width="10%">Fecha Pagado</th>
              </tr>
          </thead>
          {this.props.xplan && (
              <tbody>
                  {this.props.xplan.map((item, index) => (
                      <tr key={item.id}>                      
                        <td>{item.cuota}</td>
                        <td><Moment format="DD/MM/YYYY">{item.fechaPago}</Moment></td>                                                                                         
                        <td>{item.estado ? 'pagado': 'pendiente' }</td>                                                                        
                        <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.monto)}</td>                                           
                        <td><Moment format="DD/MM/YYYY">{item.fechaPagado}</Moment></td> 
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


function VentaResumen () {    
const dispatch = useDispatch()
const { item, items, nota, plan } = useSelector(state => state.ventas)
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
const componentRef = useRef();   


 useEffect(() =>{        
     return () =>{            
        dispatch({type:'VENTAS_RESET_RESUMEN'})         
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
            xnota={nota}
            xplan={plan}
            user={usuario}
        />
    </div>
     )
}


export default VentaResumen