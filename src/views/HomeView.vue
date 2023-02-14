<template>
  <div class="home">
    <Settings
      v-if="isSettingsVisible"
      @closeSettings="toggleIsSettingsVisible()"
    ></Settings>
    <SettingsButton @openSettings="toggleIsSettingsVisible()"></SettingsButton>
    <Loader v-if="loading"></Loader>
    <Main></Main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import Main from "../components/Main/Main.vue";
import Settings from "../components/Settings/Settings.vue";
import SettingsButton from "../components/SettingsButton/SettingsButton.vue";
import Loader from "../components/Loader/Loader.vue";

export default defineComponent({
  components: {
    Settings,
    SettingsButton,
    Main,
    Loader,
  },
  data: () => ({
    isSettingsVisible: false,
  }),

  computed: {
    ...mapGetters({
      loading: "getLoading",
    }),
  },

  mounted() {
    this.$store.commit("updateLocations");
    this.$store.dispatch("checkLocations");
  },
  methods: {
    toggleIsSettingsVisible() {
      this.isSettingsVisible = !this.isSettingsVisible;
    },
  },
});
</script>
