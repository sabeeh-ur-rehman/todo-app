// const initialState = {
//     todos: [],
//     open: false,
//     inputValue: "",
//     descriptionValue: "",
//     selectedTag: "",
//     filterTag: "",
//     editingIndex: null,
//     hideDone: false,
//   };
  
//   const todosReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'SET_OPEN':
//         return { ...state, open: action.payload };
//       case 'SET_TODOS':
//         return { ...state, todos: action.payload };
//       case 'SET_INPUT_VALUE':
//         return { ...state, inputValue: action.payload };
//       case 'SET_DESCRIPTION_VALUE':
//         return { ...state, descriptionValue: action.payload };
//       case 'SET_SELECTED_TAG':
//         return { ...state, selectedTag: action.payload };
//       case 'SET_FILTER_TAG':
//         return { ...state, filterTag: action.payload };
//       case 'SET_EDITING_INDEX':
//         return { ...state, editingIndex: action.payload };
//       case 'SET_HIDE_DONE':
//         return { ...state, hideDone: !state.hideDone }; 
//       default:
//         return state;
//     }
//   };
  
//   export default todosReducer;
  


const loadTodos = () => {
  try {
    const serializedTodos = localStorage.getItem("todos");
    if (serializedTodos === null) {
      return [];
    }
    return JSON.parse(serializedTodos);
  } catch (err) {
    console.error("Could not load todos from localStorage", err);
    return [];
  }
};

const saveTodos = (todos) => {
  try {
    const serializedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", serializedTodos);
  } catch (err) {
    console.error("Could not save todos to localStorage", err);
  }
};

const initialState = {
  todos: loadTodos(),
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
      const updatedState = { ...state, todos: action.payload };
      saveTodos(updatedState.todos);
      return updatedState;
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
