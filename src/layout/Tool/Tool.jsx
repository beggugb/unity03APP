import React,{ useEffect, useCallback, useState } from "react";
import { css } from "@emotion/react";
import { Route, Switch, NavLink } from "react-router-dom";
import { Row, Col, Button, Nav, Modal, ModalBody, NavItem } from "reactstrap";
import {  useSelector, useDispatch } from "react-redux";
import { usuarioActions, crudActions} from "../../actions"
import MoonLoader from "react-spinners/MoonLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faBell, faEnvelope, faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Empresa from "../../pages/SECURITY/Empresa/EditEmpresa.jsx"
import Usuarios from "../../pages/SECURITY/Usuarios/UsuariosView.jsx"
import Sucursales from "../../pages/SECURITY/Sucursales/SucursalesView.jsx"
import Moment from "react-moment";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const fechaHoy = new Date()
function Tool(){
  const dispatch = useDispatch() 
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))
    const [itemr,setItemr] = useState([])    
    const modulos = JSON.parse(localStorage.getItem('@userItems')) 
    const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))   
    const { loading }= useSelector(state => state.usuarios)
    const { titem } = useSelector(state => state.tdcs) 

    const changeModule = useCallback((name, tab, pky) =>{
        let items = [...itemr];
        modulos.map((prop, key)=>{            
            if(prop.icon === "tools"){
            let dato = {
                path: prop.path,
                name: prop.name,
                icon: prop.icon,
                component: verificar(prop.component),
                layout: prop.layout
            };
            items.push(dato);
            }
            return null;
        })
        setItemr(items)
    })
    const logoutt = () => {    
      dispatch(usuarioActions.logout())  
    };
    const verificar = (component) => {
        switch (component) {
          case "Empresa":
            return Empresa;   
          case "Usuarios":
            return Usuarios;     
          case "Sucursales":
            return Sucursales;
          /*case "Cotizaciones":
            return Cotizaciones;          
          default:
            return null;*/
        }
      };
    
    const getRoutes = (routes) =>{
        return routes.map((prop, key) =>{
            if(prop.layout === '/tools'){
                return(
                    <Route
                       path={prop.layout + prop.path}
                       component={prop.component}
                       key={key} 
                    />
                );
            }else{
                return null;
            }
        })
    };
    

    useEffect(() => {        
        changeModule();
        let ii ={"pr":"0"}
        dispatch(crudActions.GET_SEARCH('TDCS_TITEM','tdcs',ii))
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
            <h6>Configuraciones</h6>  
            </div> 
            <div className="conta-unity">
            <Row className="barraUser">                                  
                <Col md={3}>                    
                    <p>TDC: {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(titem)} </p>
                </Col>
                <Col md={3}>                    
                    <p>Moneda: {empresa.moneda}</p>
                </Col> 
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
              {itemr.map((prop, key) => (  
                <NavItem key={key}>  
                  <NavLink                
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active">               
                    <p> {prop.name}</p>                    
                  </NavLink>
                </NavItem>))}
            </div>
            <div className="navRight"></div>
        </Nav>        
        </div>  
        <Switch>   
          {getRoutes(itemr)}                       
               
        </Switch>             
      </div>        
    </div>    
)    

}
export default Tool;

