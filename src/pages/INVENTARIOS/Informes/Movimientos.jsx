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
              <h6 className="text-center pio"> <b>INFORME DE MOVIMIENTOS  </b></h6>              
              <h5 className="text-center pio"> Tipo : {this.props.ptipo}</h5>
              <h5 className="text-center pio"> Desde: <Moment format="DD/MM/YYYY">{this.props.pvalue1}</Moment> -  Hasta : <Moment format="DD/MM/YYYY">{this.props.pvalue2}</Moment></h5>                                      
              <h5 className="text-center pio"> Nro. Movimientos: { this.props.ptotal}</h5>                                      
              </Col>            
            </Row>  
        </div>
        <div className="report-body">  
        <Row >
          <Col md={12}>         
            <Table className="table-reportesh mt-2">
            <thead>
              <tr>  
                <th width="5%" className="text-dark">Nº</th>
                <th width="10%" className="text-dark">Fecha</th>
                <th width="30%" className="text-dark">Motivo</th>                                    
                <th width="10%" className="text-dark">Origen</th>
                <th width="10%" className="text-dark">Destino</th>                                                                                                               
                <th width="10%" className="text-dark">Nro. Items</th>                                 
                <th width="15%" className="text-dark">Total</th>
              </tr>
          </thead>
          {this.props.pdata && (
            <tbody>
                {this.props.pdata.map((item) => (
                  <tr key={item.id}>  
                    <td>{item.id}</td> 
                    <td><Moment format="DD-MM-YYYY">{item.fecha}</Moment></td>                                                       
                    <td>{item.observaciones || ''}</td>                                                                              
                    <td>{item.origen}</td>
                    <td>{item.destino}</td>
                    <td>{item.nroItems}</td>                    
                    <td>                    
                    {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.totalGeneral)}
                    </td> 
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


function Movimientos ({tipo, value1, value2}) {    
  const componentRef = useRef();   
  const { cantidadTotal,  movimientos } = useSelector(state => state.informes)  
  const user = JSON.parse(localStorage.getItem('@userUnity'))
  const dispatch = useDispatch()
  useEffect(() =>{      
    return () =>{                   
      dispatch({type:'INFORMES_RESET'}) 

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
            ptipo={tipo}
            puser={user}            
            pdata={movimientos}                        
            ptotal={cantidadTotal}            
            pvalue1={value1}
            pvalue2={value2}            
        />
    </div>
     )
}


export default Movimientos