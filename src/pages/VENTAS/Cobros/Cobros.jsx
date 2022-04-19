import React,{useState, useCallback, useEffect} from "react";
import { useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import TableCobros from "./components/TableCobros";
import SearchCobro from "./components/SearchCobro";
import EditCobro from "./components/EditCobro";


const Cobros = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();  

  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchCobro getComponent={getComponent}/><TableCobros getComponent={getComponent}/></>)          
          break;    
        case 'new':
          dispatch({type:'VENTA_RESET_ITEM'})
          setComponent(<EditCobro getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM_LOAD('COBROS_ITEM','ventas',key)) 
          setComponent(<EditCobro getComponent={getComponent}/>)
         
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga ventas')
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
export default Cobros;
