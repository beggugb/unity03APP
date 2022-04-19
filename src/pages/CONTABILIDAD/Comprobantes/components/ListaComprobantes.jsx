import React,{useEffect} from "react";
import { Table, Row, Col, Button } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";


const ListaComprobantes = () => {
   const dispatch = useDispatch() 
   const {items, item }= useSelector(state => state.comprobantes)
   const usuario = JSON.parse(localStorage.getItem('@userUnity'))
   const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))

   const removeItem = (index) => {     
    var array = [...items];          
    let sDebe  = parseFloat(item.tDebe)  
    sDebe = sDebe - parseFloat(array[index].debe);
    let sHaber = parseFloat(item.tHaber) 
    sHaber = sHaber - parseFloat(array[index].haber);
    array.splice(index, 1);    
    dispatch({type:'COMPROBANTES_SET_ITEMS',values:array}) 
    dispatch(crudActions.SET_CHANGE('COMPROBANTES_CHANGE','tDebe',sDebe))
    dispatch(crudActions.SET_CHANGE('COMPROBANTES_CHANGE','tHaber',sHaber))    
    }

    const submitHandle = () => { 
      let eItem = item                     
      eItem.usuarioId = usuario.id
      eItem.tDebe     = item.tDebe
      eItem.tHaber    = item.tHaber
     
      let xcode ={
        item : eItem,
        items: items
      }
      dispatch(crudActions.SET_UPDATES('COMPROBANTES_ADD','comprobantes',xcode,'unit'))         
   }

   
   useEffect(() => {    
    return () => {
      dispatch({type:'COMPROBANTES_RESET_ITEMS'})   
    };
}, []);
  return(
    <>    
    <Row>
      <Col className="mt-2 ml-2 mb-2 mr-2">
        <Table className="table-simple">
          <thead>
              <tr>                  
                <th width="20%">Código</th>
                <th width="45">Cuentas Afectadas</th>                
                <th width="15%" className="text-center">Debe</th>            
                <th width="15%" className="text-center">Haber</th>                
                <th width="5%"></th>                   
              </tr>
          </thead>
          {items && (
              <tbody>
                  {items.map((item, index) => (
                      <tr key={index}>                                           
                        <td>{item.codigo || ''}</td>                        
                        <td className={(item.debe === '0' || item.debe === 0) ? "text-center": "text-left"}>{item.descripcion || ''}</td>                                                                                                                  
                        <td className="text-center">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.debe)}</td>                     
                        <td className="text-center">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.haber)}</td>
                        <td>
                          <Button className="btn btn-danger" 
                            onClick={() => { removeItem(index)}}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>                                           
                        </td>
                      </tr>  
                      ))}
                      <tr>
                        <td colSpan="2" className="text-center"><b>TOTAL</b> </td>
                        <td className="text-center">
                        <b>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.tDebe)}</b>
                        </td>
                        <td className="text-center">
                          <b>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.tHaber)}</b>                          
                        </td>
                      </tr>
              </tbody>
          )}
        </Table>  
      </Col>        
    </Row>  
    
    <Row form>
      <Col md={2} >
          <Button
              className="btn-md btn-warning"
              onClick={() => submitHandle()}>
              <FontAwesomeIcon icon={faSave} />  
                Actualizar                        
          </Button> 
      </Col>         
    </Row>       
</>      
  )

};
export default ListaComprobantes;
