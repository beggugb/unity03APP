import React,{ useEffect, useCallback, useState } from "react";
import { css } from "@emotion/react";
import { Route, Switch, NavLink } from "react-router-dom";
import { Row, Col, Button, Nav, Modal, ModalBody, NavItem } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { usuarioActions} from "../../actions"
import MoonLoader from "react-spinners/MoonLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import Inventarios from "../../pages/INVENTARIOS/InicioView"
import Articulos from "../../pages/INVENTARIOS/Articulos/ArticulosView"
import Informes from "../../pages/INVENTARIOS/Informes/ExistenciasView"
import IMovimientos from "../../pages/INVENTARIOS/Informes/MovimientosView"
import Utils from "../../pages/INVENTARIOS/Categorias/CategoriasView"
import Marcas from "../../pages/INVENTARIOS/Marcas/MarcasView"
import Unidades from "../../pages/INVENTARIOS/Unidades/UnidadesView"



const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Inventario(){
  const dispatch = useDispatch() 
    const usuario = JSON.parse(localStorage.getItem('@userUnity'))
    const [itemr,setItemr] = useState([])    
    const modulos = JSON.parse(localStorage.getItem('@userItems'))    
    const { loading }= useSelector(state => state.usuarios)

    const changeModule = useCallback((name, tab, pky) =>{
        let items = [...itemr];
        modulos.map((prop, key)=>{
          if(prop.icon === "inventarios"){
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
          case "Articulos":
            return Articulos;
          case "Utils":
            return Utils;
          case "Informes":
            return Informes;      
          default:
            return null;
        }
      };
    
    const getRoutes = (routes) =>{
        return routes.map((prop, key) =>{
            if(prop.layout === '/inventarios'){
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
            <h6>INVENTARIOS</h6>  
            </div> 
            <div className="right-unity">
                <Row className="barraUser">              
                    <Col md={2}> 
                    <div className="circulu">
                        <FontAwesomeIcon icon={faUser} />  
                    </div>                    
                    </Col>
                    <Col md={8}>                    
                        <p>Usuario: {usuario.nombres}</p>
                    </Col>                                         
                    <Col md={2} className="text-right"> 
                      <Button className="btn-barra" onClick={() => {logoutt()}} >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                      </Button>                            
                    </Col>   
                </Row>   
            </div>  
        </div>          
        <Nav> 
            <NavItem>       
              <NavLink to="/inventarios/inicio" className="nav-link" activeClassName="active">            
                <p className="text-white">  Dashboard  </p>
              </NavLink>          
            </NavItem>
   
            {itemr.map((prop, key) => (  
              <NavItem key={key}>  
                <NavLink                
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active">               
                  <p> {prop.name}</p>                    
                </NavLink>
              </NavItem>))
            }
     
        </Nav>        
        </div>  
       

        <Switch>   
          {getRoutes(itemr)}   
          <Route path="/inventarios/inicio" component={Inventarios} />      
          <Route path="/inventarios/imovimientos" component={IMovimientos} />
          <Route path="/inventarios/marcas" component={Marcas} />
          <Route path="/inventarios/unidades" component={Unidades} />
        </Switch>             
      </div>        
    </div>    
)    

}
export default Inventario;

