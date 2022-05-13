import React,{ useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../../actions'
import { Card } from "reactstrap";
import {toastr} from 'react-redux-toastr'
import { api } from "../../../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


const ListaArticulos = () => {
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.articulos)  
    const { items, item } = useSelector(state => state.ventas)  
    const almacenId = JSON.parse(localStorage.getItem('@userAlmacen'))  
    const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))

    const handleAsignar = (articulo) => {         
      if(articulo.stock > 0)
      {
        let ites = [...items]
        let cTotal     = item.nroItems
        let gTotal     = item.totalGeneral
        let sTotal     = item.subTotal
        let gImp       = item.impuesto
        let tDescuento = item.totalGeneral

        let repeat = false
        ites.map((itt, index) =>{                              
          if(itt.articuloId === articulo.articuloId && itt.stock < articulo.stock)
            { 
              ites[index].cantidad = parseInt(ites[index].cantidad) + 1 
              ites[index].subTotal = ites[index].subTotal + parseFloat(articulo.valor)        
              ites[index].stock = ites[index].stock + 1
              
              cTotal = parseInt(cTotal) +parseInt(1);                                          
              
              gTotal = parseFloat(gTotal) + parseFloat(articulo.valor)              
              gImp   = parseFloat(gTotal) * parseFloat(item.iva / 100) 
              sTotal = parseFloat(gTotal) - parseFloat(gImp)  
              repeat = true;              
            }
            if(itt.articuloId === articulo.articuloId)
            {                        
              repeat = true;
            }
          return null
        })

        if(!repeat)
          {
          let itemVenta = {
            cantidad   : 1,          
            articuloId : articulo.articuloId,        
            valor      : articulo.valor,
            unidad     : articulo.unidad,
            stock      : 1,
            subTotal   : parseInt(1) * parseFloat(articulo.valor),        
            nombre     : articulo.nombreCorto,  
            sumStock   : articulo.stock  
          }  
          ites.push(itemVenta);   
          
          cTotal = parseInt(cTotal) +parseInt(1);    
          gTotal = parseFloat(gTotal) + parseFloat(itemVenta.subTotal)
          gImp   = parseFloat(gTotal) * parseFloat(item.iva / 100) 
          sTotal = parseFloat(gTotal) - parseFloat(gImp)
          }        

          dispatch({type:'VENTAS_SET_ITEMS',values:ites, cantidad: cTotal, subTotal: sTotal, totalGeneral: gTotal,impuesto:gImp,totalDescuento: tDescuento})  
          }else{
            toastr.error(articulo.nombreCorto, 'Sin Stock') 
          }
    }  


    const makeHttpRequestWithPage = (page,num) =>{          
      let iok ={
        "almacenId": almacenId.id,
        "pagina":page,
        "num":num,
        "name":"",
        "codigo":"",
        "categoriaId":0,
        "stock":3
      } 
      dispatch(crudActions.GET_SEARCH('ARTICULOS_DATA','almacenes',iok)) 
     }
   
    
    useEffect(() => {
        makeHttpRequestWithPage(1,12)
        return () => {   
            dispatch({type:'ARTICULOS_RESET_DATA'})          
        };
    }, []);

 
    return (              
        <>             
        {data.map((item,index) => (
        <Card key={index} className="articulo" onClick={() => handleAsignar(item)}>          
          <div className="qprecio">
          <div className={item.oferta ? "qoferta":"qaferta"}><FontAwesomeIcon icon={faStar} /> </div>   
          <div className="qvalor">          
          {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.valor)}        
          </div>
          </div>            
            <img
            alt="artículo"
            className="img-articulo"
            src={api + "/static/images/articulos/md/" + item.filename}
            />          
          <div className="nombre">{item.nombreCorto}</div>         
          <div className={item.stock > 0 ?"stocki" :"stock"}>{item.stock}</div>            
        </Card>
        ))}        
        </>                  
                
    );
};
export default ListaArticulos;
