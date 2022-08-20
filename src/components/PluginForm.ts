import { Extends } from "../../src/Form";

export default Extends([
  {
    name: "Tooltip",
    items: [
      {
        name: "tooltipMode",
        label: "Tooltip mode",
        type: "switch",
        options: [
          { label: "Single", value: "single" },
          { label: "All", value: "all" },
          { label: "Hidden", value: "hidden" },
        ],
        defaultValue: "hidden",
      },
    ],
  },
  {
    name: "Legend",
    items: [
      {
        name: "legendMode",
        label: "Legend mode",
        type: "switch",
        options: [
          { label: "List", value: "list" },
          { label: "Table", value: "table" },
          { label: "Hidden", value: "hidden" },
        ],
        defaultValue: "hidden",
      },
    ],
  },
  {
    name: "Graph styles",
    expanded: true,
    items: [
      {
        name: "graphType",
        label: "Graph type",
        type: "switch",
        options: [
          { label: "Lines", value: "lines" },
          { label: "Bars", value: "bars" },
          { label: "Points", value: "points" },
        ],
        defaultValue: "lines",
      },
      {
        name: "graphLineWidth",
        label: "Line width",
        type: "slider",
        min: 0,
        max: 10,
        defaultValue: 1,
      },
      {
        name: "graphFillOpacity",
        label: "Fill opacity",
        type: "slider",
        min: 0,
        max: 100,
        defaultValue: 60,
      },
      {
        name: "graphGradientMode",
        label: "Gradient mode",
        type: "switch",
        options: [
          { label: "None", value: "none" },
          { label: "Opacity", value: "opacity" },
          { label: "Hue", value: "hue" },
          { label: "Scheme", value: "scheme" },
        ],
        defaultValue: "none",
      },
      {
        name: "graphLineStyle",
        label: "Line style",
        type: "switch",
        options: [
          { label: "Solid", value: "solid" },
          { label: "Dash", value: "dash" },
          { label: "Dots", value: "dots" },
        ],
        defaultValue: "none",
      },
      {
        name: "graphConnectNullValues",
        label: "Connect null values",
        type: "switch",
        options: [
          { label: "Never", value: "never" },
          { label: "Always", value: "always" },
        ],
        defaultValue: "never",
      },
      {
        name: "graphShowPoints",
        label: "Show points",
        type: "switch",
        options: [
          { label: "Auto", value: "auto" },
          { label: "Always", value: "always" },
          { label: "Never", value: "never" },
        ],
        defaultValue: "never",
      },
      {
        name: "graphStackSeries",
        label: "Stack series",
        type: "switch",
        options: [
          { label: "Off", value: "off" },
          { label: "Normal", value: "normal" },
          { label: "100 %", value: "100%" },
        ],
        defaultValue: "normal",
      },
    ],
  },
  {
    name: "Axis",
    expanded: true,
    items: [
      {
        name: "axisPlacement",
        label: "Placement",
        type: "switch",
        options: [
          { label: "Auto", value: "auto" },
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
          { label: "Hidden", value: "hidden" },
        ],
        defaultValue: "auto",
      },
      {
        name: "axisLabel",
        label: "Label",
        type: "text",
        defaultValue: "",
      },
      {
        name: "axisWidth",
        label: "Width",
        type: "number",
        defaultValue: undefined,
        placeholder: "Auto",
      },
      {
        name: "axisShowGridLines",
        label: "Show grid lines",
        type: "switch",
        defaultValue: "auto",
        options: [
          { label: "Auto", value: "auto" },
          { label: "On", value: "on" },
          { label: "Off", value: "off" },
        ],
      },
    ],
  },
]);
