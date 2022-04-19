import React, { useRef, useEffect }  from 'react'
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux'
import { Table,Col,Row,Button } from "reactstrap";
import ReactToPrint from "react-to-print";


 export class ComponentToPrint extends React.PureComponent {
  render() {
    const fechaHoy = new Date(); 
    const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
    return (
      <>
        <div className="reporte">     
        <div className="report-header">        
            <Row className="crl">
              <Col md={12}>
              <h6 className="text-center pio"> <b>Cotización # {this.props.dato.id}</b></h6>              
              <h5 className="text-center pio"> Fecha : <Moment format="DD-MM-YYYY">{this.props.dato.fechaCotizacion}</Moment></h5>             
              <h5 className="text-center pio"> Hora : <Moment format="HH:mm:ss">{this.props.dato.createdAt}</Moment></h5>             
              <h5 className="text-center pio"> {this.props.dato.estado}</h5> 
              </Col>            
            </Row>
        </div>
        <div className="report-body">  
        <Row >  
          <Col> 
          <h3>{this.props.empresa.labelCotizacion} </h3>          
          </Col>
        </Row>
        <Row >
          <Col md={12} className="mt-2">
          <h4>Detalle</h4>  
          <Table className="table-reporteh">                      
              <tbody>                  
                <tr>                      
                  <td><b>Nº Items</b></td>
                  <td>{this.props.dato.nroItems}</td>                                                            
                  <td><b>Total : </b></td>
                  <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.dato.totalGeneral)}</td>                                        
                </tr>           
                <tr>                                          
                  <td><b>Cliente : </b></td>
                  <td>{this.props.dato.clients || ''} </td>
                  <td><b>Descuento : </b></td>
                  <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.dato.descuento)}</td>
                </tr>
                <tr>                                          
                  <td><b>Forma de Pago : </b></td>
                  <td>{this.props.dato.formaPago || ''} </td>
                                                        
                  <td><b>Forma de Entrega : </b></td>
                  <td>{this.props.dato.formaEntrega || ''} </td>
                </tr>
                <tr>      
                  <td><b>Glosa : </b></td>
                  <td colSpan="5">{ this.props.dato.observaciones }</td>                                       
                </tr>                  
              </tbody>          
            </Table>
            <h4>Items</h4>  
            <Table className="table-reportesh">
            <thead>
              <tr>  
              <th width="15%">Código</th>
                <th width="45%">Nombre</th>                                
                <th width="10%">Precio</th>
                <th width="10%">Cantidad</th>
                <th width="20%">Sub-Total</th>                                          
              </tr>
          </thead>
          {this.props.data && (
              <tbody>
              {this.props.data.map((item, index) => (
                  <tr key={item.articuloId}>                      
                    <td>{item.codigo}</td>
                    <td>{item.nombre}</td>                                                                                     
                    <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.valor)}</td>                     
                    <td className="text-center">{item.cantidad} ({item.unidad})</td>
                    <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.valor * item.cantidad)}</td>
                  </tr>  

                  ))}
                  <tr> 
                    <td colSpan="4" className="text-right"><b>Sub-Total </b></td>
                    <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.dato.subTotal)}</td>                                        
                  </tr> 
                  <tr>                     
                    <td colSpan="4" className="text-right"><b>Impuesto </b></td>
                    <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.dato.impuesto)}</td>
                  </tr> 
                  <tr>                     
                    <td colSpan="4" className="text-right"><b>Total </b></td>
                    <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.dato.totalGeneral)}</td>
                  </tr> 
                  <tr>                     
                    <td colSpan="4" className="text-right"><b>Total - Descuento</b></td>
                    <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.dato.totalDescuento)}</td>
                  </tr> 
          </tbody>
          )}
            </Table>
          </Col>      
        </Row> 

        <Row>           
          <Col>
          <h3><b>Garantias :</b> {this.props.empresa.garantiaCotizacion} </h3>
          <h3><b>Politicas:</b> {this.props.empresa.politicaCotizacion} </h3>
          </Col>      
        </Row>         

        </div>    
        <div className="report-footer">        
          <Row>
            <Col md="6">           
              <p>Usuario: {this.props.user.nombres}</p>
            </Col>
            <Col md="6">           
              <p>Fecha/Hora emisión: <Moment format="DD/MM/YYYY HH:mm:ss">{fechaHoy}</Moment></p>
            </Col>
          </Row>          
        </div>
      </div>  
     </> 
    );
  }
}


function VentaResumen () {    
  const dispatch = useDispatch()
  const { item, items } = useSelector(state => state.cotizaciones)
  const  iempresa = useSelector(state => state.empresa.item)
  const usuario = JSON.parse(localStorage.getItem('@userUnity'))
  const componentRef = useRef();     
  useEffect(() =>{        
      return () =>{            
          dispatch({type:'VENTAS_RESET_ITEMS'}) 
          dispatch({type:'VENTAS_RESET_ITEM'}) 
      };
    }, []);
return(
    <div className="creporte">
        <ReactToPrint
            trigger={() => <Button className="fas fa-print btn-sm btn-info">Imprimir</Button>}
            content={() => componentRef.current}        
        />
        <ComponentToPrint
            ref={componentRef}                      
            dato={item}
            data={items}            
            empresa={iempresa}
            user={usuario}
        />
    </div>
     )
}


export default VentaResumen