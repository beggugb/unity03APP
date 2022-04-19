import React,{useEffect} from "react";
import { Row, Col  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../../../helpers";


const ListaProveedores = () => {
   const dispatch = useDispatch() 
   const {pitems, item}= useSelector(state => state.compras)

   useEffect(() => {    
    return () => {
      dispatch({type:'PROVEEDORES_RESET_ITEMS'})   
    };
  }, []);

  const handleEliminar = (index) => {          
    var array = [...pitems];        
    array.splice(index,1);        
    dispatch({type:'COMPRAS_SET_PROVEEDORES',values:array})         
  }
  
  const handleAsignar = (itt) => {          
    dispatch({type: 'COMPRAS_CHANGE', props: 'proveedorId', value: itt.proveedorId})
    dispatch({type: 'COMPRAS_CHANGE', props: 'proveedors', value: itt.razonSocial})
  }
  
  return(
    <>    
    <Row className="mt-2 mb-3">      
        {pitems && (
          <Col>    
            {pitems.map((it, index) => (  
                <div key={index} className={it.proveedorId === item.proveedorId ? "prospectos":"prospecto"}>   
                  {it.proveedorId === item.proveedorId ? <FontAwesomeIcon icon={faCheckCircle} className="prosTiv"/> : <FontAwesomeIcon icon={faTimesCircle} className="prosTi" onClick={() => handleEliminar(index)}/>}                                  
                    <div className="prospectol" onClick={() => handleAsignar(it)}>
                    <img alt="artículo"   className="img-prospecto" src={api + "/static/images/proveedores/md/" + it.filename}/>   
                    </div>
                    <div className="prospector">
                      <h4>{item.razonSocial}</h4>                  
                      <h5><FontAwesomeIcon icon={faEnvelope} className="prosFa"/> {it.email}</h5>
                      <h5><FontAwesomeIcon icon={faPhone} className="prosFa"/> {it.telefono}</h5>
                    </div>
                </div>
            ))}
          </Col>
        )}
    </Row>        
</>      
  )

};
export default ListaProveedores;
