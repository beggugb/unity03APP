const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    item:{
      id:'',
      nombre:''    
    },   
  };
  
export function cargos(state = initialState, action) {
    switch (action.type) {
      case "CARGOS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "CARGOS_ADD":
        return {
          ...state,
          data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total,
            item: initialState.item
        };
      case "CARGOS_ITEM":
          return {
            ...state,
            item: action.response
          };  
      case "CARGOS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };
      case "CARGOS_LISTA":
            return {
              ...state,
              data: action.response
            };                
      case "CARGOS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };
      case "CARGOS_RESET_DATA":
          return {
            ...state,
            data: [],
            pagina: 0,
            paginas: 0,
            total: 0
        };  
      default:
        return state;
    }
  }
  