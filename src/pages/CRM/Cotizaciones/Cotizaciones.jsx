  import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import TableCotizaciones from "./components/TableCotizaciones";
import SearchCotizacion from "./components/SearchCotizacion";
import EditCotizacion from "./components/EditCotizacion";


const Cotizacions = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();   
  const getComponent = useCallback((io, key) =>{ 
    dispatch(crudActions.GET_ITEM('EMPRESA_ITEM','empresas',1))      
      switch(io){
        case 'data':
          setComponent(<><SearchCotizacion getComponent={getComponent}/><TableCotizaciones getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'COTIZACIONES_RESET_ITEM'})
          setComponent(<EditCotizacion getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM_LOAD('COTIZACIONES_ITEM','cotizaciones',key)) 
          setComponent(<EditCotizacion getComponent={getComponent}/>)
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga cotizacions')
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
export default Cotizacions;
