const initialState = {
  fetch: {
    allDrivers: [],
    fetchDataLoading: false,
    fetchDataError: null,
  },
  search: {
    searchLoading: false,
    searchResults: [],
    searchError: null,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return {
        ...state,
        fetch: {
          ...state.fetch,
          fetchDataLoading: true,
          fetchDataError: null,
        },
      };

    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        fetch: {
          ...state.fetch,
          allDrivers: action.payload,
          fetchDataLoading: false,
          fetchDataError: null,
        },
      };

    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        fetch: {
          ...state.fetch,
          fetchDataLoading: false,
          fetchDataError: action.payload,
        },
      };

    case 'SEARCH_DRIVERS_REQUEST':
      return {
        ...state,
        search: {
          ...state.search,
          searchLoading: true,
          searchError: null,
        },
      };

    case 'SEARCH_DRIVERS_SUCCESS':
      return {
        ...state,
        search: {
          ...state.search,
          searchResults: action.payload,
          searchLoading: false,
          searchError: null,
        },
      };

    case 'SEARCH_DRIVERS_FAILURE':
      return {
        ...state,
        search: {
          ...state.search,
          searchLoading: false,
          searchError: action.payload,
        },
      };

    default:
      return state;
  }
};

export default rootReducer;