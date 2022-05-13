import React, { useRef, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api } from "../../../../helpers";
import { Table,Col,Row,Button } from "reactstrap";
import ReactToPrint from "react-to-print";
import Moment from 'react-moment'
import QRCode from "qrcode.react";
import GoogleMapReact from 'google-map-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const fechaHoy = new Date()
const LocationPin = ({ text }) => (
  <>      
  <FontAwesomeIcon icon={faMapMarkerAlt} className="pini"/>
  
  </>
  
)

export class ComponentToPrint extends React.PureComponent {     
  render() {    
    console.log(this.props.data.latitude)
    console.log(this.props.data.longitude)
    return (
      <>
    <div className="reporte">     
      <div className="report-header">        
          <Row className="crl">
            <Col md={12}>
             <h6 className="text-center pio"> <b>Kardex Cliente # <b>{this.props.data.id}</b></b></h6>
             <h5 className="text-center pio"> {this.props.data.nombres}</h5>
             <h5 className="text-center pio"> NIT : {this.props.data.nit}</h5>             
            </Col>            
          </Row>
      </div>
      <div className="report-body mt-2">        
        <Row>
          <Col md={7} className="report-card">
            <Table className="table-reporteh mt-2">
              <tbody>
                  <tr><td width="25%"><b>Tipo Fiscal :</b></td>
                      <td >{this.props.data.tipo}</td></tr>          
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
        
        <Col md={5} className="report-card">
          <Row>
            <Col className="report-imagen">
                <img alt="cliente" className="text-center reportimg" src={api + '/static/images/clientes/lg/'+this.props.data.filename }/> 
            </Col>
          </Row>
          <Row>
            <Col className="text-center report-qr">
                <QRCode value={'http://localhost:3000/clientes'+this.props.data.codigo} style={{  backgroundColor:'#fff', padding:5, border: 'solid 1px #eaeaea', marginRight: 5 }}/>
            </Col>
          </Row>                    
        </Col>
        </Row>

        <Row>
          <Col>
          <div style={{ height: '300px', width: '100%' }}>
            { (this.props.data.latitude && this.props.data.latitude !== 0) && (this.props.data.longitude && this.props.data.longitude !== 0) ?       
              <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyAF83DBU51q3idSspsd7f4DtTk7vNwHpR8',
              libraries:['places', 'geometry', 'drawing', 'visualization']
             }}
              defaultCenter={{        
                lat: parseFloat(this.props.data.latitude),
                lng: parseFloat(this.props.data.longitude)
                }}
              defaultZoom={17}>
                <LocationPin           
                lat={parseFloat(this.props.data.latitude)}
                lng={parseFloat(this.props.data.longitude)}
                text={this.props.data.direccion}
                />
          
              </GoogleMapReact>
            : null }        
          </div>      
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


function ClienteResumen () {    
const dispatch = useDispatch()
const { item } = useSelector(state => state.clientes)
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
      dispatch({type:'CLIENTES_RESET_ITEM'})
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
            user={usuario}
        />
    </div>
     )
}


export default ClienteResumen