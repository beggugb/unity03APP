import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Modal, ModalBody, Button  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { crudActions } from '../../../actions'
import PersonaResumen from "./components/PersonaResumen";
import TablePersonas from "./components/TablePersonas";
import SearchPersona from "./components/SearchPersona";
import EditPersona from "./components/EditPersona";

const PersonaView = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();  
  const { modalView } = useSelector(state => state.personas)  
 
  
  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'PERSONAS_VIEW',view:est})  
                 
  };

  const getComponent = useCallback((io, key) =>{        
      switch(io){
        case 'data':
          setComponent(<><SearchPersona getComponent={getComponent}/><TablePersonas getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'PERSONAS_RESET_ITEM'}) 
          setComponent(<EditPersona getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM_COMPUESTO('PERSONAS_ITEM','personas',key)) 
          setComponent(<EditPersona getComponent={getComponent}/>)
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
            <PersonaResumen/>
          </ModalBody>
        </Modal>
      </div>
    </div>    
    </>
  )

};
export default PersonaView;
