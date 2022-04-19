import React,{useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import { Row, Col, Modal, ModalBody, Button  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ListaCategoria from "../../INVENTARIOS/Categorias/components/ListaCategoria"
import ListaArticulos from "../../INVENTARIOS/Articulos/components/ListaArticulos";
import ListaItems from "./components/ListaItems";
import ButtonTpv from "./components/ButtonTpv"
import FormVenta from "./components/FormVenta"
import FormCodigo from "./components/FormCodigo"

const Tpv = () => {
  const dispatch = useDispatch()   
  const { modalView } = useSelector(state => state.ventas)   
  
  const makeHttpRequestWithPage = useCallback(() =>{              
    dispatch(crudActions.GET_ITEM('EMPRESA_ITEM','empresas',1))    
 },[]) 

 

  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'VENTAS_VIEW',view:est})                
  };


  useEffect(() => {
    makeHttpRequestWithPage()
    return () => {
      dispatch({type:'VENTAS_RESET_ITEMS'})  
      dispatch({type:'VENTAS_RESET_ITEM'})  
    };
  }, []); 

  return(
    <div className="content">     
      <div className="main-contenido">        
        <Row>
            <Col md="3" className="card-contenido">
              <Row> 
                <Col className="card-contenido-items">
                    <ListaItems/>
                </Col>
              </Row>  
              <Row> 
                  <Col md="12" className="card-contenido-botones">
                    <ButtonTpv/>
                  </Col>
              </Row>  
            </Col>

            <Col md="7" className="card-contenido">
              <FormCodigo/>                            
              <Row> 
                <Col md="12" className="card-contenido-productos">
                  <ListaArticulos/>
                </Col>
              </Row>  
            </Col>

            <Col md="2" className="card-contenido">              
              <ListaCategoria/>                
            </Col>
        </Row>
        

        <Modal isOpen={modalView} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <FormVenta/>
          </ModalBody>
        </Modal>

    

      </div>
    </div>    
  )

};
export default Tpv;
