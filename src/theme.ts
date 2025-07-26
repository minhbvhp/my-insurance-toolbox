import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          "50": { value: "hsl(330, 100%, 98%)" },
          "100": { value: "hsl(330, 100%, 93%)" },
          "200": { value: "hsl(330, 90%, 85%)" },
          "300": { value: "hsl(330, 80%, 75%)" },
          "400": { value: "hsl(330, 75%, 65%)" },
          "500": { value: "hsl(330, 70%, 55%)" },
          "600": { value: "hsl(330, 65%, 45%)" },
          "700": { value: "hsl(330, 60%, 35%)" },
          "800": { value: "hsl(330, 55%, 25%)" },
          "900": { value: "hsl(330, 60%, 15%)" },
          "950": { value: "hsl(330, 60%, 10%)" },
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
