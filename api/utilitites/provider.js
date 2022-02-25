import axios from 'axios'; 
import { handleResponse, handleError } from './response'; 

const BASE_URL = 'http://api.geonames.org/searchJSON?';

const onCitySearch = (city) => {
    return axios
        .get(`${BASE_URL}name_equals=${city.trim()}&eatureClass=P&username=weknowit&maxRows=1`)
        .then(handleResponse) 
        .catch(handleError); 
}

const onCountrySearch = (country, countryCode) => {
    return axios
        .get(`${BASE_URL}q=${country.trim()}&country=${countryCode}&featureClass=P&orderby=population&username=weknowit&maxRows=20`)
        .then(handleResponse) 
        .catch(handleError); 
  };

const apiProvider = {
    onCitySearch,
    onCountrySearch,
}

export default apiProvider;