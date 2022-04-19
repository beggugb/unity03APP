import React, { useRef, useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Barcode from 'react-barcode'
import { Col, Row, Button } from "reactstrap";
import ReactToPrint from "react-to-print";

export class ComponentToPrint extends React.PureComponent {
  render() {    
    const etiquetas = [0,1,2,3]
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
                  <Barcode value={this.props.data.codigoBarras} width={1} height={15} fontSize={11} />
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
                  <Barcode value={this.props.data.codigoBarras} width={1} height={15} fontSize={11} />
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

        <Row>
         <Col className="text-center">
            {etiquetas.map((tem,index) =>                
              <div key={index} className="barras">
                <div className="etiquetabr">
                <Barcode value={this.props.data.codigoBarras} width={1} height={20} fontSize={11} />
                </div>
                <div className="etiquetabr">
                <Barcode value={this.props.data.codigoBarras} width={1} height={20} fontSize={11} />
                </div>
                <div className="etiquetabr">
                <Barcode value={this.props.data.codigoBarras} width={1} height={20} fontSize={11} />
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


function ArticuloEtiquetas () {    
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


export default ArticuloEtiquetas