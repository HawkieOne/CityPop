import apiProvider from './provider';

export class ApiCore {
    constructor(options) {
        if (options.city) {
            this.city = (city) => {
                return apiProvider.onCitySearch(city);
            }
        }

        if (options.country) {
            this.country = (country, countryCode) => {
                return apiProvider.onCountrySearch(country, countryCode);
            }
        }
    }
}