import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux'
import { Table,Col,Row,Button } from "reactstrap";
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
              <h6 className="text-center pio"> <b>Movimiento # {this.props.dato.id}</b></h6>                                          
              <h5 className="text-center pio"> Fecha : {this.props.dato.fecha}</h5>             
              </Col>            
            </Row>
        </div>
        <div className="report-body">  
        <Row >
          <Col md={12}>
          <h4>Detalle</h4>    
            <Table className="table-reporteh mt-2">                      
              <tbody>                  
                <tr>                      
                  <td><b>Nº Items</b></td>
                  <td>{this.props.dato.nroItems}</td>                                                            
                  <td><b>Usuario : </b></td>
                  <td>{this.props.dato.usuario.nombres || ''} </td>
                </tr>   
                <tr>                      
                  <td><b>Almacen origen</b></td>
                  <td>{this.props.dato.origen || ''}</td>                                                            
                  <td><b>Almacen destino : </b></td>
                  <td>{this.props.dato.destino || ''} </td>
                </tr>              
                <tr>      
                  <td><b>Total : </b></td>
                  <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.dato.totalGeneral)}</td>                     
                  <td><b>Tipo : </b></td>
                  <td> {this.props.dato.tipo || '' }</td>
                </tr>
                <tr>      
                  <td><b>Motivo : </b></td>
                  <td colSpan="3">{ this.props.dato.motivo }</td>                                       
                </tr>                  
              </tbody>          
            </Table>
            <Table className="table-reportesh mt-2">
            <thead>
              <tr>  
                <th width="20%">Código</th>
                <th width="50%">Nombre</th>                                
                <th width="10%">Costo</th>
                <th width="10%">Cantidad</th>                
                <th width="10%">Total</th>                                             
              </tr>
          </thead>
          {this.props.data && (
              <tbody>
                  {this.props.data.map((item, index) => (
                      <tr key={index}>                      
                        <td>{item.codigo}</td>
                        <td>{item.nombre}</td>                                                                                                                                      
                        <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.valor)}</td>                     
                        <td>{item.cantidad} ({item.unidad})</td>
                        <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.cantidad * item.valor)}</td>
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
              <p>Fecha Emisión: <Moment format="DD/MM/YYYY">{fechaHoy}</Moment></p>
            </Col>
          </Row>          
        </div>
      </div>  
      
    </> 
    );
  }
}


function MovimientoResumen () {    
const dispatch = useDispatch()
const { item, items } = useSelector(state => state.movimientos)
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
        dispatch({type:'COMPRAS_RESET_RESUMEN'})         
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
        />
    </div>
     )
}


export default MovimientoResumen