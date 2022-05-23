import React,{useEffect} from "react";
import { Row,Col, Card, CardHeader, CardTitle } from "reactstrap"
import { useSelector, useDispatch } from 'react-redux'  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubMenu from '../../components/subConsolidado.jsx';
import { ConsolidadoRouter } from '../../routes'
import { faArrowDown, faArrowUp, faHandHoldingUsd, faDollarSign, faReceipt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { crudActions } from '../../actions'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const InicioView = () => {
  const dispatch = useDispatch()   
  const { resCompras, resVentas, yingresos, ysalidas, ppendientes, cpendientes, ventaT, compraT } = useSelector(state => state.informes)
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
    dispatch(crudActions.GET_INFORMES('INFORMES_DASHBOARD_VENTAS','salecons',iok))    
    dispatch(crudActions.GET_INFORMES('INFORMES_DASHBOARD_INVENTARIO','inventory',iok)) 
  }

  useEffect(() => {
    makeHttpRequestWithPage() //COMPRAS_INFORMES_RESET
    return () => {
      dispatch({type:'INFORMES_DASHBOARD_RESET_COMPRA'}) 
    };
  }, []);

  const compras = {

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
  const ventas = {

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

  const inventarios = {
    chart: {
      type: 'column'
  },
  title: {
      text: 'Movimiento de Inventario'
  },
  credits: {
    enabled: false
  },
  subtitle: {
      text: 'Gestion : ' + gestion
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
          text: 'Cantidad '
      }
  },
  plotOptions: {
      column: {
          pointPadding: 0.2,
          borderWidth: 0
      }
  },
  series: [{
      name: 'Ingresos',
      data: yingresos

  }, {
      name: 'Salidas',
      data: ysalidas

  }] 
  }

  return(
    <div className="content">     
      <div className="main-contenido">
      <SubMenu items={ConsolidadoRouter} prop='Inicio'/> 
        <Row className="mt-1">           
          <Col md={3}>
          <Card>
          <CardHeader>
            <div className="card-icono"><FontAwesomeIcon icon={faShoppingCart} /></div>
            <CardTitle className="text-dark mt-2"> SUMATORIA VENTAS</CardTitle>              
              <p>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(ventaT.suma)}</p>                                 
                                           
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
            <div className="card-rojo"><FontAwesomeIcon icon={faArrowUp} /></div>
              <CardTitle className="text-dark mt-2"> <b>{ppendientes.total || '0'}</b>  - CUENTAS X PAGAR</CardTitle>              
              <p>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(ppendientes.suma || '0')}</p>                                  
              </CardHeader>
          </Card>    
          </Col> 
          <Col md={3}>
          <Card>
          <CardHeader>
              <div className="card-verde"><FontAwesomeIcon icon={faArrowDown } /></div>
              <CardTitle className="text-dark mt-2"> <b>{cpendientes.total || '0'}</b> - CUENTAS X COBRAR</CardTitle>              
              <p>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(cpendientes.suma)}</p>                                 
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
                  options={ventas}
                />
            </Card>    
          </Col>            
        </Row> 
        <Row className="mt-1">
          <Col md={12}>
            <Card>
              <HighchartsReact
                highcharts={Highcharts}
                options={inventarios}
              />  
            </Card>                       
          </Col>            
        </Row>   
      </div>
    </div>    
  )

};
export default InicioView;
