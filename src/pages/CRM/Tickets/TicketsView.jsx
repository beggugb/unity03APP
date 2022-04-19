import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Modal, ModalBody, Button  } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { crudActions } from '../../../actions'
import TicketsResumen from "./components/TicketsResumen";
import TableTickets from "./components/TableTickets";
import SearchTickets from "./components/SearchTickets";
import EditTickets from "./components/EditTickets";

const TicketsView = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();  
  const { modalView } = useSelector(state => state.tickets)  
 
  
  const toggleModalView = () => {    
    let est = modalView === true ? false : true;             
    dispatch({type:'TICKETS_VIEW',view:est})  
                 
  };

  const getComponent = useCallback((io, key) =>{        
      switch(io){
        case 'data':
          setComponent(<><SearchTickets getComponent={getComponent}/><TableTickets getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'TICKETS_RESET_ITEM'}) 
          setComponent(<EditTickets getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM('TICKETS_ITEM','tickets',key)) 
          setComponent(<EditTickets getComponent={getComponent}/>)
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
            <TicketsResumen/>
          </ModalBody>
        </Modal>
      </div>
    </div>    
    </>
  )

};
export default TicketsView;
