<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title> Hawacore plugin toolkit </q-toolbar-title>

        <div>V{{ pkg.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import pkg from "../package.json";

const leftDrawerOpen = ref(false);
</script>

<style>
.q-page-container {
  background-color: #f4fafc;
}
</style>
