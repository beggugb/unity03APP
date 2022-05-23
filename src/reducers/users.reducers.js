const initialState = {
    data: [],
    pagina: 0,
    paginas: 0,
    total: 0,
    item:{
      id:'',
      nombres:'',
      username:'',
      password: '',
      estado: true,
      rolId: 1,
      almacenId: 2,
      isCajero: false,
      numCaja:0
    },   
    modulos:[]
  };
  
export function users(state = initialState, action) {
    switch (action.type) {
      case "USUARIOS_CHANGE":
        return {          
          ...state,
          item:
          {...state.item,
            [action.props]: action.value
          }
        };
      case "USUARIOS_ADD":
        return {
          ...state,
            data: action.response.usuarios.data,
            pagina: action.response.usuarios.pagina,
            paginas: action.response.usuarios.paginas,
            total: action.response.usuarios.total,
            item: initialState.item            
        };
      case "USUARIOS_ITEM":
          return {
            ...state,
            item: action.response

          };  
      case "USUARIOS_DATA":
          return {
            ...state,
            data: action.response.data,
            pagina: action.response.pagina,
            paginas: action.response.paginas,
            total: action.response.total
          };
      case "USUARIOS_LISTA":
            return {
              ...state,
              data: action.response
            };                
      case "USUARIOS_RESET_ITEM":
        return {
          ...state,
          item: initialState.item         
        };
      case "USUARIOS_RESET_DATA":
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
  