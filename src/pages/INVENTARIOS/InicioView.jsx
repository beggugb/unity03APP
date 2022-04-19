import React,{useEffect} from "react";
import { Row,Col, Card } from "reactstrap"
import { useSelector, useDispatch } from 'react-redux'  
import { crudActions } from '../../actions'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const InicioView = () => {
  const dispatch = useDispatch()   
  const { zporcentajes, zcantidades, yingresos, ysalidas, labelProductos, itemsMinimo, itemsActual } = useSelector(state => state.informes)
  const usuario = JSON.parse(localStorage.getItem('@userUnity'))
  let d = new Date()
  let gestion = d.getFullYear()
  
  const makeHttpRequestWithPage = () =>{
    let iok={
      "usuarioId":usuario.id,
      "rolId": usuario.rolId,
      "gestion": gestion
    }
    dispatch(crudActions.GET_INFORMES('INFORMES_DASHBOARD_INVENTARIO','inventory',iok))      
  }

  useEffect(() => {
    makeHttpRequestWithPage()
    return () => {
      dispatch({type:'INVENTARIOS_INFORMES_RESET'}) 
    };
  }, []);

 const ordenes = {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Rotación de Inventario (mínimo - actual)'
    },
    subtitle: {
        text: 'Gestión ' + gestion
    },
    xAxis: {
        categories: labelProductos,
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Stock ',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' cantidades'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Stock mínimo',
        data: itemsMinimo
    }, {
        name: 'Stock actual',
        data: itemsActual
    }]
  }

  const samples = {
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
  

  const existencias = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: '% en  Valor de Inventario'
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
      data: zporcentajes
  }]
  }

  const cantidades = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
  },
  title: {
      text: 'Σ en  Cantidad de Inventario'
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
      data: zcantidades
  }]
  }

  return(
    <div className="content">     
      <div className="main-contenido">
       

        <Row className="mt-1">
          <Col md={6}>
            <Card>
            <HighchartsReact
                  highcharts={Highcharts}
                  options={ordenes}
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
          <Col md={6}>
            <Card>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={cantidades}
                />
            </Card>                       
          </Col>    
          <Col md={6}>
            <Card>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={existencias}
                />
            </Card>                       
          </Col>            
        </Row>   
      </div>
    </div>    
  )

};
export default InicioView;
