<template>
  <div>
    <p class="settings__content__title">New location</p>
    <form
      @submit.prevent="addLocation()"
      class="settings__content__new_location"
    >
      <div class="settings__content__new_location__fields">
        <div>
          <svg
            :class="`settings__content__new_location__icon
							${
                new_location.city.complete
                  ? 'settings__content__new_location__icon__complete'
                  : ''
              }
							${new_location.error ? 'settings__content__new_location__icon__error' : ''}
						`"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 23.5c-1 0 .183-1.579-4.747-4.035a7.857 7.857 0 0 1-.785-.45C4.015 17.419 2.5 14.5 2.5 11.358 2.5 6.19 6.753 2 12 2s9.5 4.19 9.5 9.357c0 3.462-1.844 6.657-4.745 8.104C11.82 21.92 13 23.5 12 23.5zm0-8.39c2.111 0 3.8-1.672 3.8-3.705C15.8 9.372 14.111 7.7 12 7.7c-2.111 0-3.8 1.672-3.8 3.705 0 2.033 1.689 3.705 3.8 3.705z"
            />
          </svg>
          <input
            :class="`settings__content__new_location__input
							${
                new_location.city.complete
                  ? 'settings__content__new_location__input__complete'
                  : ''
              }
							${new_location.error ? 'settings__content__new_location__input__error' : ''}
						`"
            type="text"
            id="city_input"
            v-model="new_location.city.value"
            @keyup="onCityInput"
            @blur="onCityInput"
            spellcheck="false"
            placeholder="Enter City"
          />
        </div>
      </div>
      <button
        class="settings__content__new_location__button"
        type="submit"
        :disabled="!new_location.city.complete"
      >
        <svg
          viewBox="0 0 1024 1024"
          :class="`settings__content__new_location__button_icon
							${
                new_location.city.complete
                  ? 'settings__content__new_location__button_icon__complete'
                  : ''
              } 
              `"
        >
          <path d="M288 896h448q32 0 32 32t-32 32H288q-32 0-32-32t32-32z" />
          <path
            d="M800 416a288 288 0 1 0-576 0c0 118.144 94.528 272.128 288 456.576C705.472 688.128 800 534.144 800 416zM512 960C277.312 746.688 160 565.312 160 416a352 352 0 0 1 704 0c0 149.312-117.312 330.688-352 544z"
          />
          <path
            d="M544 384h96a32 32 0 1 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64h96v-96a32 32 0 0 1 64 0v96z"
          />
        </svg>
      </button>
    </form>
    <p v-if="new_location.error" class="settings__content__error_message">
      {{ new_location.error }}
    </p>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import { Location } from "../../dto/dto.localstorage";
export default defineComponent({
  data: () => ({
    new_location: {
      country: { value: "", complete: false },
      city: { value: "", complete: false },
      error: null as null | string,
    },
  }),
  computed: {
    ...mapGetters({
      locations: "getLocations",
    }),
    ...mapGetters({
      weather: "getWeather",
    }),
    ...mapGetters({
      fetchCountry: "getFetchCountry",
    }),
  },
  methods: {
    isEmptyOrSpaces(str: string) {
      return str === null || str.match(/^ *$/) !== null;
    },
    isInArray(item: number, array: Array<number>) {
      for (let i in array) {
        if (array[i] == item) return true;
      }
      return false;
    },
    uniquenessValidation(locations: Array<Location>, new_location: Location) {
      return locations.filter(
        (e: Location) =>
          e.city.toLocaleLowerCase() === new_location.city.toLocaleLowerCase()
      );
    },
    clearInputs() {
      this.new_location = {
        country: { value: "", complete: false },
        city: { value: "", complete: false },
        error: null as string | null,
      };
    },
    async addLocation() {
      let city = this.new_location.city.value;
      await this.$store.dispatch("fetchCountry", city);
      let new_location: Location = {
        id: new Date(),
        city: city,
        country: this.fetchCountry,
      };
      if (
        this.uniquenessValidation(this.locations, new_location).length == 0 &&
        this.fetchCountry
      ) {
        let locations = this.locations;
        locations.push(new_location);
        this.$store.dispatch("setLocations", locations);
        this.$store.dispatch("fetchWeather", { city });
        this.clearInputs();
      } else if (!this.fetchCountry) {
        this.new_location.error = "This city is Incorrect.";
      } else {
        this.new_location.error = "This city has already been added.";
      }
    },
    onCityInput(event: any) {
      this.new_location.error = null;
      if (event.ctrlKey || event.keyCode == 32) {
        return;
      }
      if (!this.isInArray(event.keyCode, [8, 37, 13, 39, 16, 17, 18])) {
        this.new_location.city.complete = true;
      }
      if (!this.new_location.city.value) {
        this.new_location.city.complete = false;
      }
      if (event.keyCode == 8) {
        this.new_location.city.complete = false;
      }
      if (event.keyCode == 13 || event.keyCode == 27) {
        const getSel: any = document.getSelection();
        getSel.removeAllRanges();
      }
    },
  },
});
</script>

<style lang="scss">
@import "./NewLocation.scss";
</style>
