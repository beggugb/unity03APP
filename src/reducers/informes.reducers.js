const initialState = {    
  /**Compras */
    compraT: {
      total: 0,
      suma: 0
    },     
    comprasLabel:[],    
    comprasItem:[],    
    resCompras:[],
    pagosPendientes:[],     
    pagosRealizados:[],
    cajas:[],
    compras:[],
    montoTotal: 0,
    pagoTotal: 0,
    saldoTotal: 0,
  /**Pagos */  
    pagos:[],
  /**Ventas */  
  ventaT: {
    total: 0,
    suma: 0
  },     
  ventasLabel:[],    
  ventasItem:[],    
  resVentas:[],
  cobrosPendientes:[],     
  cobrosRealizados:[],
  ventas:[],  
  cobroTotal: 0,
  prealizados: {
    total: 0,
    suma: 0
  },
  ppendientes: {
    total: 0,
    suma: 0
  },  
  crealizados: {
    total: 0,
    suma: 0
  },
  cpendientes: {
    total: 0,
    suma: 0
  },
  cobros:[],
  /**Cobros */

  /**Clientes */
  clienteT: 0,
  cotizacionT: {
    total: 0,
    suma: 0
  },
  prospectoT: {
    total: 0
  },
  ticketT: {
    total: 0
  },
  clientes:[],
  cotizaciones:[],
  tickets:[],
  prospectos:[],
  total:0,
  movimientos:[],
  zporcentajes:[],
  zcantidades:[],
  yingresos:[],
  ysalidas:[],
  labelProductos:[],
  itemsMinimo:[],
  itemsActual:[],
  sumaTotal:0,
  cantidadTotal: 0,
  montoTotal:0,
  montoIngresol:0,
  montoEgreso:0
  };
  
export function informes(state = initialState, action) {
    switch (action.type) {            
      case "INFORMES_MOVIMIENTOS":
        return {          
          ...state,          
          movimientos: action.response.data,          
          cantidadTotal: action.response.total
        };
      case "INFORMES_CLIENTES_RANGOS":
        return {          
          ...state,          
          clientes: action.response.data,
          total: action.response.total
        };
      case "INFORMES_COTIZACIONES_RANGOS":
          return {          
            ...state,          
            cotizaciones: action.response.data,
            total: action.response.total
          };
          
      case "INFORMES_TICKETS_RANGOS":
        return {          
          ...state,          
          tickets: action.response.data,
          total: action.response.total
        };

      case "INFORMES_PROSPECTOS_RANGOS":
        return {          
          ...state,          
          prospectos: action.response.data,
          total: action.response.total
        };        

      case "INFORMES_DASHBOARD_INVENTARIO":
        return {          
          ...state,          
          zporcentajes: action.response.zporcentajes,
          zcantidades: action.response.zcantidades,
          yingresos: action.response.yingresos,
          ysalidas: action.response.ysalidas,
          labelProductos: action.response.labelProductos,
          itemsMinimo: action.response.itemsMinimo,
          itemsActual: action.response.itemsActual

      };  
      case "INFORMES_DASHBOARD_CLIENTE":
        return {          
          ...state,          
          clienteT: action.response.clienteT,          
          cotizacionT: action.response.cotizacionT,
          prospectoT: action.response.prospectoT,          
          ticketT: action.response.ticketT
      };       
      case "INFORMES_RESET_CLIENTE":
        return {          
          ...state,          
          clienteT: initialState.clienteT,
          cotizacionT: initialState.cotizacionT,
          prospectoT: initialState.prospectoT,
          ticketT: initialState.ticketT
      };
      
      case "INFORMES_DASHBOARD_COMPRA":
        return {          
          ...state,          
          compraT: action.response.compraT,          
          comprasLabel: action.response.comprasLabel,
          comprasItem: action.response.comprasItem,          
          resCompras: action.response.resCompras,
          pagosPendientes:action.response.pendientes,          
          pagosRealizados:action.response.realizados,
          prealizados: action.response.prealizados,               
          ppendientes: action.response.ppendientes

        };
      case "INFORMES_DASHBOARD_RESET_COMPRA":
          return {
            ...state,
            compraT: initialState.compraT,
            comprasItem: [],
            comprasLabel: [],
            resCompras: [],
            pagosPendientes: [],
            pagosRealizados: [],
            prealizados: initialState.prealizados,
            ppendientes: initialState.ppendientes
      }   
      case "INFORMES_COMPRAS_RANGOS":
        return {          
            ...state,
            compras: action.response.data,              
            total: action.response.total,
            montoTotal: action.response.montoTotal,
            pagoTotal: action.response.pagoTotal,
            saldoTotal: action.response.saldoTotal
        };
      case "INFORMES_COMPRA_PAGOS":
          return {          
            ...state,
            pagos: action.response.data,              
            total: action.response.total,
            montoTotal: action.response.montoTotal
        };    
      case "INFORMES_DASHBOARD_VENTAS":
          return {          
            ...state,          
            ventaT: action.response.ventaT,          
            ventasLabel: action.response.ventasLabel,
            ventasItem: action.response.ventasItem,          
            resVentas: action.response.resVentas,
            cobrosPendientes:action.response.pendientes,          
            cobrosRealizados:action.response.realizados,
            crealizados: action.response.crealizados,               
            cpendientes: action.response.cpendientes
  
          };
      case "INFORMES_VENTAS_RANGOS":
          return {          
              ...state,
              ventas: action.response.data,              
              total: action.response.total,
              montoTotal: action.response.montoTotal,
              pagoTotal: action.response.pagoTotal,
              saldoTotal: action.response.saldoTotal
          };  
      case "INFORMES_VENTA_COBROS":
            return {          
              ...state,
              cobros: action.response.data,              
              total: action.response.total,
              montoTotal: action.response.montoTotal
        };     
      case "INFORME_SET_USUARIO_ID":
          return {
            ...state,
            usuarioId: action.usuarioId,
            labelUsuario: action.labelUsuario
          };    
      case "INFORME_SET_ARTICULO_ID":
        return {
          ...state,
          articuloId: action.articuloId,
          labelArticulo: action.labelArticulo
        };
      case "INFORME_SET_ALMACEN_ID":
          return {
            ...state,
            almacenId: action.almacenId,
            labelAlmacen: action.labelAlmacen
          }; 
          case "INFORME_SET_CATEGORIA_ID":
            return {
              ...state,
              categoriaId: action.categoriaId,
              labelCategoria: action.labelCategoria
            };    
     
            
      
        case "INFORMES_EXISTENCIAS":
              return {          
                ...state,                
                existencias: action.response.data,
                total: action.response.total,
                suma: action.response.suma,
                saldo: action.response.saldo
              }; 
        case "INFORMES_CAJAS":
              return {          
                ...state,                
                cajas: action.response.data,
                total: action.response.total,
                montoTotal: action.response.suma,
                montoEgreso: action.response.egreso,
                montoIngreso: action.response.ingreso
              };       
        case "INFORMES_CATEGORIAS":
              return {          
                ...state,                
                categorias: action.response.data,
                categoriasDetalle : action.response.detalle
             };            
      case "INFORMES_VENTAS":
        return {          
          ...state,
          detalle: action.response.detalle,
          libros: action.response.data,
          total: action.response.data.total
        };               
      case "INFORMES_CONSOLIDADO":
        return {          
          ...state,
          detalle: action.response.detalle,
          consolidado: action.response.data,
          total: action.response.data.total
        };      

     case "INFORMES_RESET":
        return {
          ...state,                             
          consolidado:[],
          clientes:[],
          compras:[],
          cobros:[],
          cotizaciones:[],
          cobrosPendientes: initialState.cobrosPendientes,
          cobrosRealizados: initialState.cobrosRealizados, 
          cpendientes : initialState.cpendientes,
          crealizados : initialState.crealizados,
          cantidadTotal: 0,
          desde:'2021-01-01',
          detalle:0,        
          existencias:[],  
          hasta:'2021-12-01',          
          libros: [], 
          labelCategoria:[],
          labelAlmacen:[],
          labelArticulo:[],
          movimientos:[],                    
          prospectos:[],          
          pagos:[],          
          pagoTotal:0,
          pagina: 0,
          paginas: 0,                                   
          total: 0,
          tickets:[],          
          resVentas: initialState.resVentas,
          sumaTotal:0,          
          saldoTotal:0,
          suma:0,
          saldo:0,          
          ventaT :initialState.ventaT, 
          ventasItem: [], 
          ventasLabel: [], 
          ventas: [],
          montoTotal:0,
          montoIngresol:0,
          montoEgreso:0,
          cajas: []          
        }; 
      
      case "INVENTARIOS_INFORMES_RESET":
        return {
          ...state,
          zporcentajes:[],
          zcantidades:[],
          yingresos:[],
          ysalidas:[],
          labelProductos:[],
          itemsMinimo:[],
          itemsActual:[]
        }
        
      case "INFORMES_COTIZACIONES_RESET":
        return {
            ...state,
            total:0,
            cotizaciones:[]
      }  
      case "INFORMES_PROMOCIONES_RESET":
        return {
            ...state,
            total:0,
            prospectos:[]
      }
      case "INFORMES_TICKETS_RESET":
        return {
            ...state,
            total:0,
            tickets:[]
      }

      
      case "VENTAS_INFORMES_RESET":
          return {
          ...state,
          ventaT: initialState.ventaT,
          ventasItem:[],
          ventasLabel:[],
          resVentas:[],
          cobrosPendientes:[],
          cobrosRealizados:[],
          cpendientes: initialState.cpendientes,
          crealizados: initialState.crealizados
        }   
      case "INFORMES_COMPRAS_RESET":
        return {
         ...state,
         compras: [],
         montoTotal: 0,
         pagoTotal: 0,
         saldoTotal: 0,        
         total: 0
        }  
      case "INFORMES_PAGOS_RESET":
        return {
           ...state,
           pagos:[],
           montoTotal: 0,
           pagoTotal: 0,
           saldoTotal: 0,        
           total: 0
        }    
      default:
        return state;
    }
  }
  