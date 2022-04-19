const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    modalView: false,
    indicador:0,
    item:{      
        id:0,
        fechaRegistro: '',
        fechaCierre: '',
        codigo: "",
        tipo: "soporte",
        detalle: "",
        estado: "",   
        usuarioId:0,
        clienteId:0,
        clients:'' ,
        usuario:{
          id:'',
          nombres:''
        }        
    },
    items:[],
    ipagina: 0,
    ipaginas: 0,
    itotal: 0,    
  };
  
export function tickets(state = initialState, action) {
    switch (action.type) {      
        case "TICKETS_INDICADOR":
        return {
          ...state,
          indicador: action.value
        };
       case "TICKETS_VIEW":
        return {
          ...state,
          modalView: action.view
        }; 
        case "TICKETS_ITEM":
          return {
            ...state,
            item: action.response.ticket,
            items: action.response.items.data,
            ipagina: action.response.items.pagina,
            ipaginas: action.response.items.paginas
        };  
        case "TICKETS_ITEMS_ADD":
          return {
            ...state,
            items: action.response.data,
            ipagina: action.response.pagina,
            ipaginas: action.response.paginas            
        }; 
        case "TICKETS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
        }; 
        case "TICKETS_CHANGE":
          return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "TICKETS_ADD":
        return {
          ...state,
          item: action.response
        };       
      case "TICKETS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item,
          indicador: 0,
          items:[]
        };
      case "TICKETS_RESET":
        return {
          ...state,
          item: initialState.item,
          data: [],
          pagina: 0,
          paginas: 0,
          total: 0
        };  

      case "TICKETS_RESET_DATA":
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
  