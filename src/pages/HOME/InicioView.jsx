import React,{useState, useEffect} from 'react';
import { Row, Col, Button  } from "reactstrap";
import { crudActions } from '../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faMoneyCheck, faBoxOpen, faPeopleCarry, faHeadset, faCashRegister, faChartLine, faSignOutAlt, faCogs, faChartBar } from "@fortawesome/free-solid-svg-icons";  
import { usuarioActions} from "../../actions"
import Moment from 'react-moment';

export default function InicioView({setToken}) {
  const usuario = JSON.parse(localStorage.getItem('@userUnity'))
  const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
  const almacen = JSON.parse(localStorage.getItem('@userAlmacen'))
  const {licencia, estado, message }= useSelector(state => state.empresa)

  const [component, setComponent] = useState();  
  const dispatch = useDispatch()   
  const logoutt = () => {    
    dispatch(usuarioActions.logout())      
  };
  

  const getComponent = () =>{     
  
    switch(usuario.rolId){
      case 1:
        setComponent(
          <>
          <Row>
              <Col md="4" className="colCentral">
                <div className="btnMenus">
                  <Link to="/crm/inicio" className="btnMenu">
                    <FontAwesomeIcon icon={faHeadset} className="btnIa"/>                     
                  </Link>
                  <p>CRM</p> 
                </div>                
              </Col>
              <Col md="4" className="colCentral">
              <div className="btnMenus">
                  <Link to="/compras/inicio" className="btnMenu">
                    <FontAwesomeIcon icon={faPeopleCarry} className="btnIa"/>                     
                  </Link>
                  <p>COMPRAS</p> 
                  </div>  
              </Col>
              <Col md="4" className="colCentral">
              <div className="btnMenus">
                  <Link to="/ventas/inicio" className="btnMenu">
                    <FontAwesomeIcon icon={faMoneyCheck} className="btnIa"/>                     
                  </Link>
                  <p>VENTAS</p> 
              </div>
              </Col>
            </Row>
            <Row>
              <Col md="4" className="colCentral">              
                <div className="btnMenus">
                    <Link to="/inventarios/inicio" className="btnMenu">
                      <FontAwesomeIcon icon={faBoxOpen} className="btnIa"/>                     
                    </Link>
                    <p>INVENTARIOS</p> 
                </div>              
              </Col>
              <Col md="4" className="colCentral">
                <div className="imas">
                  <img src={require("../../assets/img/single.png")}/>
                </div>
              </Col>
              <Col md="4" className="colCentral">
                <div className="btnMenus">
                    <Link to="/tpdv/tpdv" className="btnMenu">
                    <FontAwesomeIcon icon={faCashRegister} className="btnIa"/> 
                    </Link>
                    <p>P.UNTO DE VENTA</p> 
                </div>
              </Col>
            </Row>
            <Row>              
              <Col md="4" className="colCentral">
                <div className="btnMenus">
                    <Link to="/finanzas/inicio" className="btnMenu">
                      <FontAwesomeIcon icon={faChartLine} className="btnIa"/>                     
                    </Link>
                    <p>CONTABILIDAD</p> 
                </div>
              </Col>
              <Col md="4" className="colCentral">
                <div className="btnMenus">
                    <Link to="/consolidado/inicio" className="btnMenu">
                      <FontAwesomeIcon icon={faChartBar} className="btnIa"/>                     
                    </Link>
                    <p>CONSOLIDADO</p> 
                </div>
              </Col>
              <Col md="4" className="colCentral">
                <div className="btnMenus">
                    <Link to="/tools/empresa" className="btnMenu">
                      <FontAwesomeIcon icon={faCogs} className="btnIa"/>                     
                    </Link>
                    <p>CONFIGURACION</p> 
                </div>
              </Col>
            </Row>
          </>
        )
        break;    
      case 2:
        setComponent(
          <>
             <Row>
              <Col md="4" className="colCentral">
                <div className="btnMenus">
                  <Link to="/crm/inicio" className="btnMenu">
                    <FontAwesomeIcon icon={faHeadset} className="btnIa"/>                     
                  </Link>
                  <p>CRM</p> 
                </div>                
              </Col>
              <Col md="4" className="colCentral">
              <div className="btnMenus">
                  <Link to="/compras/inicio" className="btnMenu">
                    <FontAwesomeIcon icon={faPeopleCarry} className="btnIa"/>                     
                  </Link>
                  <p>COMPRAS</p> 
                  </div>  
              </Col>
              <Col md="4" className="colCentral">
              <div className="btnMenus">
                  <Link to="/ventas/inicio" className="btnMenu">
                    <FontAwesomeIcon icon={faMoneyCheck} className="btnIa"/>                     
                  </Link>
                  <p>VENTAS</p> 
              </div>
              </Col>
            </Row>
            <Row>
              <Col md="4" className="colCentral">              
                <div className="btnMenus">
                    <Link to="/inventarios/inicio" className="btnMenu">
                      <FontAwesomeIcon icon={faBoxOpen} className="btnIa"/>                     
                    </Link>
                    <p>INVENTARIOS</p> 
                </div>              
              </Col>
              <Col md="4" className="colCentral">
                <div className="imas">
                  <img src={require("../../assets/img/single.png")}/>
                </div>
              </Col>
              <Col md="4" className="colCentral">
                <div className="btnMenus">
                    <Link to="/tpdv/tpdv" className="btnMenu">
                    <FontAwesomeIcon icon={faCashRegister} className="btnIa"/> 
                    </Link>
                    <p>P.UNTO DE VENTA</p> 
                </div>
              </Col>
            </Row>
            <Row>              
              <Col md="12" className="colCentral"></Col>
            </Row>       
          </>
        )
        break; 
        case 3:
        setComponent(
          <>
          <Row>
              <Col md="4" className="colCentral">
                <div className="btnMenus">
                  <Link to="/crm/inicio" className="btnMenu">
                    <FontAwesomeIcon icon={faHeadset} className="btnIa"/>                     
                  </Link>
                  <p>CRM</p> 
                </div>                
              </Col>
              <Col md="4" className="colCentral">
              <div className="btnMenus">
                    <Link to="/tpdv/tpdv" className="btnMenu">
                    <FontAwesomeIcon icon={faCashRegister} className="btnIa"/> 
                    </Link>
                    <p>P.UNTO DE VENTA</p> 
                </div>
              </Col>
              <Col md="4" className="colCentral">
              <div className="btnMenus">
                  <Link to="/ventas/inicio" className="btnMenu">
                    <FontAwesomeIcon icon={faMoneyCheck} className="btnIa"/>                     
                  </Link>
                  <p>VENTAS</p> 
              </div>
              </Col>
            </Row>
            <Row>
              <Col md="4" className="colCentral">              
                
              </Col>
              <Col md="4" className="colCentral">
                <div className="imas">
                  <img src={require("../../assets/img/single.png")}/>
                </div>
              </Col>
              <Col md="4" className="colCentral">
               
              </Col>
            </Row>
            <Row>              
              <Col md="12" className="colCentral">
               
              </Col>              
            </Row>
          </>
        )
        break; 
        case 4:
        setComponent(
          <>
          <Row>
              <Col md="4" className="colCentral">
                <div className="btnMenus">
                  <Link to="/crm/inicio" className="btnMenu">
                    <FontAwesomeIcon icon={faHeadset} className="btnIa"/>                     
                  </Link>
                  <p>CRM</p> 
                </div>                
              </Col>
              <Col md="4" className="colCentral">
              <div className="btnMenus">
                  <Link to="/compras/inicio" className="btnMenu">
                    <FontAwesomeIcon icon={faPeopleCarry} className="btnIa"/>                     
                  </Link>
                  <p>COMPRAS</p> 
                  </div>  
              </Col>
              <Col md="4" className="colCentral">
              <div className="btnMenus">
                  <Link to="/ventas/inicio" className="btnMenu">
                    <FontAwesomeIcon icon={faMoneyCheck} className="btnIa"/>                     
                  </Link>
                  <p>VENTAS</p> 
              </div>
              </Col>
            </Row>
            <Row>
              <Col md="4" className="colCentral">              
                <div className="btnMenus">
                    <Link to="/inventarios/inicio" className="btnMenu">
                      <FontAwesomeIcon icon={faBoxOpen} className="btnIa"/>                     
                    </Link>
                    <p>INVENTARIOS</p> 
                </div>              
              </Col>
              <Col md="4" className="colCentral">
                <div className="imas">
                  <img src={require("../../assets/img/single.png")}/>
                </div>
              </Col>
              <Col md="4" className="colCentral">
              <div className="btnMenus">
                    <Link to="/finanzas/inicio" className="btnMenu">
                      <FontAwesomeIcon icon={faChartLine} className="btnIa"/>                     
                    </Link>
                    <p>CONTABILIDAD</p> 
                </div>
              </Col>
            </Row>
            <Row>              
              <Col md="12" className="colCentral">                
              </Col>
            </Row>
          </>
        )
        break;  
        case 5:
        setComponent(
          <>
          <Row>
              <Col md="12" className="colCentral">
                
              </Col>
            </Row>
            <Row>
              <Col md="4" className="colCentral">              
                <div className="btnMenus">
                  <Link to="/crm/inicio" className="btnMenu">
                    <FontAwesomeIcon icon={faHeadset} className="btnIa"/>                     
                  </Link>
                  <p>CRM</p> 
                </div>               
              </Col>
              <Col md="4" className="colCentral">
                <div className="imas">
                  <img src={require("../../assets/img/single.png")}/>
                </div>
              </Col>
              <Col md="4" className="colCentral">
              <div className="btnMenus">
                    <Link to="/tpdv/tpdv" className="btnMenu">
                    <FontAwesomeIcon icon={faCashRegister} className="btnIa"/> 
                    </Link>
                    <p>P.UNTO DE VENTA</p> 
                </div>
              </Col>
            </Row>
            <Row>              
              <Col md="12" className="colCentral">                
              </Col>
            </Row>
          </>
        )
        break;         
      default:
        break;
    }
  }


const getLicencia = () =>{
  let ok ={
    "licencia" : empresa.licencia
  }
  dispatch(crudActions.GET_LICENCIA('EMPRESA_LICENCIA',ok))     
}


useEffect(() => {
  getLicencia()  
  getComponent()
  /*setTimeout(() => {
    getComponent()
  }, 4000);*/
  return () => {
    dispatch({type:'LICENCIAS_RESET'})
  };
}, []);  
   
  return(
    <div className="pos">
      <div className="contenedor">
        <div className="contenidoCentral">
          <div className="colTop">        
            <Row>
              <Col md="4" >
                { empresa.nombre }
              </Col>                                          
              <Col md="4">
                Licencia : { licencia.licencia }
              </Col>
              <Col md="2">
                Vencimiento : <Moment format="DD/MM/YYYY" >{ licencia.fechaVencimiento }</Moment> 
              </Col>                           
              <Col md="2">
                <b className={message === 'licencia vigente'? "text-white" : "text-danger"}>{ message }</b>
              </Col>                         
            </Row>
          </div>  
            <div className="contenidoLeft">
            { estado ? component :  null}  
            </div>
            <div className="contenidoRight">
              <Row>
                <Col className="cRimagen">
                <FontAwesomeIcon icon={faUserCircle} className="btnCr"/> 
                </Col>
              </Row>
              <Row>
                <Col className="cRtext">
                 <b>Nombre :</b>
                </Col>
              </Row>  
              <Row>
                <Col className="cRtext">
                { usuario.nombres} 
                </Col>
              </Row>
              <Row>
                <Col className="cRtext">
                <b> Rol:</b>
                </Col>                
              </Row>  
              <Row>
                <Col className="cRtext">
                 { usuario.rol.nombre} 
                </Col>
              </Row>
              <Row>
                <Col className="cRtext">
                <b> Sucursal :</b>
                </Col>
              </Row>  
              <Row>
                <Col className="cRtext">
                 { almacen.nombre} 
                </Col>
              </Row>
              <Row>
                <Col className="cRtext">
                <b> Dirección :</b>
                </Col>
              </Row>  
              <Row>
                <Col className="cRtext">
                 { almacen.ubicacion} 
                </Col>
              </Row>
              <Row>
                <Col className="mt-4">
                  <Button className="btn-sm btn-danger" onClick={() => {logoutt()}} >
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-white"  />
                  </Button> 
                </Col>
              </Row>
            </div>
        </div>              
      </div>
    </div>    
  )
}
