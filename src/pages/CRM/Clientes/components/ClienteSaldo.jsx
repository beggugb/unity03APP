import React, { useRef, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table,Col,Row,Button } from "reactstrap";
import ReactToPrint from "react-to-print";
import Moment from 'react-moment'


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
             <h6 className="text-center pio"> <b>Estado de Cuenta # <b>{this.props.aitem.id}</b></b></h6>
             <h5 className="text-center pio"> {this.props.aitem.nombres}</h5>
             <h5 className="text-center pio"> NIT : {this.props.aitem.nit}</h5>                          
            </Col>            
          </Row>
          <Row>
          <Col md={12} className="report-header mt-2">                       
            <Table className="table-reporteshs">            
            <tbody>
              <tr>                                              
                <td width="20%"><b>Ventas Total :</b></td>
                <td width="80%">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.atotal)}</td>                                             
              </tr>
              <tr>              
                <td width="20%"><b>Pagos Total :</b></td>
                <td width="80%">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.apago)}</td>                                             
              </tr>

              <tr>
                <td width="20%"><b>Saldo Total :</b></td>
                <td width="80%">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.asaldo)}</td>                                             
              </tr>      
              </tbody>           
            </Table>                
          </Col>      
        </Row>
      </div>
      <div className="report-body">        
        <Row>
          <Col md={12} className="report-card">          
            <h4>Ventas</h4>  
            <Table className="table-reporteshs">
            <thead>
              <tr>                  
                <th width="10%">Fecha</th>
                <th width="35%">Detalle</th>
                <th width="10%">Tipo</th>
                <th width="15%">Total</th>
                <th width="15%">Pago</th>                
                <th width="15%">Saldo</th>                
              </tr>
          </thead>
          {this.props.aitems && (
              <tbody>
                  {this.props.aitems.map((item, index) => (
                      <tr key={index}>                                              
                        <td><Moment format="DD/MM/YYYY">{item.fechaVenta}</Moment></td>                                                                 
                        <td>{ item.observaciones }</td>
                        <td>{ item.tipo }</td>
                        <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.ventaTotal)}</td>                                             
                        <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.pagoTotal)}</td>
                        <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.saldoTotal)}</td>
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
            <Col md="5">           
              <p>Usuario: {this.props.user.nombres}</p>
            </Col>
            <Col md="7">           
              <p>Fecha y hora de emisión: {'  '}
              <Moment format="DD/MM/YYYY">{fechaHoy}</Moment> {'  '}
              <Moment format="HH:mm:ss">{fechaHoy}</Moment></p>
            </Col>            
          </Row>  
                  
      </div>
    </div>  
    </> 
    );
  }
}


function ClienteSaldo () {    
const dispatch = useDispatch()
const { items, montoTotal, saldoTotal, pagoTotal, item } = useSelector(state => state.clientes)
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
        dispatch({type:'CLIENTES_RESET_SALDO'}) 
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
            aitem={item}
            aitems={items}
            atotal={montoTotal}
            apago={pagoTotal}
            asaldo={saldoTotal}
            user={usuario}
        />
    </div>
     )
}


export default ClienteSaldo