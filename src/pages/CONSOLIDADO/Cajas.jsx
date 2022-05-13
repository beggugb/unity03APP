import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { Table, Button, Col, Row  } from "reactstrap";
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
              <h6 className="text-center pio"> <b>INFORME DE CAJAS</b></h6>              
              <h5 className="text-center pio"> Usuario: {this.props.pusuario || 'Todos'}</h5>
              </Col>            
            </Row>
        </div>
        <div className="report-body">                
            <Table className="table-reportesh mt-2">
            <thead>
              <tr>  
                  <th width="15%" className="text-dark">Usuario</th>                  
                  <th width="10%" className="text-dark">Fecha Caja</th> 
                  <th width="10%" className="text-dark">Fecha Cierre</th>
                  <th width="5%" className="text-dark">Estado</th>                 
                  <th width="15%" className="text-dark">Monto Inicial</th>
                  <th width="15%" className="text-dark">Monto Ingreso</th>                  
                  <th width="15%" className="text-dark">Monto Egreso</th>
                  <th width="15%" className="text-dark">Monto Total</th>                  
              </tr>
          </thead>

          {this.props.pdata && (
            <tbody>
                {this.props.pdata.map((item,index) => (
                  <tr key={index}>  
                    <td>{item.usuario || ''}</td>                    
                    <td><Moment format="DD/MM/YYYY">{item.fechaCaja}</Moment></td>                    
                    <td><Moment format="DD/MM/YYYY">{item.fechaCierre}</Moment></td>
                    <td>{item.estado ? 'cerrado' : 'abierto'}</td>
                    <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.montoInicial)}</td>                    
                    <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.montoIngreso)}</td>                    
                    <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.montoEgreso)}</td>                    
                    <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.montoFinal)}</td>                                        
                    </tr>  
                    ))}
                  <tr>
                    <td className="centro" colSpan="5">TOTAL</td>                    
                    <td className="centro">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.pingreso)}</td>
                    <td className="centro">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.pegreso)}</td>
                    <td className="centro">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.psuma)}</td>                    

                  </tr>  
            </tbody>
        )}
         
        </Table>

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
  }}


function Cajas ({usuarios}) {    
  const componentRef = useRef();   
  const { cajas, total, montoTotal, montoIngreso, montoEgreso } = useSelector(state => state.informes)    
  const { item  } = useSelector(state => state.users) 
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
            user={user}                        
            pdata={cajas}
            ptotal={total}
            psuma={montoTotal}
            pegreso={montoEgreso}
            pingreso={montoIngreso}
            pusuario={item.nombres}

        />
    </div>
     )
}


export default Cajas