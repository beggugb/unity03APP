const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    item:{
      id:'',
      nombre:'',
      codigo:''
    },   
  };
  
export function unidades(state = initialState, action) {
    switch (action.type) {
      case "UNIDADES_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "UNIDADES_ADD":
        return {
          ...state,
          data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total,
            item: initialState.item
        };
      case "UNIDADES_ITEM":
          return {
            ...state,
            item: action.response
          };  
      case "UNIDADES_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };
      case "UNIDADES_LISTA":
            return {
              ...state,
              data: action.response
            };                
      case "UNIDADES_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };
      case "UNIDADES_RESET_DATA":
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
  