const initialState = {
    todos: [],
    open: false,
    inputValue: "",
    descriptionValue: "",
    selectedTag: "",
    filterTag: "",
    editingIndex: null,
    hideDone: false,
  };
  
  const todosReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_OPEN':
        return { ...state, open: action.payload };
      case 'SET_TODOS':
        return { ...state, todos: action.payload };
      case 'SET_INPUT_VALUE':
        return { ...state, inputValue: action.payload };
      case 'SET_DESCRIPTION_VALUE':
        return { ...state, descriptionValue: action.payload };
      case 'SET_SELECTED_TAG':
        return { ...state, selectedTag: action.payload };
      case 'SET_FILTER_TAG':
        return { ...state, filterTag: action.payload };
      case 'SET_EDITING_INDEX':
        return { ...state, editingIndex: action.payload };
      case 'SET_HIDE_DONE':
        return { ...state, hideDone: !state.hideDone }; 
      default:
        return state;
    }
  };
  
  export default todosReducer;
  