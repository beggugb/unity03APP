import React,{ useEffect, useState } from "react";
import { css } from "@emotion/react";
import { Route, Switch, NavLink } from "react-router-dom";
import { Row, Col, Button, Nav, Modal, ModalBody } from "reactstrap";
import {  useSelector, useDispatch } from "react-redux";
import { usuarioActions} from "../../actions"
import MoonLoader from "react-spinners/MoonLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faBell, faEnvelope,faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import InicioView from "../../pages/CONSOLIDADO/InicioView.jsx"
import ComprasView from "../../pages/CONSOLIDADO/ComprasView.jsx"
import ClientesView from "../../pages/CONSOLIDADO/ClientesView.jsx"
import TicketsView from "../../pages/CONSOLIDADO/TicketsView.jsx"
import CajasView from "../../pages/CONSOLIDADO/CajasView";
import CotizacionesView from "../../pages/CONSOLIDADO/CotizacionesView.jsx"
import PagosView from "../../pages/CONSOLIDADO/PagosView.jsx"
import VentasView from "../../pages/CONSOLIDADO/VentasView.jsx"
import CobrosView from "../../pages/CONSOLIDADO/CobrosView.jsx"
import ExistenciasView from "../../pages/CONSOLIDADO/ExistenciasView.jsx"
import Moment from "react-moment";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const fechaHoy = new Date()
function Crm(){
  const dispatch = useDispatch() 
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))     
    const { loading }= useSelector(state => state.usuarios)  

  
    const logoutt = () => {    
      dispatch(usuarioActions.logout())  
    };

    useEffect(() => {        
        /*changeModule();
        let ii ={"pr":"0"}
        dispatch(crudActions.GET_SEARCH('TDCS_TITEM','tdcs',ii))  */
        return () => {
         
        };
    }, []);

return(
    <div className="wrapper">  
      <div className="main-panel" > 
         <Modal isOpen={loading} className="cargas">          
          <ModalBody className="carga">
            <MoonLoader color="#1fa2f2" loading={loading} css={override} size={30} />                
          </ModalBody>
        </Modal>
        <div className="nav-unity" expand="lg">        
        <div className="sub-unity">
            <div className="left-unity">
            <Row > 
               <Col md="3" className="tico">
                <NavLink                
                    to={`/`} className="btn-barra"> 
                   <FontAwesomeIcon icon={ faHome } />
                </NavLink>
               </Col> 
            </Row>
            </div> 
            <div className="center-unity">
            <h6>Informes consolidados</h6> 
            </div> 
            <div className="conta-unity">
            <Row className="barraUser">                                                                  
                <Col md={3}>                    
                    <p>Usuario: {usuario.username}</p>
                </Col> 
                <Col md={3}>                    
                    <p>Fecha: <Moment format="DD/MM/YYYY">{fechaHoy}</Moment></p>
                </Col>                               
              </Row>
            </div>
            <div className="right-unity">
            <Row className="barraUser">                                  
                    <Col md={3}> 
                    <div className="circulu">
                        <FontAwesomeIcon icon={faEnvelope} />  
                    </div>                    
                    </Col>
                    <Col md={3}> 
                    <div className="circulu">
                        <FontAwesomeIcon icon={faBell} />  
                    </div>                    
                    </Col>
                    <Col md={3}> 
                    <div className="circulu">
                        <FontAwesomeIcon icon={faQuestion} />  
                    </div>                    
                    </Col>
                                                             
                    <Col md={3} className="text-right"> 
                      <div className="circulu">
                      <Button className="btn-barra" onClick={() => {logoutt()}} >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                      </Button>                            
                      </div>
                    </Col>   
                  </Row>   
            </div>  
        </div>
        <Nav> 
          <div className="navLeft">  
             
          </div>
          <div className="navRight"></div>
        </Nav>        
        </div>  
        <Switch>  
          <Route path="/consolidado/inicio" component={InicioView} />          
          <Route path="/consolidado/icompras" component={ComprasView} />
          <Route path="/consolidado/iclientes" component={ClientesView} />
          <Route path="/consolidado/itickets" component={TicketsView} />
          <Route path="/consolidado/icotizaciones" component={CotizacionesView} />
          <Route path="/consolidado/ipagos" component={PagosView} />
          <Route path="/consolidado/iventas" component={VentasView} />
          <Route path="/consolidado/icobros" component={CobrosView} />
          <Route path="/consolidado/iexistencias" component={ExistenciasView} />
          <Route path="/consolidado/icajas" component={CajasView} />          
        </Switch>             
      </div>        
    </div>    
)    

}
export default Crm;

