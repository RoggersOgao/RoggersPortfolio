export const ProjectReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PROJECT":
      return {
        ...state,
        projects: action.payload,
        isLoading: true,
      };
    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
        isLoading: true,
      };
    case "UPDATE_PROJECT":
      const updatedproject = state.projects.map((project) =>
        project.id === action.payload.id ? action.payload : project
      );

      return {
        ...state,
        projects: updatedproject,
        isLoading: true,
      };
    case "DELETE_PROJECT":
      const filteredprojects = state.projects.filter(
        (project) => project.id !== action.payload
      );
      return {
        ...state,
        projects: filteredprojects,
        isLoading: true,
      };

    case "CLEAR_PROJECT":
      return {
        ...state,
        projects: [],
      };
    default:
      return state;
  }
};
