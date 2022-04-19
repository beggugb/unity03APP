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
    return (
      <>
   <div className="reporte">     
        <div className="report-header">        
            <Row className="crl">
              <Col md={12}>
              <h6 className="text-center pio"> <b>INFORME DE PROSPECTOS </b></h6>                            
              <h5 className="text-center pio"> Desde: <Moment format="DD/MM/YYYY">{this.props.pvalue1}</Moment> -  Hasta : <Moment format="DD/MM/YYYY">{this.props.pvalue2}</Moment></h5>                           
              <h5 className="text-center pio"> Nº Items : { this.props.ptotal }</h5>     
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
                <th width="10%" className="text-dark">Fecha</th>
                <th width="15%" className="text-dark">Nombre</th>
                <th width="35%" className="text-dark">Detalle</th>
                <th width="10%" className="text-dark">Tipo</th>                
                <th width="25%" className="text-dark">Producto</th>                
                
              </tr>
          </thead>
          {this.props.pdata && (
            <tbody>
                {this.props.pdata.map((item,index) => (
                  <tr key={item.id}>  
                    <td>{index+1}</td>
                    <td><Moment format="DD-MM-YYYY">{item.fecha}</Moment></td>                                                  
                    <td>{item.nombre}</td> 
                    <td>{item.observaciones}</td> 
                    <td>{item.tipo}</td>
                    <td>{item.articulo}</td>                                                                      
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


function Cotizaciones ({value1, value2}) {    
  const componentRef = useRef();   
  const { prospectos ,total } = useSelector(state => state.informes)    
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
            pdata={prospectos}   
            ptotal={total}                                 
            pvalue1={value1}
            pvalue2={value2}            
        />
    </div>
     )
}


export default Cotizaciones