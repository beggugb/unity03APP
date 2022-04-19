import React,{useState, useEffect} from 'react';
import { Row, Col, Button  } from "reactstrap";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheck, faBoxOpen, faPeopleCarry, faHeadset, faCashRegister, faChartLine, faSignOutAlt, faUser, faUsers, faCogs } from "@fortawesome/free-solid-svg-icons";  
import { usuarioActions} from "../../actions"

export default function InicioView({setToken}) {
  const usuario = JSON.parse(localStorage.getItem('@userUnity'))
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
           <Row className="btnMenus"> 
              <Col>
              <FontAwesomeIcon icon={faHeadset} className="btnIa"/>
              <Link to="/crm/inicio" className="btnMenu">CRM</Link></Col>
            </Row>
            <Row className="btnMenus">
              <Col>
              <FontAwesomeIcon icon={faPeopleCarry} className="btnIa"/>
              <Link to="/compras/inicio" className="btnMenu">COMPRAS</Link></Col>
            </Row>
            <Row className="btnMenus">
              <Col>
              <FontAwesomeIcon icon={faMoneyCheck} className="btnIa"/>
              <Link to="/ventas/inicio" className="btnMenu">VENTAS</Link></Col>
            </Row>
            <Row className="btnMenus">
              <Col>
              <FontAwesomeIcon icon={faBoxOpen} className="btnIa"/>
              <Link to="/inventarios/inicio" className="btnMenu">INVENTARIOS</Link></Col>
            </Row>
            <Row className="btnMenus">
              <Col>
              <FontAwesomeIcon icon={faChartLine} className="btnIa"/>
              <Link to="/finanzas/inicio" className="btnMenu">CONTABILIDAD</Link></Col>
            </Row>
            <Row className="btnMenus">
              <Col>
              <FontAwesomeIcon icon={faCashRegister} className="btnIa"/>
              <Link to="/tpdv/tpdv" className="btnMenu">TPDV</Link></Col>
            </Row>            
            <Row className="btnMenus">
              <Col>
              <FontAwesomeIcon icon={faCogs} className="btnIa"/>
              <Link to="/tools/empresa" className="btnMenu">CONFIGURACION</Link></Col>
            </Row> 
          </>
        )
        break;    
      case 2:
        setComponent(
          <>
           <Row className="btnMenus"> 
              <Col>
              <FontAwesomeIcon icon={faHeadset} className="btnIa"/>
              <Link to="/crm/inicio" className="btnMenu">CRM</Link></Col>
            </Row>
            <Row className="btnMenus">
              <Col>
              <FontAwesomeIcon icon={faPeopleCarry} className="btnIa"/>
              <Link to="/erp/inicio" className="btnMenu">ERP</Link></Col>
            </Row>                         
            <Row className="btnMenus">
              <Col>
              <FontAwesomeIcon icon={faUsers} className="btnIa"/>
              <Link to="/rrhh/inicio" className="btnMenu">RRHH</Link></Col>
            </Row>             
          </>
        )
        break;
      case 3:
        setComponent(
          <>           
            <Row className="btnMenus">
              <Col>
              <FontAwesomeIcon icon={faCashRegister} className="btnIa"/>
              <Link to="/tpdv/tpdv" className="btnMenu">TPDV</Link></Col>
            </Row>              
          </>
        )
        break;
      case 4:
        setComponent(
        <>
            <Row className="btnMenus">
              <Col>
              <FontAwesomeIcon icon={faChartLine} className="btnIa"/>
              <Link to="/finanzas/inicio" className="btnMenu">CONTABILIDAD</Link></Col>
            </Row>          
          </>)
        break;
      case 5:
        setComponent(
          <>
           <Row className="btnMenus"> 
              <Col>
              <FontAwesomeIcon icon={faHeadset} className="btnIa"/>
              <Link to="/crm/inicio" className="btnMenu">CRM</Link></Col>
            </Row>           
          </>
        )
        break;        
      default:
        break;
    }
}

useEffect(() => {
  getComponent()
  return () => {
    console.log('descarga proveedores')
  };
}, []);

  
   
  return(
    <div className="pos">
      <div className="contenedor">
        <div className="contenidoLeft">
          <div className="imas">
            <img src={require("../../assets/img/login.png")}/>
          </div>  
        </div>   
        <div className="contenidoRight">  
            <Row className="btnMenus">              
                <Col md={2}> 
                  <div className="circulu">
                      <FontAwesomeIcon icon={faUser} />  
                  </div></Col>
                <Col md={7} className="mt-1 text-white">                    
                  <p>Usuario: {usuario.nombres}</p>
                </Col>                                         
                <Col md={2} className="text-right"> 
                  <Button className="btn-barra" onClick={() => {logoutt()}} >
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-white"  />
                </Button>                            
                </Col>   
            </Row>         
            <h6>SISTEMAS HABILITADOS</h6>
            {component}           
        </div>      
      </div>
    </div>    
  )
}
