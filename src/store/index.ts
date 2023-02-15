import { createStore } from "vuex";
import { IState } from "../components/dto/dto.state";
import { IGeoResponse, IWeatherResponse } from "../components/dto/dto.api";
import { Location } from "../components/dto/dto.localstorage";
import axios from "axios";

export default createStore<IState>({
  state: {
    locations: [],
    weather: [],
    loading: false,
    fetchCountry: "",
  },
  getters: {
    getLocations(state: IState) {
      return state.locations;
    },
    getWeather(state: IState) {
      return state.weather;
    },
    getLoading(state: IState) {
      return state.loading;
    },
    getFetchCountry(state: IState) {
      return state.fetchCountry;
    },
  },
  mutations: {
    setLoading(state: IState, value: boolean) {
      state.loading = value;
    },
    addWeather(state: IState, data: IWeatherResponse) {
      state.weather.push(data);
    },
    removeWeather(state: IState, index: number) {
      state.weather.splice(index, 1);
    },
    swapWeather(state: IState, items: { startItem: number; endItem: number }) {
      const { startItem, endItem } = items;
      const tempItem = state.weather[startItem];
      state.weather[startItem] = state.weather[endItem];
      state.weather[endItem] = tempItem;
    },
    updateLocations(state: IState) {
      let locations = localStorage.getItem("locations");
      locations !== null
        ? (state.locations = JSON.parse(locations))
        : (state.locations = []);
    },
    setFetchCountry(state: IState, value: string) {
      state.fetchCountry = value;
    },
  },
  actions: {
    async fetchGeoLocaiton() {
      try {
        const response: { data: IGeoResponse } = await axios.get(
          `https://jsonip.com`
        );
        const ip = response.data.ip;
        const responseCity: { data: IGeoResponse } = await axios.get(
          `https://ipapi.co/${ip}/json/`
        );
        return responseCity.data;
      } catch (error) {
        console.log(error);
      }
    },
    async setLocations({ commit }, locations: Array<Location>) {
      localStorage.setItem("locations", JSON.stringify(locations));
      commit("updateLocations");
    },
    async checkLocations({ state, commit, dispatch }) {
      if (!state.locations[0]) {
        commit("setLoading", true);
        await dispatch("fetchGeoLocaiton").then((user_location) => {
          let locations = [
            {
              id: new Date(),
              city: user_location.city,
              country: user_location.country,
            },
          ];
          dispatch("setLocations", locations);
          commit("setLoading", false);
        });
      }
      dispatch("startAddWeather");
    },
    async startAddWeather({ state, commit, dispatch }) {
      commit("setLoading", true);
      for (let i = 0; i < state.locations.length; i++) {
        await dispatch("fetchWeather", {
          city: state.locations[i].city,
          country: state.locations[i].country,
        });
      }
      commit("setLoading", false);
    },
    async fetchWeather({ dispatch }, location: Location) {
      const { city } = location;
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0f09d498c18c8cfb1a5fefe1f1fcea67`
        )
        .then((response: { data: IWeatherResponse }) => {
          dispatch("convertDirectionWind", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchCountry({ commit }, city) {
      try {
        let response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0f09d498c18c8cfb1a5fefe1f1fcea67`
        );
        return commit("setFetchCountry", response.data.sys.country);
      } catch (error) {
        console.log(error);
        commit("setFetchCountry", "");
      }
    },
    convertDirectionWind({ commit }, weather: IWeatherResponse) {
      let directionWind = "";
      const deg = weather.wind.deg;
      let counter = 11.25;
      const scopeDeg = [0];
      while (counter < 360) {
        scopeDeg.push(counter);
        counter += 2 * 11.25;
      }
      const nameDirectionWind = [
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW",
      ];
      for (let i = 0; i < scopeDeg.length; i++) {
        let currentKey = scopeDeg[i];
        let nextKey = scopeDeg[i + 1];
        if (
          (currentKey < deg && deg < nextKey) ||
          (currentKey < deg && !nextKey)
        ) {
          directionWind = nameDirectionWind[i];
        }
      }
      weather.wind.deg = directionWind;
      commit("addWeather", weather);
    },
  },
  modules: {},
});
