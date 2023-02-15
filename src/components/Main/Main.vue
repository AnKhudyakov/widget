<template>
  <div class="weather_main">
    <div v-for="item in weather" :key="item.id" class="weather_main__card">
      <div class="weather_main__card__location_title">
        <p>{{ item.name }},{{ item.sys.country }}</p>
      </div>
      <div class="weather_main__card__main_temperature">
        <img
          :src="`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`"
          alt="weather"
        />
        <p>{{ Math.round(item.main.temp) }}°C</p>
      </div>
      <p class="weather_main__card__description">
        Feels like {{ Math.round(item.main.feels_like) }}°C.
      </p>
      <p
        class="weather_main__card__description"
        v-for="weather in item.weather"
        :key="weather.id"
      >
        {{
          weather.description.charAt(0).toUpperCase() +
          weather.description.slice(1)
        }}.
      </p>
      <div class="weather_main__card__other">
        <div title="Wind speed">
          <svg viewBox="0 0 1024 1024">
            <g>
              <path
                d="M160 64q32 0 32 32v832q0 32-32 32t-32-32V96q0-32 32-32zm416 354.624 128-11.584V168.96l-128-11.52v261.12zm-64 5.824V151.552L320 134.08V160h-64V64l616.704 56.064A96 96 0 0 1 960 215.68v144.64a96 96 0 0 1-87.296 95.616L256 512V224h64v217.92l192-17.472zm256-23.232 98.88-8.96A32 32 0 0 0 896 360.32V215.68a32 32 0 0 0-29.12-31.872l-98.88-8.96v226.368z"
              />
            </g>
          </svg>
          <p>{{ item.wind.speed }} m/s, {{ item.wind.deg }}</p>
        </div>
        <div title="Pressure">
          <svg viewBox="0 0 1000 1000">
            <g>
              <path
                d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10L500,10z M793.8,793.8c-38.2,38.2-82.6,68.1-132.1,89.1c-51.2,21.6-105.6,32.6-161.7,32.6s-110.5-11-161.7-32.6c-49.5-20.9-93.9-50.9-132.1-89.1c-38.2-38.2-68.1-82.6-89.1-132.1C95.5,610.5,84.5,556.1,84.5,500c0-56.1,11-110.5,32.6-161.7c20.9-49.5,50.9-93.9,89.1-132.1c38.2-38.2,82.6-68.1,132.1-89.1C389.5,95.5,443.9,84.5,500,84.5s110.5,11,161.7,32.6c49.5,20.9,93.9,50.9,132.1,89.1c38.2,38.2,68.2,82.6,89.1,132.1c21.6,51.2,32.6,105.6,32.6,161.7c0,56.1-11,110.5-32.6,161.7C861.9,711.2,832,755.6,793.8,793.8L793.8,793.8z M648.5,174c-74.7-34-159.5-41.3-238.8-20.6c-71.5,18.7-137,60.2-184.5,116.9c-49.8,59.5-79.2,134.9-82.9,212.4c-3.8,79.1,19.1,158.2,64.4,222.8l60-38l-28.3-48.2l-28.9,16.9c-22-47.1-32.5-99.4-30-151.7c2-41.5,12.2-82.3,29.6-119.8l30.2,16.8l27.1-48.9l-29.5-16.3c5.3-7.6,10.9-14.9,16.8-22.1c35.7-42.7,82.9-75.8,135.1-95.2l24.5,238.4c-14.3,18.7-22.8,42-22.8,67.3c0,61.3,49.6,110.9,110.9,110.9c61.2,0,110.8-49.6,110.8-110.9c0-52.8-36.9-96.9-86.4-108.1L393.8,197.2c8.3-2.9,16.7-5.5,25.2-7.7c17.7-4.6,35.7-7.7,53.9-9.2l0.3,35.9l55.9-0.5l-0.3-35.2c35.8,3.2,71.1,12.4,104.2,27.5c51.6,23.5,96.9,61.3,129.7,107.8l-30.4,17.8l28.3,48.2l30.2-17.7c25.8,55.3,35.4,117.7,27.2,178.7c-4.4,33-14.2,65.4-28.7,95.6L759.6,622l-27.1,48.9l60,35.5c33.2-47.2,54.7-102,62.3-158.6c10.6-79.1-5.7-160.4-45.9-228.9C771.9,255.7,714.9,204.2,648.5,174L648.5,174z M501.5,448.9c30.8,0,55.9,25,55.9,55.8s-25.1,55.9-55.9,55.9c-30.8,0-55.9-25-55.9-55.9S470.6,448.9,501.5,448.9z"
              />
            </g>
          </svg>
          <p>{{ item.main.pressure }} hPa</p>
        </div>
        <div title="Humidity percentage">
          <svg viewBox="0 0 32 32">
            <g>
              <path
                d="M23.4761,13.9932,16.8472,3.4365a1.04,1.04,0,0,0-1.6944,0L8.4941,14.0444A9.9861,9.9861,0,0,0,7,19a9,9,0,0,0,18,0A10.0632,10.0632,0,0,0,23.4761,13.9932ZM16,26.0005a7.0089,7.0089,0,0,1-7-7,7.978,7.978,0,0,1,1.2183-3.9438l.935-1.4888L21.2271,23.6411A6.9772,6.9772,0,0,1,16,26.0005Z"
              />
            </g>
          </svg>
          <p>{{ item.main.humidity }} %</p>
        </div>
        <div title="Visibility">
          <svg viewBox="0 0 1000 1000">
            <g>
              <path
                d="M983.3,480C974.4,468.8,765,190.4,500,190.4C235,190.4,25.6,468.8,16.7,480c-8.9,11.1-8.9,29,0,40.1C25.6,531.2,235,809.6,500,809.6c265,0,474.4-278.4,483.3-289.5C992.2,506.7,992.2,491.1,983.3,480L983.3,480L983.3,480z M500,740.5c-193.8,0-363-180.4-414.3-242.8C137,437.6,306.2,255,500,255c193.8,0,363,180.4,414.3,242.8C863,560.1,693.8,740.5,500,740.5L500,740.5L500,740.5z M502.2,355.2c-78,0-142.5,64.6-142.5,142.5c0,78,64.6,142.5,142.5,142.5c78,0,142.5-64.6,142.5-142.5C644.8,419.8,580.2,355.2,502.2,355.2L502.2,355.2L502.2,355.2z M502.2,575.7c-42.3,0-75.7-33.4-75.7-75.7c0-42.3,33.4-75.7,75.7-75.7c42.3,0,75.7,33.4,75.7,75.7C578,542.3,544.5,575.7,502.2,575.7L502.2,575.7L502.2,575.7z"
              />
            </g>
          </svg>
          <p>{{ item.visibility / 1000 }} km</p>
        </div>
      </div>
      <img v-if="item.weather[0].main.toLowerCase()==='clouds'"
        class="weather_main__card__background_image"
        src="https://i.ibb.co/tK1Gx3T/clouds.png"
        :alt="item.weather[0].main"
      />
      <img v-else-if="item.weather[0].main.toLowerCase()==='clear'"
        class="weather_main__card__background_image"
        src="https://i.ibb.co/BP6JFWR/clear.jpg"
        :alt="item.weather[0].main"
      />
      <img v-else-if="item.weather[0].main.toLowerCase()==='rain'"
        class="weather_main__card__background_image"
        src="https://i.ibb.co/HBKxHRw/rain.png"
        :alt="item.weather[0].main"
      />
      <img v-else-if="item.weather[0].main.toLowerCase()==='snow'"
        class="weather_main__card__background_image"
        src="https://i.ibb.co/g79tG4J/snow.jpg"
        :alt="item.weather[0].main"
      />
      <img v-else="item.weather[0].main.toLowerCase()==='clear'"
        class="weather_main__card__background_image"
        src="https://i.ibb.co/BP6JFWR/clear.jpg"
        :alt="item.weather[0].main"
      />

    </div>
  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    srcUrl: "",
  }),
  computed: {
    ...mapGetters({
      weather: "getWeather",
    }),
  },
  // methods: {
  //   getImgUrl(pic:string) {
  //     const images = require.context("../../assets/img/",false, /\.jpg$/)
  //     return images("./"+pic+".jpg")
  //   },}
});
</script>

<style lang="scss">
@import "./Main.scss";
</style>
