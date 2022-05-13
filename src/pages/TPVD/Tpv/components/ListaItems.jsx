import React,{useEffect, useState} from "react";
import { Table, Row, Col, Input  } from "reactstrap";
import { useSelector, useDispatch } from 'react-redux';

const ListaItems = () => {
   const dispatch = useDispatch() 
   const { items, item, artId }= useSelector(state => state.ventas)   
   const [cnt, setCnt] = useState(-1);
   const [cantidad, setCantidad] = useState(0);
   const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
   
   
   const handleAsignar = (articuloId) => {      
    setCnt(articuloId)
    console.log(articuloId)    
   } 

   const changeHandler = (event,stock) =>{
    const { name, value } = event.target      
    if(stock >= value){
      setCantidad(value)    
    }
   }

  const submitHandle = () => {   
    if(cantidad !== 0)
      {            
      let ites = [...items]
      let cTotal = item.nroItems
      let gTotal = item.totalGeneral
      let sTotal = item.subTotal
      let gImp   = item.impuesto
      let tDescuento = item.totalGeneral

        if (cnt !== -1 ) {
            let idBlock    = ites[cnt].cantidad
            let idSubTotal = ites[cnt].subTotal
            ites[cnt].cantidad = parseInt(cantidad) 
            ites[cnt].subTotal = parseInt(cantidad) * parseFloat(ites[cnt].valor)
            
            cTotal = (parseInt(cTotal) - parseInt(idBlock)) + parseInt(cantidad)
            gTotal = (parseFloat(gTotal) - parseFloat(idSubTotal)) + ites[cnt].subTotal  
            gImp   = gTotal * parseFloat(item.iva / 100)    
            sTotal = gTotal - parseFloat(gImp)        
            tDescuento = tDescuento - parseFloat((ites[cnt].cantidad * ites[cnt].valor));

            dispatch({type:'VENTAS_SET_ITEMS',values:ites, cantidad: cTotal, subTotal: sTotal, totalGeneral: gTotal,impuesto:gImp,totalDescuento:tDescuento})  
            setCantidad(0)    

        } 
      }
      setCnt(-1)   
    
  }
  useEffect(() => {
      /*makeHttpRequestWithPage(1,12)*/
      return () => {
      /*    cleanup*/
      console.log('clean table inventario')
      };
  }, []);

  return(
    <>    
    <Row>
    {item.nroItems > 0 && (
      <Col>            
        <Table className="table-post">                    
              <tbody>
                  {items.map((item, index) => (
                      <tr key={item.articuloId} onClick={() => handleAsignar(index)} className={artId === index ? "check":"checki" } >                                              
                        <td width="60%">                          
                            <table>
                              <tbody>
                                <tr><td colSpan="2"><b>{item.nombre}</b></td></tr>  
                                <tr>
                                  { cnt === index ?
                                   <td>
                                     <Input 
                                      type="text" 
                                      name="cantidad"                             
                                      id="cantidad"  
                                      value={cantidad}  
                                      onChange={(e) => changeHandler(e,item.sumStock)}
                                      onDoubleClick={submitHandle}                                       
                                      /> 
                                   </td>   
                                  :
                                  <td className="detalles">{item.cantidad} {item.unidad} / 
                                  ({new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.valor)})</td>
                                  }
                                                                    
                                </tr>  
                              </tbody>
                            </table>                          
                        </td>                                   
                        <td width="40%" className="text-center">
                        {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.subTotal)}
                        </td>                                                      
                      </tr>  
                      ))}
              </tbody>          
        </Table>
        <Table className="table-posts">                    
          <tbody>                              
            <tr>                                              
              <td colSpan="2"><b>Sub-Total :</b></td>                                              
              <td className="text-center">
                {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.subTotal)}
              </td>
            </tr>
            <tr>                                              
              <td colSpan="2"><b>Impuesto :</b></td>                                              
              <td className="text-center">
                {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.impuesto)}
              </td>
            </tr>
            <tr>                                              
              <td colSpan="2"><b>Total :</b></td>                                              
              <td className="text-center">
                {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.totalGeneral)}
              </td>
            </tr>                        
          </tbody>          
        </Table>        
      </Col>
      )}
    </Row>       
</>      
  )

};
export default ListaItems;
