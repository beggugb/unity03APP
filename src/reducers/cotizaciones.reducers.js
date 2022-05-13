const initialState = {
    data: [],
    items: [],    
    pitems: [],
    artId: -1,
    pagina: 0,
    paginas: 0,
    total: 0,   
    modalView: false,
    modalViews: false,
    indicador:0,
    estado: 'pendiente',
    indicadorTotal:0,
    plan:[],
    nota:{},
    item:{
      id:'',      
      nro: '',
      fechaCotizacion:'',
      fechaVencimiento:'',      
      nroItems:'',      
      observaciones:'',
      estado:false,
      usuarioId:0,
      clienteId:0,
      clients:'',      
      usuario:{
        id:'',
        nombres:''
      },
      gestion:'',
      formaPago :'',
      formEntrega:'',
      descuento:0,
      totalDescuento:0,
      totalGeneral:0,
      cantidadTotal:0,
      subTotal:0,
      iva:0,
      impuesto:0,
      cliente:'',
      email:''      
    }    
  };
  
export function cotizaciones(state = initialState, action) {
    switch (action.type) {
       case "COTIZACIONES_INDICADOR":
        return {
          ...state,
          indicador: action.value,
          estado: action.estado,
          indicadorTotal: action.indicadorTotal,
          cliente: action.cliente,
          email: action.email
        };
       case "COTIZACIONES_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
        case "COTIZACIONES_VIEWS":
        return {
          ...state,
          modalViews: action.view
        };
       case "COTIZACIONES_SET_ART":
        return {
          ...state,
          artId: action.id
        };  
     
      case "COTIZACIONES_ADD":
        return {
          ...state,
          item: action.response.item,
          items: action.response.items        
        };
      case "COTIZACIONES_ITEM":
          return {
            ...state,
            item: action.response.item,
            items: action.response.items
          };
      case "COTIZACIONES_ITEM_VIEWS":
          return {
            ...state,
            item: initialState.item,
            modalView: false
          };
      case "COTIZACIONES_ITEM_VIEW":
          return {
            ...state,
            item: action.response,
            modalView: true
          };          
      case "COTIZACIONES_LISTA":
            return {
              ...state,
              data: action.response
            }; 
            

      case "COTIZACIONES_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total,
            indicador: 0,
            estado:false,
            indicadorTotal: 0
          };  
      case "COTIZACIONES_RESET_DATA":
          return {
            ...state,
            data: [],
            pagina: 0,
            paginas: 0,
            total: 0,
            indicador: 0,
            estado:false,
            indicadorTotal: 0
        };               
      case "COTIZACIONES_RESET_ITEM":
        return {
          ...state,
          item: initialState.item,          
          indicador: 0,
          estado:false,
          indicadorTotal: 0
         };
      case "COTIZACIONES_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0,
          indicador: 0,
          estado:false,
          indicadorTotal: 0
        };
      case "COTIZACIONES_SET_ITEMS":
          return {
            ...state,
            items: action.values,
            item:
            {...state.item,
              nroItems       : action.cantidad,
              subTotal       : action.subTotal,
              totalGeneral   : action.totalGeneral,
              impuesto       : action.impuesto,
              totalDescuento : action.totalDescuento
            }            
      };            
      case "COTIZACIONES_RESET_PAGOS":
          return {
            ...state,
            items: [],
            item: initialState.item,
            cantidadTotal: 0,
            sumaTotal: 0
      };
      case "COTIZACIONES_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "COTIZACIONES_CHANGEZ":
        return {          
            ...state,
            impuesto: action.sumas
      };  
    
      case "COTIZACIONES_RESET_ITEMS":
        return {
          ...state,
          items: [],
          cantidadTotal: 0,
          sumaTotal: 0, 
          artId: -1
      }; 
      case "COTIZACIONES_DIRECTAS":
          return {
            ...state,
            modalView: false,
            items:[],
            item: initialState.item,
            cantidadTotal:0,
            sumaTotal:0
      };   
        
      case "COMPRAS_SET_PROVEEDORES":
          return {
            ...state,
            pitems: action.values                  
      };  
      
      default:
        return state;
    }
  }
  
