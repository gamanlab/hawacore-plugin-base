import { h, defineComponent, PropType, VNode, ref } from "vue";
import {
  QBtn,
  QBtnToggle,
  QCheckbox,
  QExpansionItem,
  QField,
  QInput,
  QSeparator,
  QSlider,
  QToggle,
} from "quasar";

interface Option {
  label: string;
  value: boolean | number | string | Date;
}

type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "switch"
  | "radio"
  | "checkbox"
  | "select"
  | "file"
  | "toggle"
  | "button"
  | "slider"
  | "range"
  | "timepicker"
  | "datepicker";

interface Field {
  name: string;
  label: string;
  type: FieldType;
  min?: number;
  max?: number;
  options?: Option[];
  // eslint-disable-next-line
  defaultValue?: any;
  color?: string;
  placeholder?: number | string;
}

interface FieldGroup {
  name: string;
  items: FieldGroup[] | Field[];
  expanded?: boolean;
}

type Form = (Field | FieldGroup)[];

// eslint-disable-next-line
type ModelValue = { [key: string]: any };

const basicForm: Form = [
  {
    name: "Panel option",
    expanded: true,
    items: [
      {
        name: "name",
        label: "Name",
        type: "text",
        defaultValue: "New panel",
      },
      {
        name: "description",
        label: "Description",
        type: "text",
        defaultValue: "",
      },
      {
        name: "hideTitle",
        label: "Hide title",
        type: "toggle",
        defaultValue: false,
      },
      {
        name: "transparentBackground",
        label: "Transparent background",
        type: "toggle",
        defaultValue: false,
      },
    ],
  },
];

export { FieldType, Field, Option, FieldGroup, Form, basicForm };

const basicInput = defineComponent({
  name: "BasicInput",
  props: ["modelValue", "type", "min", "max"],
  emits: ["update:modelValue"],
  render() {
    return h("input", {
      value: this.modelValue,
      type: this.type,
      min: this.min,
      max: this.max,
      onInput: (e: Event) => {
        // eslint-disable-next-line
        this.$emit("update:modelValue", (e as any).target.value);
      },
    });
  },
});

function renderField(field: Field, model: ModelValue) {
  const defaultProp = {
    label: field.label,
    stackLabel: true,
    outlined: true,
    options: field.options,
    color: field.color,
    placeholder: field.placeholder,
    modelValue: model[field.name],
    // eslint-disable-next-line
    "onUpdate:modelValue": (value: any) => (model[field.name] = value),
  };

  switch (field.type) {
    case "button":
      return h(QBtn, { color: "primary" }, field.label);
    case "checkbox":
      return h(QCheckbox, {
        ...defaultProp,
      });
    case "toggle":
      return h(
        QField,
        { ...defaultProp },
        {
          control: () =>
            h(QToggle, {
              modelValue: model[field.name],
              // eslint-disable-next-line
              "onUpdate:modelValue": (value: any) =>
                (model[field.name] = value),
              dense: true,
            }),
        }
      );
    case "switch":
      return h(
        QField,
        { ...defaultProp },
        {
          control: () =>
            h(QBtnToggle, {
              modelValue: model[field.name],
              // eslint-disable-next-line
              "onUpdate:modelValue": (value: any) =>
                (model[field.name] = value),
              options: field.options,
              noCaps: true,
            }),
        }
      );
    case "number":
      return h(QInput, {
        ...defaultProp,
        type: "number",
        min: field.min,
        max: field.max,
      });
    case "textarea":
      return h(QInput, {
        ...defaultProp,
        type: "textarea",
        min: field.min,
        max: field.max,
      });
    case "slider":
      return h(
        QField,
        { ...defaultProp },
        {
          control: () => [
            h(
              "div",
              { class: "col-md-10" },
              h(QSlider, {
                modelValue: model[field.name],
                // eslint-disable-next-line
                "onUpdate:modelValue": (value: any) =>
                  (model[field.name] = parseFloat(value)),
                dense: true,
                min: field.min,
                max: field.max,
              })
            ),
            h(
              "div",
              { class: "col q-mx-sm" },
              h(basicInput, {
                type: "number",
                min: field.min,
                max: field.max,
                dense: true,
                outlined: true,
                modelValue: model[field.name],
                class: "fit ",
                // eslint-disable-next-line
                "onUpdate:modelValue": (value: any) =>
                  (model[field.name] = parseFloat(value)),
              })
            ),
          ],
        }
      );
    default:
      return h(QInput, {
        ...defaultProp,
      });
  }
}

function renderFieldsGroup(fg: FieldGroup, model: ModelValue): VNode {
  return h("div", [
    h(QSeparator),
    h(
      QExpansionItem,
      {
        label: fg.name,
        defaultOpened: fg.expanded,
        switchToggleSide: true,
      },
      () =>
        h(
          "div",
          { class: "form-plugin q-gutter-y-md column q-pl-sm" },
          fg.items.map((field: Field | FieldGroup) => {
            if ((field as FieldGroup).items) {
              return renderFieldsGroup(field as FieldGroup, model);
            }
            return renderField(field as Field, model);
          })
        )
    ),
  ]);
}

export default defineComponent({
  name: "FormBuilder",
  props: {
    modelValue: { type: Object as PropType<ModelValue>, required: true },
    form: { type: Object as PropType<Form>, required: true },
  },
  setup(props, { emit }) {
    const formValues = ref({});

    function cloneFieldDefaultValue(fForm: Form) {
      // eslint-disable-next-line
      const fv: { [key: string]: any } = {};
      for (const f of fForm) {
        if ((f as FieldGroup).items != undefined) {
          Object.assign(fv, cloneFieldDefaultValue((f as FieldGroup).items));
          continue;
        }
        fv[f.name] = (f as Field).defaultValue;
      }
      return fv;
    }

    formValues.value = cloneFieldDefaultValue(props.form);

    emit("update:modelValue", formValues.value);

    return { formValues };
  },
  render() {
    return h(
      "div",
      { class: "form-plugin q-gutter-y-md column" },
      this.form.map((f) => {
        const group = f as FieldGroup;

        if (group.items) {
          return renderFieldsGroup(group, this.formValues);
        }

        return renderField(f as Field, this.formValues);
      })
    );
  },
  emits: ["update:modelValue"],
  watch: {
    formValues: {
      handler: function (v) {
        this.$emit("update:modelValue", v);
      },
      deep: true,
    },
  },
});

export function Extends(form: Form): Form {
  return JSON.parse(JSON.stringify([...basicForm, ...form]));
}
