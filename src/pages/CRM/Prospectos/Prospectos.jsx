import React,{useState, useCallback, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../actions'
import TableProspectos from "./components/TableProspectos";
import SearchProspecto from "./components/SearchProspecto";
import EditProspecto from "./components/EditProspecto";


const Prospectos = () => {
  const dispatch = useDispatch() 
  const [component, setComponent] = useState();   
  const getComponent = useCallback((io, key) =>{    
      switch(io){
        case 'data':
          setComponent(<><SearchProspecto getComponent={getComponent}/><TableProspectos getComponent={getComponent}/></>)
          break;    
        case 'new':
          dispatch({type:'PROSPECTOS_RESET_ITEM'})
          setComponent(<EditProspecto getComponent={getComponent}/>)
          break;
        case 'edit':
          dispatch(crudActions.GET_ITEM_LOAD('PROSPECTOS_ITEM','prospectos',key)) 
          setComponent(<EditProspecto getComponent={getComponent}/>)
          break;    
        default:
          break;
      }
  },[]);

  useEffect(() => {
    getComponent('data',1)

    return () => {
      console.log('descarga prospectos')
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
export default Prospectos;
