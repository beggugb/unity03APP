import React,{useEffect} from "react";
import { useDispatch } from 'react-redux'
import TableCajas from "./components/TableCajas";
import EditCaja from "./components/EditCaja"
const CajasView = () => { 
  const dispatch = useDispatch()       
  useEffect(() =>{                       
      return () =>{            
        dispatch({type:'CAJAS_RESET'})  
      };
    }, []);

  return(
    <>    
    <div className="content">     
      <div className="main-contenido">           
        <EditCaja/>
        <TableCajas/>         
      </div>
    </div>    
    </>
  )

};
export default CajasView;
