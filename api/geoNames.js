import { ApiCore } from "./utilitites/core";

export const apiGeoNames = new ApiCore({
    city: true,
    country: true,
});