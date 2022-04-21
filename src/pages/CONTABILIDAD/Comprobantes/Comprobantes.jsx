import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import TableComprobantes from "./components/TableComprobantes";
import SearchComprobante from "./components/SearchComprobante";
import EditComprobante from "./components/EditComprobante";


const Comprobantes = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();  
  const { modalView } = useSelector(state => state.comprobantes)  
  
  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchComprobante getComponent={getComponent}/><TableComprobantes getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'COMPROBANTES_RESET_ITEM'})
          setComponent(<EditComprobante getComponent={getComponent}/>)
          break;
        case 'edit':
         
          dispatch(crudActions.GET_ITEM_LOAD('COMPROBANTES_ITEM','comprobantes',key))           
          setComponent(<EditComprobante getComponent={getComponent}/>)
          break;    
        default:
          break;
      }
  },[]);



  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga comprobantes')
    };
  }, []); 

  return(
    <div className="content">     
      <div className="main-contenido">     
        {component}      
      </div>
    </div>    
  )

};
export default Comprobantes;
