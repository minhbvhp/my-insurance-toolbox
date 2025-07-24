import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          "50": { value: "hsl(152, 68%, 96%)" },
          "100": { value: "hsl(154, 75%, 87%)" },
          "200": { value: "hsl(156, 73%, 74%)" },
          "300": { value: "hsl(158, 58%, 62%)" },
          "400": { value: "hsl(160, 51%, 49%)" },
          "500": { value: "hsl(162, 63%, 41%)" },
          "600": { value: "hsl(164, 71%, 34%)" },
          "700": { value: "hsl(166, 72%, 28%)" },
          "800": { value: "hsl(168, 80%, 23%)" },
          "900": { value: "hsl(170, 97%, 15%)" },
          "950": { value: "hsl(170, 97%, 15%)" },
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          solid: { value: "{colors.primary.500}" },
          contrast: { value: "{colors.primary.50}" },
          fg: { value: "{colors.primary.700}" },
          muted: { value: "{colors.primary.100}" },
          subtle: { value: "{colors.primary.200}" },
          emphasized: { value: "{colors.primary.300}" },
          focusRing: { value: "{colors.primary.500}" },
        },
      },
    },
  },
  globalCss: {
    html: {
      colorPalette: "primary",
    },
    body: {},
  },
});

export const theme = createSystem(defaultConfig, config);
export default theme;
