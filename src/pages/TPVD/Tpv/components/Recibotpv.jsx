import React from 'react'
import Moment from 'react-moment';
import { Table } from "reactstrap";
import writtenNumber from 'written-number'
export class Recibotpv extends React.PureComponent {
  render() {    
    const fechaHoy = new Date()
    const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
    return (
    <div className="invoice-recibo">

      <div className="dempresa">           
        <p><b>{this.props.empresa.nombre}</b></p>        
        <p>Calle: {this.props.empresa.direccion}</p>
        <p>Teléfono: {this.props.empresa.telefono}</p>  
      </div>  
      <h6 className="dfac">FACTURA ORIGINAL</h6>
      <div className="dfactura">                           
        <p>NIT: {this.props.empresa.nit}</p>
        <p>Factura Nº: {this.props.empresa.telefono}</p>  
        <p>Autorización: {this.props.empresa.telefono}</p>  
      </div>  

      <div className="dcliente">
        <p>FECHA: <Moment format="YYYY/MM/DD" >{ fechaHoy }</Moment></p>          
        <p>NIT/CI: {this.props.item.nits}</p>        
        <p>SR(A): {this.props.item.clients}</p>
      </div>    

      <div className="dconcepto">
        <Table className="table-recibo">                    
          <tbody>
            <tr>                                              
              <th width="5%">CANT.</th>
              <th width="55%">DESCRIPCION</th>
              <th width="20%">PRECIO</th>
              <th width="20%">TOTAL</th>                                                           
            </tr>  
              {this.props.items.map((item, index) => (
                  <tr key={item.articuloId}>                                              
                    <td>{item.cantidad}</td>
                    <td>{item.nombre}</td>                        
                    <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.valor)}</td>
                    <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(item.subTotal)}</td>
                  </tr>  
                ))}
          </tbody>          
        </Table>
        <Table className="table-recibo">                    
          <tbody>                              
            <tr>                                              
              <td width="75%">Sub-Total :</td>                                                  
              <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.item.subTotal)}</td>
            </tr>
            <tr>                                              
              <td width="75%">Impuesto :</td>                                                  
              <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.item.impuesto)}</td>
            </tr>
            <tr>                                              
              <td width="75%">Total :</td>                                                  
              <td>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.item.totalGeneral)}</td>
            </tr> 
            
         
          </tbody>          
        </Table>
      </div> 
    </div>
    );
  }
}

export default Recibotpv;
