import React,{useEffect} from "react";
import { Table, Row, Col, Button, Card, CardBody  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


const ListaVentas = () => {
   const dispatch = useDispatch() 
   const {items, item }= useSelector(state => state.ventas)
   const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
   


   const removeItem = (index) => {          
    var array = [...items];    
    let cTotal = item.nroItems      
    let gTotal = item.totalGeneral  
    let sTotal = item.subTotal
    let gImp   = item.impuesto
    let tDescuento = item.totalDescuento

    if(array.length < 0){
      cTotal = 0
      gTotal = 0
      sTotal = 0
      gImp   = 0
      /*tDescuento = 0*/
    }else{    
        cTotal = cTotal - parseFloat(array[index].cantidad);    
        gTotal = gTotal - parseFloat((array[index].cantidad * array[index].valor));        
        gImp   = gTotal * parseFloat(item.iva / 100)
        sTotal = gTotal - parseFloat(gImp)        
        tDescuento = tDescuento - parseFloat((array[index].cantidad * array[index].valor));
    }
    array.splice(index,1);        
    dispatch({type:'VENTAS_SET_ITEMS',values:array, cantidad: cTotal, subTotal: sTotal, totalGeneral: gTotal,impuesto:gImp,totalDescuento : tDescuento })
   }

 
   
   useEffect(() => {    
    return () => {
      dispatch({type:'VENTAS_RESET_ITEMS'})   
    };
}, []);
  return(
    <>    
    <Row>
      <Col>
      <Card>        
        <CardBody>
        <Table className="table-simple">
          <thead>
              <tr>  
                <th width="15%" >Código</th>
                <th width="45%">Nombre</th>                                
                <th width="10%">Valor</th>
                <th width="10%">Cantidad</th>                
                <th width="15%">SubTotal</th>            
                <th width="5%"></th>                   
              </tr>
          </thead>
          {items && (
              <tbody>
                  {items.map((item, index) => (
                      <tr key={item.articuloId}>                      
                        <td>{item.codigo}</td>
                        <td>{item.nombre}</td>                                                 
                        <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.valor)}</td>
                        <td>{item.cantidad} ({item.unidad}) </td>
                        <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.subTotal)}</td>

                        <td>
                          <Button className="btn btn-danger" 
                            onClick={() => { removeItem(index)}}>
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>                                           
                        </td>
                      </tr>  
                      ))}
                   <tr>
                        <td colSpan="4">SubTotal:</td>
                        <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.subTotal)}</td>
                        
                      </tr>
                      <tr>
                        <td colSpan="4">Impuesto:</td>
                        <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.impuesto)}</td>
                      </tr>                      
                      <tr>
                        <td colSpan="4"><b>Descuento</b></td>                        
                          <td className={item.descuento === 0 || item.descuento === '0' ? "nn": "subs" }>
                          {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.descuento)}
                          </td>                          
                      </tr>  
                      <tr>
                        <td colSpan="4"><b>TOTAL</b></td>                        
                        <td >{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.totalGeneral)}</td>
                      </tr>                      
              </tbody>
          )}
        </Table>
        </CardBody>
      </Card> 
      </Col>         
    </Row>        
</>      
  )

};
export default ListaVentas;
