import React, { useRef, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table,Col,Row,Button } from "reactstrap";
import ReactToPrint from "react-to-print";
import Moment from 'react-moment'

const fechaHoy = new Date()
 export class ComponentToPrint extends React.PureComponent {
   
  render() {    
    return (
      <>
    <div className="reporte">     
      <div className="report-header">        
          <Row className="crl">
            <Col md={12}>
             <h6 className="text-center pio"> <b>Ticket # <b>{this.props.pitem.id}</b></b></h6>
             <h5 className="text-center pio"> {this.props.pitem.tipo}</h5>
             <h5 className="text-center pio"> FECHA : {this.props.pitem.fechaRegistro}</h5>             
            </Col>            
          </Row>
      </div>
      <div className="report-body">        
        <Row>
          <Col md={12} className="report-card">
            <Table className="table-reporteh mt-2">
              <tbody>
                  <tr><td width="25%"><b>Cliente :</b></td>
                      <td >{this.props.pitem.clients}</td></tr>          
                  <tr><td><b>Estado :</b></td>
                      <td >{this.props.pitem.estado}</td>
                  </tr> 
                  <tr><td><b>Usuario :</b></td>
                      <td >{this.props.pitem.usuario.nombres}</td>
                  </tr>         
                  <tr><td colSpan="2"><b>Detalle :</b></td></tr>   
                  <tr><td colSpan="2">{ this.props.pitem.detalle }</td></tr>                                      
              </tbody>
            </Table>
          </Col>  
        </Row>  
       
        <Row>  
          <Col>
        <Table className="table-reportesh mt-2">
            <thead>
              <tr>  
                <th width="5%">Id</th>
                <th width="10%">Fecha</th>                                
                <th width="85%">Descripción</th>                
              </tr>
          </thead>
          {this.props.data && (
              <tbody>
                  {this.props.data.map((item, index) => (
                      <tr key={item.id}>                      
                        <td>{index+1}</td>
                        <td>{item.fecha}</td>                                                                                                                                                              
                        <td>{item.descripcion}</td>
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


function TicketResumen () {    
const dispatch = useDispatch()
const { item, items } = useSelector(state => state.tickets)
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
        dispatch({type:'TICKETS_RESET_ITEM'}) 
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
            pitem={item}
            data={items}
            user={usuario}            
        />
    </div>
     )
}


export default TicketResumen