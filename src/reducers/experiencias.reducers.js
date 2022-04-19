const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    item:{
        id:'',
        empresa: '',
        desde: '',
        hasta: '',
        ciudad: '',
        pais: '',
        motivo: '',
        contacto: '',
        telefono: '',
        personaId: 0
    },   
  };
  
export function experiencias(state = initialState, action) {
    switch (action.type) {
      case "EXPERIENCIAS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "EXPERIENCIAS_ADD":
        return {
          ...state,
          data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total,
            item: initialState.item
        };
      case "EXPERIENCIAS_ITEM":
          return {
            ...state,
            item: action.response
          };  
      case "EXPERIENCIAS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };
      case "EXPERIENCIAS_LISTA":
            return {
              ...state,
              data: action.response
            };                
      case "EXPERIENCIAS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };
      case "EXPERIENCIAS_RESET_DATA":
          return {
            ...state,
            data: [],
            pagina: 0,
            paginas: 0,
            total: 0,
            item: initialState.item
        };  
      default:
        return state;
    }
  }
  