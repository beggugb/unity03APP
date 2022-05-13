import React from "react";
import { Row,Col,Card, CardHeader, CardTitle } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faReceipt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const Contabilidad = () => {  
  let d = new Date()
  let gestion = d.getFullYear()
  const empresa = JSON.parse(localStorage.getItem('@userEmpresa'))
  const proveedores = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Flujo Efectivo : ' + gestion
  },
  credits: {
    enabled: false
},
  tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  accessibility: {
      point: {
          valueSuffix: '%'
      }
  },
  plotOptions: {
      pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
      }
  },
  series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
          name: 'Acumulado',
          y: 61.41,
          sliced: true,
          selected: true
      }, {
          name: 'Ingresos',
          y: 11.84
      }, {
          name: 'Gastos',
          y: 10.85
      }]
  }]
  }
  const capital = {
    chart: {
      type: 'column'
  },
  title: {
      text: 'Evolución de Capital'
  },
  subtitle: {
      text: 'Gestión ' + gestion
  },
  credits: {
    enabled: false
},
  xAxis: {
      type: 'category',
      labels: {
          rotation: -45,
          style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
          }
      }
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Cantidades'
      }
  },
  legend: {
      enabled: false
  },

  series: [{
      name: 'Cantidades',
      data: [
          ['Ene', 4.2],
          ['Feb', 7.8],
          ['Mar', 11.9],
          ['Abr', 3.7],
          ['May', 0],
          ['Jun', 0],   
          ['Jul', 0],   
          ['Ago', 0],   
          ['Sep', 0],   
          ['Oct', 0],   
          ['Nov', 0],   
          ['Dic', 0]   
      ],
      dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: '{point.y:.1f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
          }
      }
  }]
  }
  const gastos = {
    chart: {
      type: 'line'
  },
  title: {
      text: 'Ganancias vs Perdidas'
  },
  subtitle: {
      text: 'Gestion :' + gestion
  },
  credits: {
    enabled: false
},
  xAxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  },
  yAxis: {
      title: {
          text: 'Unidades '
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
  series: [{
      name: 'Ganancias',
      data: [7.0, 6.9, 10,15,0,0,0,0,0,0,0,0]
  }, {
      name: 'Perdidas',
      data: [3.9, 4.2, 3,7,0,0,0,0,0,0,0,0]
  }]
  }
  return(
    <div className="content">     
      <div className="main-contenido">               
      <Row className="mt-1">           
          <Col md={4}>
          <Card>
          <CardHeader>
            <div className="card-icono"><FontAwesomeIcon icon={faShoppingCart} /></div>
              <CardTitle className="text-dark"> INGRESOS TOTALES</CardTitle>
              <p>123</p>                                   
              </CardHeader>
          </Card>    
          </Col> 
          <Col md={4}>
          <Card>
          <CardHeader>
              <div className="card-icono"><FontAwesomeIcon icon={faReceipt} /></div>
              <CardTitle className="text-dark"> GASTOS TOTALES</CardTitle>
              <p>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(123456)}</p>                                    
              </CardHeader>
          </Card>    
          </Col> 
          <Col md={4}>
          <Card>
          <CardHeader>
            <div className="card-rojo"><FontAwesomeIcon icon={faDollarSign} /></div>
              <CardTitle className="text-dark mt-2"> <b></b> - BALANCE</CardTitle>              
              <p>{new Intl.NumberFormat('es-'+empresa.pais,{style: "currency",currency:empresa.moneda,minimumFractionDigits: 2}).format(4455)}</p>                                                                              </CardHeader>
          </Card>    
          </Col> 
        </Row>  

        <Row className="mt-1">
          <Col md={6}>
            <Card>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={proveedores}
                />
            </Card>    
          </Col>  
          <Col md={6}>
            <Card>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={capital}
                />
            </Card>    
          </Col>            
        </Row> 
        <Row className="mt-1">
          <Col md={12}>
            <Card>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={gastos}
                />
            </Card>                       
          </Col>            
        </Row> 
      </div>
    </div>    
  )

};
export default Contabilidad;
