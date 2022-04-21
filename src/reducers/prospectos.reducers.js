const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    modalView: false,
    indicador:0,
    item:{      
        id:0,
        fecha: '',
        nombre:'',
        tipo:'',
        vencimiento:'',
        nivel:0,
        estado:false,
        observaciones:'',
        resultado:0,
        medidas:0,
        articuloId:0,
        formaPago :'',
        formEntrega:''
    },
    items:[],
    ipagina: 0,
    ipaginas: 0,
    itotal: 0,    
  };
  
export function prospectos(state = initialState, action) {
    switch (action.type) {      
        case "PROSPECTOS_INDICADOR":
        return {
          ...state,
          indicador: action.value
        };
       case "PROSPECTOS_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
        case "PROSPECTOS_ITEM":
          return {
            ...state,
            item: action.response.item,
            items: action.response.items
        };  
        case "PROSPECTOS_ITEMS_ADD":
          return {
            ...state,
            item: action.response.item,
            items: action.response.items
        }; 
        case "PROSPECTOS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
        }; 
        case "PROSPECTOS_CHANGE":
          return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "PROSPECTOS_ADD":
        return {
          ...state,
          item: action.response
        };       
      case "PROSPECTOS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item,
          indicador: 0,
          items:[]
        };       
      case "PROSPECTOS_RESET_ITEMS":
        return {
          ...state,
          item: initialState.item,       
          indicador: 0,
          items:[]
        };
      case "PROSPECTOS_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0
        };  

      case "PROSPECTOS_RESET_DATA":
          return {
            ...state,            
            data: [],            
            pagina: 0,
            paginas: 0,
            total: 0,
            indicador:0
          };  
        
      default:
        return state;
    }
  }
  