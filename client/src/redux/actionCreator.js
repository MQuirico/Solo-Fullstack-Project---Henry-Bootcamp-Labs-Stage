import axios from 'axios';

export const fetchData = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_DATA_REQUEST' });
    const response = await axios.get('https://driversbackend-py4r.onrender.com/drivers');
    dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error al cargar datos:', error);

    if (error.response) {
      const statusCode = error.response.status;

      if (statusCode === 404) {
        dispatch({ type: 'FETCH_DATA_NOT_FOUND', payload: 'Recursos no encontrados' });
      } else {
        dispatch({ type: 'FETCH_DATA_FAILURE', payload: `Error del servidor: ${statusCode}` });
      }
    } else if (error.request) {
      dispatch({ type: 'FETCH_DATA_FAILURE', payload: 'No se recibió respuesta del servidor' });
    } else {
      dispatch({ type: 'FETCH_DATA_FAILURE', payload: 'Error al configurar la solicitud' });
    }
  }
};

export const searchDrivers = (searchTerm) => async (dispatch) => {
  console.log(searchTerm)
  try {
    dispatch({ type: 'SEARCH_DRIVERS_REQUEST' });
    const response = await axios.get(`https://driversbackend-py4r.onrender.com/drivers/name?name=${searchTerm}`);
    dispatch({ type: 'SEARCH_DRIVERS_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error while searching drivers:', error);
    dispatch({ type: 'SEARCH_DRIVERS_FAILURE', payload: 'Error al buscar los drivers' });
  }
};

  export const createDriver = (formData) => async (dispatch) => {
    try {
      dispatch({ type: 'CREATE_DRIVER_REQUEST' });
      const response = await axios.post('https://driversbackend-py4r.onrender.com/drivers', formData);
      dispatch({ type: 'CREATE_DRIVER_SUCCESS', payload: response.data.driver });
      dispatch(fetchData());
    } catch (error) {
      console.error('Error al crear conductor:', error);
      dispatch({ type: 'CREATE_DRIVER_FAILURE', payload: 'Error al crear conductor' });
    }
  };

  export const collectTeams = () => async (dispatch) => {
    try {
      dispatch({ type: 'COLLECT_TEAMS_REQUEST' });
      const response = await axios.get('https://driversbackend-py4r.onrender.com/drivers');
      dispatch({ type: 'COLLECT_TEAMS_SUCCESS', payload: response.data });
      const teamsSet = new Set();
      response.data.forEach(driver => {
        if (driver.teams) {
          const teamsArray = driver.teams.split(',').map(team => team.trim());
          teamsArray.forEach(team => teamsSet.add(team));
        }
      });
      const uniqueTeams = Array.from(teamsSet);
      dispatch({ type: 'COLLECT_TEAMS_SUCCESS', payload: uniqueTeams });
    } catch (error) {
      console.error('Error al cargar datos:', error);
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 404) {
          dispatch({ type: 'COLLECT_TEAMS_NOT_FOUND', payload: 'Recursos no encontrados' });
        } else {
          dispatch({ type: 'COLLECT_TEAMS_FAILURE', payload: `Error del servidor: ${statusCode}` });
        }
      } else if (error.request) {
        dispatch({ type: 'COLLECT_TEAMS_FAILURE', payload: 'No se recibió respuesta del servidor' });
      } else {
        dispatch({ type: 'COLLECT_TEAMS_FAILURE', payload: 'Error al configurar la solicitud' });
      }
    }
  };

  export const fetchDriver = (id) => async (dispatch) => {
    try {
      const response = await axios.get(`https://driversbackend-py4r.onrender.com/drivers/${id}`);
      dispatch({ type: 'FETCH_DRIVER', payload: response.data });
    } catch (error) {
      console.error('Error al obtener Driver:', error);
    }
  };