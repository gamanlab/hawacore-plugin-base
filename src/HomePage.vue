<template>
  <q-splitter v-model="splitterVertical" style="height: calc(100vh - 50px)">
    <template v-slot:before>
      <q-splitter
        v-model="splitterHorizontal"
        style="height: calc(100vh - 50px)"
        horizontal
      >
        <template v-slot:before>
          <div class="fit q-pa-md">
            <PanelContainer
              :title="formValue.name"
              :transparent="formValue.transparentBackground"
              :hide-title="formValue.hideTitle"
              disable-menu
            >
              <PluginComponent v-model="sampleData"></PluginComponent>
            </PanelContainer>
          </div>
        </template>
        <template v-slot:after>
          <q-tabs
            v-model="tab"
            inline-label
            dense
            class="bg-primary text-white shadow-2"
            align="left"
          >
            <q-tab name="formValues" label="Form values" />
            <q-tab name="sampleData" label="Sample data" />
          </q-tabs>
          <q-separator />

          <q-tab-panels
            v-model="tab"
            animated
            style="height: calc(100% - 40px)"
          >
            <q-tab-panel name="formValues">
              <pre>{{ formValue }}</pre>
            </q-tab-panel>

            <q-tab-panel name="sampleData">
              <q-input outlined type="textarea" v-model="sampleData"></q-input>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </template>

    <template v-slot:after>
      <div class="q-pa-md fit">
        <q-scroll-area class="fit bg-white" :thumb-style="thumbStyle">
          <div class="q-pa-md">
            <FormBuilder v-model="formValue" :form="form" />
          </div>
        </q-scroll-area>
      </div>
    </template>
  </q-splitter>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import PanelContainer from "./PanelContainer.vue";
import FormBuilder from "./Form";

import PluginForm from "./components/PluginForm";
import PluginComponent from "./components/PluginComponent.vue";

const splitterVertical = ref(70);
const splitterHorizontal = ref(50);

const form = ref(PluginForm);

// eslint-disable-next-line
const formValue = ref<any>({});

const tab = ref("sampleData");

const sampleData = ref("sample");

const thumbStyle = {
  borderRadius: "5px",
  width: "5px",
};
</script>
