import React,{useState, useCallback, useEffect} from "react";
import { useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import TableVentas from "./components/TableVentas";
import SearchVenta from "./components/SearchVenta";
import EditVenta from "./components/EditVenta";

const Ventas = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();  

  
  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchVenta getComponent={getComponent}/><TableVentas getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'VENTA_RESET_RESUMEN'})
          setComponent(<EditVenta getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM_LOAD('VENTAS_ITEM','ventas',key)) 
          setComponent(<EditVenta getComponent={getComponent}/>)
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
export default Ventas;
