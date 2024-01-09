
const initialState = {
  fetch: {
    allDrivers: [],
    fetchDataLoading: false,
    fetchDataError: null,
  },
  search: {
    searchLoading: false,
    searchResults: [],
    preSearch: [],
    searchError: null,
  },
  createDriver: {
    loading: false,
    error: null,
  },
  collectTeams: {
    data: [],
    teams: [],
    loading: false,
    error: null,
  },
  driver: {
    data: {},
    loading: false,
    error: null,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return {
        ...state,
        fetch: { ...state.fetch, fetchDataLoading: true, fetchDataError: null },
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        fetch: { ...state.fetch, allDrivers: action.payload, fetchDataLoading: false, fetchDataError: null },
      };
    case 'FETCH_DATA_NOT_FOUND':
    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        fetch: { ...state.fetch, fetchDataLoading: false, fetchDataError: action.payload },
      };

    case 'SEARCH_DRIVERS_REQUEST':
      return {
        ...state,
        search: { ...state.search, searchLoading: true, searchError: null },
      };
    case 'SEARCH_DRIVERS_SUCCESS':
      return {
        ...state,
        search: { ...state.search, searchResults: action.payload, searchLoading: false, searchError: null },
      };
    case 'SEARCH_DRIVERS_FAILURE':
      return {
        ...state,
        search: { ...state.search, searchLoading: false, searchError: action.payload },
      };

    case 'CREATE_DRIVER_REQUEST':
      return {
        ...state,
        createDriver: { ...state.createDriver, loading: true, error: null },
      };
    case 'CREATE_DRIVER_SUCCESS':
      return {
        ...state,
        createDriver: { ...state.createDriver, loading: false, error: null },
      };
    case 'CREATE_DRIVER_FAILURE':
      return {
        ...state,
        createDriver: { ...state.createDriver, loading: false, error: action.payload },
      };

    case 'COLLECT_TEAMS_REQUEST':
      return {
        ...state,
        collectTeams: { ...state.collectTeams, loading: true, error: null },
      };
    case 'COLLECT_TEAMS_SUCCESS':
      const teamsSet = new Set();
      action.payload.forEach(driver => {
        if (driver.teams) {
          const teamsArray = driver.teams.split(',').map(team => team.trim());
          teamsArray.forEach(team => teamsSet.add(team));
        }
      });
      const uniqueTeams = Array.from(teamsSet);
      return {
        ...state,
        collectTeams: { ...state.collectTeams, data: action.payload, teams: uniqueTeams, loading: false, error: null },
      };
    case 'COLLECT_TEAMS_NOT_FOUND':
    case 'COLLECT_TEAMS_FAILURE':
      return {
        ...state,
        collectTeams: { ...state.collectTeams, loading: false, error: action.payload },
      };

    case 'FETCH_DRIVER':
      return {
        ...state,
        driver: { ...state.driver, data: action.payload, loading: false, error: null },
      };
console.log("State:", state);
console.log("Action:", action);
    default:
      return state;
  }
};

export default rootReducer;