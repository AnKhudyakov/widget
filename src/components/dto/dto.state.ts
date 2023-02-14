import { Location } from "./dto.localstorage";
import { IWeatherResponse } from "./dto.api";

export interface IState {
  locations: Array<Location>;
  weather: Array<IWeatherResponse>;
  loading: boolean;
  fetchCountry: string,
}
