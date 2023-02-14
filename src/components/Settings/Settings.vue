<template>
  <div class="settings">
    <div class="settings__mask" @click="closeSettings()"></div>
    <div class="settings__content">
      <h1>Settings</h1>
      <svg
        class="settings__content__close_button"
        @click="closeSettings()"
        viewBox="0 0 311 311.07733"
      >
        <path
          d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0"
        />
        <path
          d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0"
        />
      </svg>
      <LocationsList></LocationsList>
      <NewLocation></NewLocation>
    </div>
  </div>
</template>

<script lang="ts">
import NewLocation from "./NewLocation/NewLocation.vue";
import LocationsList from "./LocationsList/LocationsList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    NewLocation,
    LocationsList,
  },

  methods: {
    closeSettings() {
      document.getElementsByClassName("settings__content")[0].className =
        "settings__content settings__content__close";
      document.getElementsByClassName("settings__mask")[0].className =
        "settings__mask settings__mask__close";
      setTimeout(() => {
        this.$emit("closeSettings");
      }, 500);
    },
  },
});
</script>

<style lang="scss">
@import "./Settings.scss";
</style>
