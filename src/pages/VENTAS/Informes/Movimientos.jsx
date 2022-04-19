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
              <h6 className="text-center pio"> <b>INFORME DE VENTAS </b></h6>                            
              <h5 className="text-center pio"> Desde: <Moment format="DD/MM/YYYY">{this.props.pvalue1}</Moment> -  Hasta : <Moment format="DD/MM/YYYY">{this.props.pvalue2}</Moment></h5>             
              <h5 className="text-center pio"> Estado : {this.props.pestado}</h5>              
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
                <th width="15%" className="text-dark">Cliente</th>
                <th width="25%" className="text-dark">Glosa</th>
                <th width="10%" className="text-dark">F.Movimiento</th>                                                                                               
                <th width="15%" className="text-dark text-center">Total</th>                    
                <th width="15%" className="text-dark text-center">Pago</th> 
                <th width="15%" className="text-dark text-center">Saldo</th>                 
              </tr>
          </thead>
          {this.props.pdata && (
            <tbody>
                {this.props.pdata.map((item) => (
                  <tr key={item.id}>  
                    <td>{item.id}</td>
                    <td>{item.cliente}</td> 
                    <td>{item.observaciones}</td>                                                  
                    <td><Moment format="DD-MM-YYYY">{item.fechaCompra}</Moment></td>                                                  
                    <td className="text-center">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.total)}</td>                 
                    <td className="text-center">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.pago)}</td>                 
                    <td className="text-center">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.saldo)}</td>                 
                    </tr>  
                ))}
                  <tr>
                    <td className="centro" colSpan="4">TOTAL</td>                    
                    <td className="centro">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.psuma)}</td>                 
                    <td className="centro">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.ppago)}</td>                 
                    <td className="centro">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.psaldo)}</td>                 
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


function Movimientos ({value1, value2,estado}) {    
  const componentRef = useRef();   
  const { ventas,montoTotal,pagoTotal,saldoTotal,total } = useSelector(state => state.informes)    
  const user = JSON.parse(localStorage.getItem('@userUnity'))
  const dispatch = useDispatch()
  useEffect(() =>{      
    return () =>{             
      /*dispatch(crudActions.setReset('INFORMES_RESET'))               */
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
            pdata={ventas}   
            ptotal={total}                     
            psuma={montoTotal}
            psaldo={saldoTotal}
            ppago={pagoTotal}
            pvalue1={value1}
            pvalue2={value2}
            pestado={estado}            
        />
    </div>
     )
}


export default Movimientos