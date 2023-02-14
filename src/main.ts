import { createApp } from "vue";
import { defineCustomElement } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

class WeatherComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div id="app"></div>`;
    const parent: HTMLElement | null = this.querySelector("#app");
    if (parent) {
      createApp(App).use(store).use(router).mount(parent);
    }
  }
}
//createApp(App).use(store).use(router).mount("#app");

customElements.define("weather-widget", WeatherComponent);
