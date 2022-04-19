import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api } from "../../../../helpers";
import { Table,Col,Row } from "reactstrap";

function ArticuloProspecto () {    
const dispatch = useDispatch()
const { item } = useSelector(state => state.articulos)
const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))

 useEffect(() =>{          
     return () =>{            
        dispatch({type:'ARTICULOS_RESET_ITEM'}) 
    };
  }, []);
return(
    <div className="creportePro">
      {item.id ? 
        <div className="reportePro">     
        <div className="report-header">        
        <Row className="crl">
          <Col md={12}>
            <h6 className="text-center pio"> <b>Resumen Articulo # <b>{item.id}</b></b></h6>
            <h5 className="text-center pio"> {item.nombres}</h5>
            <h5 className="text-center pio"> CODIGO : {item.codigoBarras}</h5>             
          </Col>            
        </Row>
        </div>
        <div className="report-bodyPro">        
        <Row>
          <Col md={12} className="text-center">
            <img alt="articulo" className="text-center imglg" src={api + '/static/images/articulos/lg/'+item.filename }/>               
          </Col>          
        </Row>    
        <Row>
        <Col>
            <Table className="table-promocion mt-2">
            <tbody>
                <tr><td className="txt-promocion"><b>Nombre :</b></td></tr>  
                <tr><td className="txt-promocion">{item.nombre}</td></tr> 
                <tr><td className="txt-promocion"><b>Precio Venta :</b></td></tr>
                <tr><td className="txt-promocion">{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda}).format(item.precioVenta)}</td></tr>                
                <tr><td className="txt-promocion"><b>Descripción :</b></td></tr>   
                <tr><td className="txt-promocion">{ item.descripcion }</td></tr> 
            </tbody>
            </Table>  
        </Col>
        </Row>                       
        </div>      
      </div> 
      :null
      }                 
    </div>
     )
}


export default ArticuloProspecto