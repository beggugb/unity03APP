import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import {     
  Table, Row, Col,   
  Button } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'


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
              <h6 className="text-center pio"> <b>INFORME DE PAGOS </b></h6>                            
              <h5 className="text-center pio"> Desde: <Moment format="DD/MM/YYYY">{this.props.pvalue1}</Moment> -  Hasta : <Moment format="DD/MM/YYYY">{this.props.pvalue2}</Moment></h5>             
              <h5 className="text-center pio"> Estado : {this.props.pestado ? "Pagados":"Pendientes"}</h5>              
              </Col>            
            </Row>  
        </div>
        <div className="report-body mb-2">  
        <Row >
          <Col md={12}>          
            <Table className="table-reportesh mt-2">
            <thead>
              <tr>  
                <th width="5%" className="text-dark">Nº</th>                
                <th width="25%" className="text-dark">Proveedor</th>
                <th width="30%" className="text-dark">Glosa</th>
                <th width="10%" className="text-dark">Fecha Pago</th>
                <th width="10%" className="text-dark">Fecha Pagado</th>
                <th width="10%" className="text-dark text-center">Cuota</th>
                <th width="10%" className="text-dark text-center">Monto</th>                                    
              </tr>
          </thead>
          {this.props.pdata && (
            <tbody>
                {this.props.pdata.map((item) => (
                  <tr key={item.id}>  
                    <td>{item.id}</td>
                    <td>{item.proveedor}</td>                     
                    <td>{item.observaciones}</td>
                    <td><Moment format="DD-MM-YYYY">{item.fechaPago}</Moment></td>                              
                    <td>{item.fechaPagado === 'sin pago' ? item.fechaPagado: <Moment format="DD-MM-YYYY">{item.fechaPagado}</Moment>} </td>
                    <td className="text-center">{item.cuota}</td>                              
                    <td className="text-center">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.monto)}</td>                    
                    </tr>  
                ))}
                  <tr>
                    <td className="centro" colSpan="6">TOTAL</td>                    
                    <td className="centro">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.psuma)}</td>                    
                  </tr>
            </tbody>
          )}
          </Table>
            </Col>      
        </Row>   
        </div>    
        <div className="report-footer">        
          <Row>
            <Col md="6">           
              <p>Usuario: {this.props.puser.nombres}</p>
            </Col>
            <Col md="6">           
              <p>Fecha Emisión: <Moment format="DD/MM/YYYY">{fechaHoy}</Moment></p>
            </Col>
          </Row>          
        </div>
      </div>   
    </> 
    );
  }}


function Pagos ({value1, value2, estado}) {    
  const componentRef = useRef();   
  const { montoTotal, total, pagos } = useSelector(state => state.informes)  
  const user = JSON.parse(localStorage.getItem('@userUnity'))
  const dispatch = useDispatch()
  useEffect(() =>{      
    return () =>{             
      dispatch({type:'INFORMES_RESET'})     
      
    };
  }, []);

return(
    <div className="creporte mt-2 ml-2 mr-2">
        <ReactToPrint
            trigger={() => <Button className="fas fa-print btn-sm btn-info">Imprimir</Button>}
            content={() => componentRef.current}        
        />
        <ComponentToPrint
            ref={componentRef}                      
            puser={user}            
            pdata={pagos}  
            pestado={estado} 
            ptotal={total}                     
            psuma={montoTotal}
            pvalue1={value1}
            pvalue2={value2}            
            
        />
    </div>
     )
}


export default Pagos