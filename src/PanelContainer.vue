<template>
  <section
    class="panel-container"
    :class="{
      'hide-title': props.hideTitle,
      'panel-container__transparent': props.transparent,
    }"
  >
    <section
      v-if="props.error"
      class="panel-info-corner panel-info-corner--error"
    >
      <q-icon name="priority_high"></q-icon>
      <span class="panel-info-corner-inner"> </span>
    </section>
    <div class="panel-header grid-drag-handle">
      <q-menu
        anchor="bottom middle"
        self="top middle"
        :no-parent-event="props.disableMenu"
      >
        <q-list dense style="min-width: 140px">
          <q-item clickable v-close-popup>
            <q-item-section avatar>
              <q-icon name="fullscreen" />
            </q-item-section>
            <q-item-section> View</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section avatar>
              <q-icon name="edit" />
            </q-item-section>
            <q-item-section>Edit</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-close-popup @click="onRemoveClick()">
            <q-item-section avatar>
              <q-icon name="delete" />
            </q-item-section>
            <q-item-section>Remove</q-item-section>
          </q-item>
        </q-list>
      </q-menu>

      <header>
        <div class="panel-title">
          <h2>
            {{ props.title }}
          </h2>
          <q-icon class="expand_more" name="expand_more" />
        </div>
      </header>
    </div>
    <div class="panel-loading" v-if="props.loading">
      <q-tooltip> Cancel update </q-tooltip>
      <q-spinner-ios />
    </div>
    <div class="panel-content">
      <slot>
        <div class="fit row flex-center">
          <q-btn
            size="lg"
            no-caps
            color="deep-orange"
            icon="add_chart"
            glossy
            rounded
            @click="openEditorPanel()"
            >Add new panel</q-btn
          >
        </div>
      </slot>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { defineProps, onMounted, onBeforeUnmount, defineEmits } from "vue";
import { useAutoRefresh } from "./ticker";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  title: String,
  description: String,
  query: String,
  disableMenu: Boolean,
  error: Boolean,
  loading: Boolean,
  transparent: Boolean,
  hideTitle: Boolean,
});

const route = useRoute();
const router = useRouter();

const ticker = useAutoRefresh(route, async () => {
  console.log("tick me");
});

const emit = defineEmits<{
  (e: "remove"): void;
  (e: "view"): void;
  (e: "edit"): void;
}>();

onMounted(() => {
  ticker.onMounted();
});

onBeforeUnmount(() => {
  ticker.onBeforeUnmount();
});

function onRemoveClick() {
  emit("remove");
}

function openEditorPanel() {
  router.push({ name: "EditorPanel" });
}
</script>

<style lang="scss" scoped>
.panel-container {
  background-color: #fff;
  border: 1px solid #24292e1f;
  border-radius: 3px;
  box-shadow: none;
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  height: 100%;
  position: relative;
  width: 100%;
}

.panel-container__transparent {
  background: none !important;
  border: none !important;
}
.panel-header {
  z-index: 1;
}

.panel-header:hover {
  background-color: #24292e1f;
  transition: background-color 0.1s ease-in-out;
}

.panel-title {
  align-items: center;
  border: 0;
  display: flex;
  flex-wrap: nowrap;
  font-weight: 500;
  height: 32px;
  justify-content: center;
  line-height: 32px;
  position: relative;
  width: 100%;

  h2 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: calc(100% - 38px);
    cursor: pointer;
    font-weight: 500;
    font-size: 1rem;
    margin: 0px;
  }
  .expand_more {
    visibility: hidden;
  }
}

.hide-title .panel-title h2 {
  display: none !important;
}

.hide-title .panel-content {
  position: absolute;
  height: 100%;
}

.panel-container:hover .expand_more {
  visibility: visible;
}

.panel-info-corner {
  color: #24292ebf;
  cursor: pointer;
  // display: none;
  height: 32px;
  left: 0;
  position: absolute;
  top: 0;
  width: 32px;
  z-index: 2;

  .q-icon {
    color: #ffffff;
    z-index: 1;
  }
}
.panel-info-corner--error .panel-info-corner-inner {
  border-bottom: 32px solid #0000;
  border-left: 32px solid var(--q-negative);
  border-right: none;
}
.panel-loading {
  color: #24292ebf;
  font-size: 18px;
  position: absolute;
  right: 4px;
  top: 0;
  z-index: 11;

  cursor: pointer;
}

.panel-info-corner-inner {
  bottom: 0;
  height: 0;
  left: 0;
  position: absolute;
  width: 0;
}
.q-item__section--avatar {
  min-width: 0;
}
.q-item__section--side {
  padding-right: 4px;
}

.panel-content {
  contain: strict;
  flex-grow: 1;
  height: calc(100% - 32px);
  padding: 8px;
  width: 100%;
}

:deep(.vue-resizable-handle) {
  visibility: hidden;
}
.vue-grid-item:hover :deep(.vue-resizable-handle) {
  visibility: visible;
}
</style>
