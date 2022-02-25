export function handleResponse(response) {

    if (response.status != 200) {
      // TODO: Make it so th result is smoothly handled in SearchScreen.js
    }

    if (response.results) {
      return response.results;
    }
  
    if (response.data) {
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