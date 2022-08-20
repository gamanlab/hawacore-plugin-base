<template>
  <div class="col text-center">
    <h3>New plugin</h3>
    <p>Here your custom component</p>
    <pre>./src/components</pre>

    <pre>{{ modelValue }}</pre>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps(["modelValue"]);
</script>
