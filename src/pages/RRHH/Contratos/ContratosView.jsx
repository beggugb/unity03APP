import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Modal, ModalBody, Button  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { crudActions } from '../../../actions'
import ContratoResumen from "./components/ContratoResumen";
import TableContratos from "./components/TableContratos";
import SearchContrato from "./components/SearchContrato";
import EditContrato from "./components/EditContrato";

const ContratoView = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();  
  const { modalView } = useSelector(state => state.contratos)  
 
  
  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'CONTRATOS_VIEW',view:est})  
                 
  };

  const getComponent = useCallback((io, key) =>{        
      switch(io){
        case 'data':
          setComponent(<><SearchContrato getComponent={getComponent}/><TableContratos getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'CONTRATOS_RESET_ITEM'}) 
          setComponent(<EditContrato getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM('CONTRATOS_ITEM','contratos',key)) 
          setComponent(<EditContrato getComponent={getComponent}/>)
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)
    return () => {
     /* console.log('exit clients view')*/
    };
  }, []);

  return(
    <>    
    <div className="content">        
      <div className="main-contenido">             
          {component}          
        <Modal isOpen={modalView} toggle={toggleModalView}>
          <Button className="btn-view btn-danger"  onClick={() => toggleModalView()} >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          <ModalBody>
            <ContratoResumen/>
          </ModalBody>
        </Modal>
      </div>
    </div>    
    </>
  )

};
export default ContratoView;
