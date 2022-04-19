import React, { useRef, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api } from "../../../../helpers";
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
             <h6 className="text-center pio"> <b>Kardex Persona # <b>{this.props.data.id}</b></b></h6>
             <h5 className="text-center pio"> {this.props.data.nombres}</h5>
                     
            </Col>            
          </Row>
      </div>
      <div className="report-body">        
        <Row>
          <Col md={8} className="report-card">
            <Table className="table-reporteh mt-2">
              <tbody>
                   
                  <tr><td><b>Dirección :</b></td>
                      <td>{this.props.data.direccion}</td></tr>          

                  <tr><td><b>Pais :</b></td>
                      <td >{this.props.data.pais}</td>
                  </tr>          

                  <tr><td><b>Ciudad :</b></td>
                      <td >{this.props.data.ciudad}</td>
                  </tr>          

                  <tr><td><b>Contacto :</b></td>
                      <td >{this.props.data.contacto}</td>
                  </tr>

                  <tr><td><b>Email :</b></td>
                      <td >{this.props.data.email}</td>
                  </tr>

                  <tr><td><b>Web :</b></td>
                      <td >{this.props.data.web}</td>
                  </tr>

                  <tr><td><b>Teléfono :</b></td>
                      <td >{this.props.data.telefono}</td>
                  </tr>          
                  <tr><td colSpan="2"><b>Observaciones :</b></td></tr>   
                  <tr><td colSpan="2">{ this.props.data.observaciones }</td></tr>                    
                 
        </tbody>
        </Table>
          </Col>
          <Col md={4} className="report-card text-center">            
            <img alt="persona" className="text-center imgmd" src={api + '/static/images/personas/lg/'+this.props.data.filename }/>                 
          </Col>
        </Row>
        <h6 className="mt-2">Información Académica</h6>
        <Row>
          <Col>
          <Table className="table-reportesh mt-2">
          <thead>
              <tr>  
                  <th width="10%">Fecha</th>
                  <th width="30%">Profesión</th>
                  <th width="20%">Nivel</th>                             
                  <th width="10%">Estado</th>
                  <th width="40%">Institución</th>                  
              </tr>
          </thead>
          {this.props.destudios && (
              <tbody>
                  {this.props.destudios.map((item) => (
                      <tr key={item.id}>                      
                        <td>{item.fecha}</td>
                        <td>{item.carrera}</td>
                        <td>{item.nivel}</td>
                        <td>{item.estado}</td>
                        <td>{item.institucion}</td>                     
                      </tr>  
                      ))}
              </tbody>
          )}
          </Table>
          </Col>
        </Row>  
        <h6>Experiencia Laboral</h6>
        <Row>
          <Col>
          <Table className="table-reportesh mt-2">
          <thead>
              <tr>  
                  <th width="10%">Desde</th>
                  <th width="10%">Hasta</th>
                  <th width="25%">Empresa</th>
                  <th width="25%">Cargo</th>
                  <th width="15%">Pais</th>                             
                  <th width="15%">Ciudad</th>                                                      
              </tr>
          </thead>
          {this.props.dexperiencias && (
              <tbody>
                  {this.props.dexperiencias.map((item) => (
                      <tr key={item.id}>                      
                        <td>{item.desde}</td>
                        <td>{item.hasta}</td>
                        <td>{item.empresa}</td>
                        <td>{item.motivo}</td>
                        <td>{item.pais}</td>
                        <td>{item.ciudad}</td>                                                                 
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


function PersonaResumen () {    
const dispatch = useDispatch()
const { item } = useSelector(state => state.personas)
const estudios = useSelector(state => state.estudios.data)
const experiencias = useSelector(state => state.experiencias.data)
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
        dispatch({type:'PERSONAS_RESET_ITEM'}) 
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
            data={item}
            dexperiencias={experiencias}
            destudios={estudios}
            user={usuario}
        />
    </div>
     )
}


export default PersonaResumen