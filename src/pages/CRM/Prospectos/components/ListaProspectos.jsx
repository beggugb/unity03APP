import React,{useEffect} from "react";
import { Row, Col  } from "reactstrap";
import { crudActions } from '../../../../actions'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../../../helpers";


const ListaProspectos = () => {
   const dispatch = useDispatch() 
   const {items, item, cantidadTotal, sumaTotal}= useSelector(state => state.prospectos)

   useEffect(() => {    
    return () => {
      dispatch({type:'PROSPECTOS_RESET_ITEMS'})   
    };
  }, []);

  const handleEliminar = (pky) => {  
    dispatch(crudActions.GET_DELETE_LOAD('PROSPECTOS_ITEMS_ADD','prospectosc',pky,item.id)) 
  }  
  return(
    <>    
    <Row className="mt-2 mb-3">      
        {items && (
          <Col>    
            {items.map((item, index) => (  
                <div key={index} className="prospecto" >   
                  <FontAwesomeIcon icon={faTimesCircle} className="prosTi" onClick={() => handleEliminar(item.id)}/>               
                  <div className="prospectol">
                  <img alt="artículo"   className="img-prospecto" src={api + "/static/images/clientes/md/" + item.cliente.filename}/>   
                  </div>
                  <div className="prospector">
                    <h4>{item.cliente.nombres}</h4>                  
                    <h5><FontAwesomeIcon icon={faEnvelope} className="prosFa"/> {item.cliente.email}</h5>
                    <h5><FontAwesomeIcon icon={faPhone} className="prosFa"/> {item.cliente.telefono}</h5>
                  </div>
                </div>
            ))}
          </Col>
        )}
    </Row>        
</>      
  )

};
export default ListaProspectos;
