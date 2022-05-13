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
  const {ventaT, ventasItem, ventasLabel, resVentas,cobrosPendientes, cobrosRealizados, cpendientes,crealizados } = useSelector(state => state.informes)
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
    dispatch(crudActions.GET_INFORMES('INFORMES_DASHBOARD_VENTAS','salecons',iok))      
  }

  useEffect(() => {
    makeHttpRequestWithPage()
    return () => {
      dispatch({type:'INFORMES_RESET'}) 
    };
  }, []);

  const ventas = {
    chart: {
      type: 'bar'
  },
  title: {
      text: 'Ventas x producto'
  },
  subtitle: {
      text: 'Gestión: '+ gestion
  },
  xAxis: {
      categories: ventasLabel,
      title: {
          text: null
      }
  },

 
  credits: {
      enabled: false
  },
  series: [{
      name: 'Ventas '+ gestion,
      data: ventasItem
    }]
  }

  const cobros = {
    chart: {
      type: 'column'
  },
  title: {
      text: 'Cobros'
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
          text: 'Expresado en  '+ empresa.moneda
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
      data: cobrosRealizados

  }, {
      name: 'Pendientes',
      data: cobrosPendientes

  }]
  }

  const samples = {

    chart: {
      type: 'line'
  },
  title: {
      text: 'Ventas x mes'
  },
  subtitle: {
      text: 'Gestión: '+ gestion
  },
  xAxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic']
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
      name: 'Ventas',
      data: resVentas
  } ]

  }

  return(
    <div className="content">     
      <div className="main-contenido">
        <Row className="mt-1">           
          <Col md={3}>
          <Card>
          <CardHeader>
            <div className="card-icono">
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
              <CardTitle className="text-dark mt-2"> Nº VENTAS</CardTitle>
              <p>{ventaT.total}</p>                                   
              </CardHeader>
          </Card>    
          </Col> 
          <Col md={3}>
          <Card>
          <CardHeader>
              <div className="card-icono"><FontAwesomeIcon icon={faReceipt} /></div>
              <CardTitle className="text-dark mt-2"> SUMATORIA VENTAS</CardTitle>              
              <p>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(ventaT.suma)}</p>                                 
              </CardHeader>
          </Card>    
          </Col> 

          <Col md={3}>
          <Card>
          <CardHeader>
            <div className="card-rojo"><FontAwesomeIcon icon={faDollarSign} /></div>
              <CardTitle className="text-dark mt-2"> <b>{cpendientes.total || '0'}</b> - COBROS PENDIENTES</CardTitle>              
              <p>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(cpendientes.suma)}</p>                                 
              </CardHeader>
          </Card>    
          </Col> 
          <Col md={3}>
          <Card>
          <CardHeader>
              <div className="card-verde"><FontAwesomeIcon icon={faHandHoldingUsd} /></div>
              <CardTitle className="text-dark mt-2"> <b>{crealizados.total || '0'}</b> - COBROS REALIZADOS</CardTitle>
              <p>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(crealizados.suma)}</p>                                                                  
              </CardHeader>
          </Card>    
          </Col>
          
        </Row>  

        <Row className="mt-1">
          <Col md={6}>
            <Card>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={ventas}
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
                  options={cobros}
                />
            </Card>                       
          </Col>            
        </Row>   
      </div>
    </div>    
  )

};
export default InicioView;
