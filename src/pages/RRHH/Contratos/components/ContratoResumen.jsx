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
             <h6 className="text-center pio"> <b>ID Contrato # <b>{this.props.data.id}</b></b></h6>                         
            </Col>            
          </Row>
      </div>
      <div className="report-body">        
        <Row>
          <Col md={7} className="report-card">
            <Table className="table-reporteh mt-2">
              <tbody>
                  <tr><td width="30%"><b>Nombres :</b></td>
                      <td >{this.props.data.persona.nombres || ''}</td></tr>          
                  
                  <tr><td><b>Apellido Paterno :</b></td>
                  <td>{this.props.data.persona.paterno || ''}</td></tr>          

                  <tr><td><b>Apellido Materno :</b></td>
                  <td>{this.props.data.persona.materno || ''}</td></tr>  

                  <tr><td><b>CI :</b></td>
                  <td>{this.props.data.persona.ci || ''}</td></tr>         

                  <tr><td><b>Cargo :</b></td>
                  <td>{this.props.data.cargo.nombre || ''}</td></tr>

                  <tr><td><b>Fecha Inicio :</b></td>
                  <td><Moment format="DD/MM/YYYY">{this.props.data.fechaInicio}</Moment></td></tr>

                  <tr><td><b>Fecha Fin :</b></td>
                  <td><Moment format="DD/MM/YYYY">{this.props.data.fechaFin}</Moment></td></tr>

                  <tr><td><b>Horario :</b></td>
                  <td>{this.props.data.horario.nombre || ''}</td></tr>
                                    
                  <tr><td><b>Salario :</b></td>
                  <td>{this.props.data.salario.nombre || ''}</td></tr>

                  <tr><td><b>Salario Monto:</b></td>
                  <td>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(this.props.data.salario.monto)}</td></tr>

                  <tr><td><b>Plazo :</b></td>
                  <td>{this.props.data.plazo || ''}</td></tr>

                  <tr><td><b>Estado :</b></td>
                  <td>{this.props.data.contratado ? 'activo': 'desactivado'}</td></tr>
                  
                  <tr><td colSpan="2"><b>Observaciones :</b></td></tr>   
                  <tr><td colSpan="2">{ this.props.data.observaciones }</td></tr>                                      
        </tbody>
        </Table>
          </Col>
          <Col md={5} className="report-card">
            <Row>
              <Col>
                <img alt="contrato" className="text-center imglg" src={api + '/static/images/personas/lg/'+this.props.data.persona.filename }/> 
              </Col>
            </Row>                    
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


function ContratoResumen () {    
const dispatch = useDispatch()
const { item } = useSelector(state => state.contratos)
const usuario = JSON.parse(localStorage.getItem('@userUnity'))
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
        dispatch({type:'CONTRATOS_RESET_ITEM'}) 
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


export default ContratoResumen