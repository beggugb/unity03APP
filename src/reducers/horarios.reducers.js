const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    item:{
      id:'',
      nombre:'',
      d1:'',
      d2:'',
      d3:'',
      d4:''
    },   
  };
  
export function horarios(state = initialState, action) {
    switch (action.type) {
      case "HORARIOS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "HORARIOS_ADD":
        return {
          ...state,
          data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total,
            item: initialState.item
        };
      case "HORARIOS_ITEM":
          return {
            ...state,
            item: action.response
          };  
      case "HORARIOS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };
      case "HORARIOS_LISTA":
            return {
              ...state,
              data: action.response
            };                
      case "HORARIOS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };
      case "HORARIOS_RESET_DATA":
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
  