const initialState = {
  data: [],
  pagina: 0,
  paginas: 0,
  total: 0,  
  modalView: false,
  indicador:0,
  estado: 'pendiente',
  indicadorTotal:0.00,
  indicadorCantidad:0,
  plan:[],
  items:[],
  pitems:[],
  nota:{},
  item:{
    id:'',      
    nro: '',
    proveedorId:0,
    proveedors:'',
    estado:false,
    formaPago:'contado',
    fechaEmision: '',
    fechaVencimiento:'',
    glosa:'',
    nroItems:0,
    nroPagos:0,
    total:0,
    proveedor:{
      id:'',
      razonSocial:''
    },
    usuario:{
      id:'',
      nombres:''
    },
    almacen:{
      id:'',
      nombre:''
    },
    gestion:'',    
    totalGeneral:0,    
    totalDescuento:0, 
    subTotal:0,
    iva:0,
    impuesto:0,
    descuento:0

  }   
};

export function compras(state = initialState, action) {
  switch (action.type) {   
    case "COMPRAS_INDICADOR":
        return {
          ...state,
          indicador: action.value,
          estado: action.estado,
          indicadorTotal: action.indicadorTotal,
          indicadorCantidad: action.cantidad
        }; 
    case "COMPRAS_PLAN_RESET":
      return {
        ...state,
        plan: []
    };
    case "COMPRAS_PLAN":
      return {
        ...state,
        plan: action.values
      };
     case "COMPRAS_VIEW":
      return {
        ...state,
        modalView: action.view
      }; 
      case "COMPRAS_ITEM":
        return {
          ...state,
          item: action.response.item,            
          items: action.response.items,
          nota: action.response.nota,
          plan: action.response.plan           

      };  
      case "COMPRAS_RESET_RESUMEN":
        return {
          ...state,
          item: initialState.item,
          items: [],
          nota: initialState.nota,
          plan: []
      }; 
      case "PEDIDOS_ITEM":
        return {
          ...state,
          item: action.response.item,            
          items: action.response.items,
          pitems: action.response.pitems
      };
      case "PEDIDOS_RESET_RESUMEN":
        return {
          ...state,
          item: initialState.item,            
          items: [],
          pitems: []
      };
      case "COMPRAS_DATA":
        return {
          ...state,
          data: action.response.data,
          pagina: action.response.pagina,
          paginas: action.response.paginas,
          total: action.response.total
      }; 
      case "COMPRAS_RESET_DATA":
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
      case "COMPRAS_CHANGE":
        return {          
        ...state,
        item:
        {...state.item,
          [action.props]: action.value
        }
      };
    case "COMPRAS_ADD":
      return {
        ...state,
        item: action.response.item,
        items: action.response.items
      };       
    case "COMPRAS_RESET_ITEM":
      return {
        ...state,
        item: initialState.item,
        indicador: 0,
        estado:false,
        indicadorTotal: 0,
        pitems: []
      };
    case "COMPRAS_RESET_ITEMS":
        return {
          ...state,
          items: [],
          nota: initialState.nota,
          plan: []
          
    };  
    case "COMPRAS_RESET":
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
      case "COMPRAS_ITEM_VIEWS":
          return {
            ...state,
            item: initialState.item,
            modalView: false
          };
      case "COMPRAS_ITEM_VIEW":
          return {
            ...state,
            item: action.response,
            modalView: true
          };          
      case "COMPRAS_LISTA":
            return {
              ...state,
              data: action.response
            };     

    
    case "COMPRAS_SET_ITEMS":
          return {
            ...state,
            items: action.values,
            item:
            {...state.item,
              nroItems     : action.cantidad,
              subTotal     : action.subTotal,
              totalGeneral : action.totalGeneral,
              totalDescuento : action.totalDescuento,
              impuesto     : action.impuesto 
            }
      };
    case "COMPRAS_SET_PROVEEDORES":
        return {
          ...state,
          pitems: action.values,
      }; 
      
    default:
      return state;
  }
}
