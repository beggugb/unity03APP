const initialState = {
    data: [],
    items: [],    
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
      fecha:'',
      tipo:'contado',
      nroItems:0,
      total:0,
      motivo:'',
      estado:false,
      usuarioId:0,      
      usuario:{
        id:'',
        nombres:''
      },
      gestion:'',      
      totalGeneral:0,
      origen:'',
      destino:'',
      origenId:0,
      destinoId:0
    }    
  };
  
export function movimientos(state = initialState, action) {
    switch (action.type) {
       case "MOVIMIENTOS_INDICADOR":
        return {
          ...state,
          indicador: action.value,
          estado: action.estado,
          indicadorTotal: action.indicadorTotal
        };
       case "MOVIMIENTOS_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
        case "MOVIMIENTOS_VIEWS":
        return {
          ...state,
          modalViews: action.view
        };
       case "MOVIMIENTOS_SET_ART":
        return {
          ...state,
          artId: action.id
        };  
     
      case "MOVIMIENTOS_ADD":
        return {
          ...state,
          item: action.response.item,
          items: action.response.items,
          cantidadTotal: action.response.item.nroItems,
          sumaTotal: action.response.item.total          
        };
      case "MOVIMIENTOS_ITEM":
          return {
            ...state,
            item: action.response.item,
            items: action.response.items            
          };
      case "MOVIMIENTOS_ITEM_VIEWS":
          return {
            ...state,
            item: initialState.item,
            modalView: false
          };
      case "MOVIMIENTOS_ITEM_VIEW":
          return {
            ...state,
            item: action.response,
            modalView: true
          };          
      case "MOVIMIENTOS_LISTA":
            return {
              ...state,
              data: action.response
            }; 
            

      case "MOVIMIENTOS_DATA":
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
      
      case "MOVIMIENTOS_RESET_RESUMEN":
        return {
          ...state,
          item: initialState.item,
          items: [],
          nota: initialState.nota,
          plan: [],
          indicador: 0,
          estado:false,
          indicadorTotal: 0
         };
        
                
      case "MOVIMIENTOS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item,          
          indicador: 0,
          estado:false,
          indicadorTotal: 0
         };
      case "MOVIMIENTOS_RESET_DATA":
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
      case "MOVIMIENTOS_RESET":
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
      case "MOVIMIENTOS_SET_ITEMS":
          return {
            ...state,
            items: action.values,
            item:
            {...state.item,
              nroItems     : action.cantidad,
              subTotal     : action.subTotal,
              totalGeneral : action.totalGeneral,
              impuesto     : action.impuesto,
              totalDescuento : action.totalDescuento 
            }  
      };
      case "MOVIMIENTOS_RESET_PAGOS":
          return {
            ...state,
            items: [],
            item: initialState.item,
            cantidadTotal: 0,
            sumaTotal: 0
      };
      case "MOVIMIENTOS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };

      case "MOVIMIENTOS_CODIGO_BARRAS":                                 
          let newItem = action.response
          newItem.cantidad = 1
          newItem.subTotal = action.response.valor 
          let iok = state.items.filter(item => item.articuloId === action.response.articuloId)                                                                       
          return {
            ...state,                                                        
            items: iok.length > 0 ? [...state.items]: [...state.items, newItem],
            cantidadTotal: iok.length > 0 ? state.cantidadTotal : state.cantidadTotal + 1,
            sumaTotal: iok.length > 0 ? state.sumaTotal : parseInt(state.sumaTotal) + parseInt(action.response.valor)
      };
      case "MOVIMIENTOS_RESET_ITEMS":
        return {
          ...state,
          items: [],      
          plan: initialState.plan,
          nota: initialState.nota,              
          artId: -1
      }; 
      case "MOVIMIENTOS_DIRECTAS":
          return {
            ...state,
            modalView: false,
            items:[],
            item: initialState.item,
            cantidadTotal:0,
            sumaTotal:0
      };       
      
      default:
        return state;
    }
  }
  
