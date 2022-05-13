import React,{useState, useCallback, useEffect} from "react";
import { useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import TableMovimientos from "./components/TableMovimientos";
import SearchMovimiento from "./components/SearchMovimiento";
import EditMovimiento from "./components/EditMovimiento";


const Movimientos = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();  
 


  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':       
          setComponent(<><SearchMovimiento getComponent={getComponent}/><TableMovimientos getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'MOVIMIENTOS_RESET_RESUMEN'})          
          setComponent(<EditMovimiento getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM_LOAD('MOVIMIENTOS_ITEM','Movimientos',key)) 
          setComponent(<EditMovimiento getComponent={getComponent}/>)
          break;    
        default:
          break;
      }
  },[]);



  useEffect(() => {
    getComponent('data',1)

    return () => {
     /* console.log('descarga Movimientos')*/
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
export default Movimientos;
