import React,{useState, useCallback, useEffect} from "react";
import { useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import TableCompras from "./components/TableCompras";
import SearchCompra from "./components/SearchCompra";
import EditCompra from "./components/EditCompra";


const Compras = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();  
 


  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':       
          setComponent(<><SearchCompra getComponent={getComponent}/><TableCompras getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'COMPRAS_RESET_RESUMEN'})          
          setComponent(<EditCompra getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM_LOAD('COMPRAS_ITEM','compras',key)) 
          setComponent(<EditCompra getComponent={getComponent}/>)
          break;    
        default:
          break;
      }
  },[]);



  useEffect(() => {
    getComponent('data',1)

    return () => {
     /* console.log('descarga compras')*/
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
export default Compras;
