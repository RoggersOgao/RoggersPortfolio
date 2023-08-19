export const ProjectReducer = (state, action) => {
  switch (action?.type) {
    case "FETCH_PROJECT":
      return {
        ...state,
        projects: action.payload,
        isLoading: false,
      };
      case "ADD_SINGLE_PROJECT":
        return{
          ...state,
          projects:action.payload,
          isLoading:false
        }
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
        isLoading: false,
      };
    case "UPDATE_PROJECT":
      const updatedproject = state.projects.map((project) =>
        project.id === action.payload.id ? action.payload : project
      );

      return {
        ...state,
        projects: updatedproject,
        isLoading: false,
      };
    case "DELETE_PROJECT":
      const filteredprojects = state.projects.filter(
        (project) => project.id !== action.payload
      );
      return {
        ...state,
        projects: filteredprojects,
        isLoading: false,
      };

    case "CLEAR_PROJECT":
      return {
        ...state,
        projects: [],
        isLoading:false
      };
      case "IS_VISIBLE":
        return {
          ...state,
          isVisible: true,
          isLoading: false
        }      
      case "IS_NOT_VISIBLE":
        return{
          ...state,
          isVisible: false
        }
    default:
      return state;
  }
};
