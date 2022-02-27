export function handleResponse(response) {

    if (response.status != 200) {
      return {
        error: true,
        message: "The data from the API could not be fetched."
      }
    }

    if (response.results) {
      return response.results;
    }
  
    if (response.data) {
      if (response.data.totalResultsCount === 0) {
        return {
          error: true,
          message: "The could not be found."
        }
      }
      return response.data;
    }
  
    return response;
  }
  
  export function handleError(error) {
    if (error.data) {
      return error.data;
    }
    return error;
  }