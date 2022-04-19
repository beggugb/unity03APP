const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    item:{
      id:'',
      nombre:'',
      monto:0,
      montoHora:0,
      montoMinuto:0
    },   
  };
  
export function salarios(state = initialState, action) {
    switch (action.type) {
      case "SALARIOS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "SALARIOS_ADD":
        return {
          ...state,
          data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total,
            item: initialState.item
        };
      case "SALARIOS_ITEM":
          return {
            ...state,
            item: action.response
          };  
      case "SALARIOS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };
      case "SALARIOS_LISTA":
            return {
              ...state,
              data: action.response
            };                
      case "SALARIOS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };
      case "SALARIOS_RESET_DATA":
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
  