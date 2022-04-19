const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    item:{
        id:'',
        carrera: '',
        fecha: '',
        ciudad: '',
        pais: '',
        nivel: '',
        estado: '',
        institucion: '',
        personaId: 0      
    },   
  };
  
export function estudios(state = initialState, action) {
    switch (action.type) {
      case "ESTUDIOS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "ESTUDIOS_ADD":
        return {
          ...state,
          data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total,
            item: initialState.item
        };
      case "ESTUDIOS_ITEM":
          return {
            ...state,
            item: action.response
          };  
      case "ESTUDIOS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };
      case "ESTUDIOS_LISTA":
            return {
              ...state,
              data: action.response
            };                
      case "ESTUDIOS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };
      case "ESTUDIOS_RESET_DATA":
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
  