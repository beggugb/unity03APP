import React,{useEffect} from "react";
import { Row,Col, Card, CardHeader, CardTitle } from "reactstrap"
import { useSelector, useDispatch } from 'react-redux'  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandHoldingUsd, faDollarSign, faReceipt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { crudActions } from '../../actions'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const InicioView = () => {
  const dispatch = useDispatch()   
  const {compraT, comprasItem, comprasLabel, resCompras,pagosPendientes, pagosRealizados,prealizados, ppendientes } = useSelector(state => state.informes)
  const usuario = JSON.parse(localStorage.getItem('@userUnity'))
  const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
  let d = new Date()
  let gestion = d.getFullYear()
  
  const makeHttpRequestWithPage = () =>{
    let iok={
      "usuarioId":usuario.id,
      "rolId": usuario.rolId,
      "gestion": gestion
    }
    dispatch(crudActions.GET_INFORMES('INFORMES_DASHBOARD_COMPRA','buycons',iok))      
  }

  useEffect(() => {
    makeHttpRequestWithPage() //COMPRAS_INFORMES_RESET
    return () => {
      dispatch({type:'INFORMES_DASHBOARD_RESET_COMPRA'}) 
    };
  }, []);

  const compras = {
    chart: {
      type: 'bar'
  },
  title: {
      text: 'Compras x producto'
  },
  subtitle: {
      text: 'Gestión: '+ gestion
  },
  xAxis: {
      categories: comprasLabel,
      title: {
          text: null
      }
  },

 
  credits: {
      enabled: false
  },
  series: [{
      name: 'Compras 2020',
      data: comprasItem
    }]
  }

  const pagos = {
    chart: {
      type: 'column'
  },
  title: {
      text: 'Pagos'
  },
  subtitle: {
    text: 'Gestión: '+ gestion
  },
  credits: {
    enabled: false
  },
  xAxis: {
      categories: [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic'
      ],
      crosshair: true
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Expresado en  '+ '('+ empresa.moneda+')'
      }
  },

  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
  },
  series: [{
      name: 'Realizados',
      data: pagosRealizados

  }, {
      name: 'Pendientes',
      data: pagosPendientes

  }]
  }

  const samples = {

    chart: {
      type: 'line'
  },
  title: {
      text: 'Compras x mes'
  },
  subtitle: {
      text: 'Gestión: '+ gestion
  },
  xAxis: {
      categories: ['Ean', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic']
  },
  yAxis: {
      title: {
          text: 'Expresado en Cantidades'
      }
  },
  plotOptions: {
      line: {
          dataLabels: {
              enabled: true
          },
          enableMouseTracking: false
      }
  },
  credits: {
    enabled: false
  },
  series: [{
      name: 'Compras',
      data: resCompras
  } ]

  }

  return(
    <div className="content">     
      <div className="main-contenido">
        <Row className="mt-1">           
          <Col md={3}>
          <Card>
          <CardHeader>
            <div className="card-icono"><FontAwesomeIcon icon={faShoppingCart} /></div>
              <CardTitle className="text-dark mt-2"> Nº COMPRAS</CardTitle>
              <p>{compraT.total}</p>                                   
              </CardHeader>
          </Card>    
          </Col> 
          <Col md={3}>
          <Card>
          <CardHeader>
              <div className="card-icono"><FontAwesomeIcon icon={faReceipt} /></div>
              <CardTitle className="text-dark mt-2"> SUMATORIA COMPRAS</CardTitle>
              <p>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(compraT.suma)}</p>                                    
              </CardHeader>
          </Card>    
          </Col> 
          <Col md={3}>
          <Card>
          <CardHeader>
            <div className="card-rojo"><FontAwesomeIcon icon={faDollarSign} /></div>
              <CardTitle className="text-dark mt-2"> <b>{ppendientes.total || '0'}</b> - PAGOS PENDIENTES</CardTitle>              
              <p>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(ppendientes.suma || '0')}</p>                                  
              </CardHeader>
          </Card>    
          </Col> 
          <Col md={3}>
          <Card>
          <CardHeader>
              <div className="card-verde"><FontAwesomeIcon icon={faHandHoldingUsd} /></div>
              <CardTitle className="text-dark mt-2"> <b>{prealizados.total || '0'}</b> - PAGOS REALIZADOS</CardTitle>
              <p>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(prealizados.suma || '0')}</p>                                    
              </CardHeader>
          </Card>    
          </Col>
          
        </Row>  

        <Row className="mt-1">
          <Col md={6}>
            <Card>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={compras}
                />
            </Card>    
          </Col>  
          <Col md={6}>
            <Card>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={samples}
                />
            </Card>    
          </Col>            
        </Row> 
        <Row className="mt-1">
          <Col md={12}>
            <Card>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={pagos}
                />
            </Card>                       
          </Col>            
        </Row>   
      </div>
    </div>    
  )

};
export default InicioView;
