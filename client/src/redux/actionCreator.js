import axios from 'axios';

export const fetchData = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_DATA_REQUEST' });
    const response = await axios.get('http://localhost:5000/drivers');
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
    try {
      dispatch({ type: 'SEARCH_DRIVERS_REQUEST' });
      const response = await axios.get(`http://localhost:5000/drivers/name?query=${searchTerm}`);
      dispatch({ type: 'SEARCH_DRIVERS_SUCCESS', payload: response.data });
    } catch (error) {
      console.error('Error al buscar drivers:', error);
      dispatch({ type: 'SEARCH_DRIVERS_FAILURE', payload: 'Error al buscar drivers' });
    }
  };

  export const createDriver = (formData) => async (dispatch) => {
    try {
      dispatch({ type: 'CREATE_DRIVER_REQUEST' });
      const response = await axios.post('http://localhost:5000/drivers', formData);
      dispatch({ type: 'CREATE_DRIVER_SUCCESS', payload: response.data });
      dispatch(fetchData());
    } catch (error) {
      console.error('Error al crear conductor:', error);
      dispatch({ type: 'CREATE_DRIVER_FAILURE', payload: 'Error al crear conductor' });
    }
  };