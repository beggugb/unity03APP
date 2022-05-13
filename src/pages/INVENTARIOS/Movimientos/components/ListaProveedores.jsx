import React,{useEffect} from "react";
import { Row, Col  } from "reactstrap";
import { crudActions } from '../../../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../../../helpers";


const ListaProveedores = () => {
   const dispatch = useDispatch() 
   const {pitems}= useSelector(state => state.compras)

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
  
  return(
    <>    
    <Row className="mt-2 mb-3">      
        {pitems && (
          <Col>    
            {pitems.map((item, index) => (  
                <div key={index} className="prospecto" >   
                  <FontAwesomeIcon icon={faTimesCircle} className="prosTi" onClick={() => handleEliminar(index)}/>               
                    <div className="prospectol">
                    <img alt="artículo"   className="img-prospecto" src={api + "/static/images/proveedores/md/" + item.filename}/>   
                    </div>
                    <div className="prospector">
                      <h4>{item.razonSocial}</h4>                  
                      <h5><FontAwesomeIcon icon={faEnvelope} className="prosFa"/> {item.email}</h5>
                      <h5><FontAwesomeIcon icon={faPhone} className="prosFa"/> {item.telefono}</h5>
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
