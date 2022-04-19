import React,{useState, useCallback, useEffect} from "react";
import { useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import TablePedidos from "./components/TablePedidos";
import SearchPedido from "./components/SearchPedido";
import EditPedido from "./components/EditPedido";


const Pedidos = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();  
 


  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':       
          setComponent(<><SearchPedido getComponent={getComponent}/><TablePedidos getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'PEDIDOS_RESET_RESUMEN'})   
          setComponent(<EditPedido getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM_LOAD('PEDIDOS_ITEM','pedidos',key)) 
          setComponent(<EditPedido getComponent={getComponent}/>)
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
export default Pedidos;
