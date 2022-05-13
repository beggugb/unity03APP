import React,{useEffect} from "react";
import { Table, Row, Col, Button  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


const ListaMovimientos = () => {
   const dispatch = useDispatch() 
   const { item, items }= useSelector(state => state.movimientos)
   const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))


   const removeItem = (index) => {     
    var array = [...items];    
    let cTotal = item.nroItems    
    let gTotal = item.totalGeneral  
    let sTotal = item.subTotal
    let gImp    = item.impuesto  

    if(array.length < 0){
      cTotal = 0
      gTotal = 0
      sTotal = 0
      gImp   = 0
    }else{    
        cTotal = cTotal - parseFloat(array[index].cantidad);    
        gTotal = gTotal - parseFloat((array[index].cantidad * array[index].valor));        
        gImp   = gTotal * parseFloat(item.iva / 100)
        sTotal = gTotal - parseFloat(gImp)
    }
    array.splice(index,1);        
    dispatch({type:'MOVIMIENTOS_SET_ITEMS',values:array, cantidad: cTotal, subTotal: sTotal, totalGeneral: gTotal,impuesto:gImp })      
    } 
   
   useEffect(() => {    
    return () => {
      dispatch({type:'MOVIMIENTOS_RESET_ITEMS'})   
    };
}, []);
  return(
    <>    
    <Row>
      <Col>
        <Table className="table-simple">
          <thead>
              <tr>  
                <th width="20%" >Código</th>
                <th width="40%">Nombre</th>                                
                <th width="10%">Precio</th>  
                <th width="10%">Cantidad</th>                                              
                <th width="15%">Total</th>            
                <th width="5%"></th>                   
              </tr>
          </thead>
          {items && (
              <tbody>
                  {items.map((item, index) => (
                      <tr key={item.articuloId}>                      
                        <td>{item.codigo || ''}</td>
                        <td>{item.nombre || ''}</td>                          
                        <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.valor)}</td>
                        <td>{item.cantidad} ({item.unidad}) </td>
                        <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.valor * item.cantidad)}</td>
                        
                        <td>
                          <Button className="btn btn-danger" 
                            onClick={() => { removeItem(index)}}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>                                           
                        </td>
                      </tr>  
                      ))}                      
                      <tr>
                        <td colSpan="4"><b>TOTAL</b></td>
                        <td><b>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.totalGeneral)}</b></td>                        
                      </tr> 
              </tbody>
          )}
        </Table>
    
      </Col>         
    </Row>       
</>      
  )

};
export default ListaMovimientos;
