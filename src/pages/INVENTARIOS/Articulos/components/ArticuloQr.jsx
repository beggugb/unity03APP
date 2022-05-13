import React, { useRef, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col,Row,Button } from "reactstrap";
import ReactToPrint from "react-to-print";
import QRCode from "qrcode.react";

export class ComponentToPrint extends React.PureComponent {
  render() {    
    const etiquetas = [0,1]
    const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
    return (
      <>
    <div className="reporte">     
      <div className="invoice-box mt-3 mb-3">        
        <Row>
         <Col className="text-center">            
              <div className="clasificaciones">
                <Row>
                  <Col md="6" className="repIok">
                  {this.props.data.nv}
                  </Col>
                  <Col md="6" className="repIok">
                  {this.props.data.nm}
                  </Col>
                </Row>            
                <Row>
                  <Col md="6" className="repDesi">
                  {this.props.data.nombre}
                  </Col>
                  <Col md="6" className="repDesr">
                  <QRCode value={this.props.data.codigo} style={{  width: 50, height: 50,padding:2, border: 'solid 1px #c1c1c1', marginRight: 5 }}/>
                  </Col>
                </Row>                            
                <Row>
                  <Col md="6" className="repMax">
                    MAX: {this.props.data.sma}
                  </Col>
                  <Col md="6" className="repMax">
                    MIN: {this.props.data.smi}
                  </Col>
                </Row>            
              </div>
              <div className="clasificaciones">
                <Row>
                  <Col md="6" className="repIok">
                  {this.props.data.nv}
                  </Col>
                  <Col md="6" className="repIok">
                  {this.props.data.nm}
                  </Col>
                </Row>            
                <Row>
                  <Col md="6" className="repDesi">
                  {this.props.data.nombre}
                  </Col>
                  <Col md="6" className="repDesr">
                  <QRCode value={this.props.data.codigo} style={{  width: 50, height: 50,padding:2, border: 'solid 1px #c1c1c1', marginRight: 5 }}/>
                  </Col>
                </Row>                            
                <Row>
                  <Col md="6" className="repMax">
                    MAX: {this.props.data.sma}
                  </Col>
                  <Col md="6" className="repMax">
                    MIN: {this.props.data.smi}
                  </Col>
                </Row>            
              </div>
            
         </Col> 
        </Row>  

        <Row className="mt-5">
         <Col className="text-center">
            {etiquetas.map((tem,index) =>                
              <div key={index} className="barrasq">

                <div className="etiquetaq">                  
                  <div className="marki">                  
                  <QRCode value={this.props.data.codigo} style={{ width: 70, height: 70, padding:2, border: 'solid 1px #c1c1c1', marginRight: 5 }}/>
                  </div>                    
                  <div className="price">                    
                    {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.data.precioVenta)}
                  </div>
                </div>   
                <div className="etiquetaq">                  
                  <div className="marki">                  
                  <QRCode value={this.props.data.codigo} style={{ width: 70, height: 70, padding:2, border: 'solid 1px #c1c1c1', marginRight: 5 }}/>
                  </div>                    
                  <div className="price">                    
                    {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.data.precioVenta)}
                  </div>
                </div>
                <div className="etiquetaq">                  
                  <div className="marki">                  
                  <QRCode value={this.props.data.codigo} style={{ width: 70, height: 70, padding:2, border: 'solid 1px #c1c1c1', marginRight: 5 }}/>
                  </div>                    
                  <div className="price">                    
                    {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.data.precioVenta)}
                  </div>
                </div>
                <div className="etiquetaq">                  
                  <div className="marki">                  
                  <QRCode value={this.props.data.codigo} style={{ width: 70, height: 70, padding:2, border: 'solid 1px #c1c1c1', marginRight: 5 }}/>
                  </div>                    
                  <div className="price">                    
                    {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.data.precioVenta)}
                  </div>
                </div>
                <div className="etiquetaq">                  
                  <div className="marki">                  
                  <QRCode value={this.props.data.codigo} style={{ width: 70, height: 70, padding:2, border: 'solid 1px #c1c1c1', marginRight: 5 }}/>
                  </div>                    
                  <div className="price">                    
                    {new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(this.props.data.precioVenta)}
                  </div>
                </div>                       

              </div>
            )}
         </Col> 
        </Row>              
    </div>
    </div>   
    </> 
    );
  }
}


function ArticuloQr () {    
const dispatch = useDispatch()
const { item } = useSelector(state => state.articulos)
const componentRef = useRef();   

 useEffect(() =>{        
     return () =>{            
        dispatch({type:'ARTICULOS_RESET_ITEM'}) 
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
          data={item}
        />                
    </div>
     )
}


export default ArticuloQr