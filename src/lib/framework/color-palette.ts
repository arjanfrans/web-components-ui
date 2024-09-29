import { Mode } from "../components/variables/Mode.ts";

interface ColorPalette {
  light: {
    primary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    secondary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    background: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      1000: string;
    };
    neutral: {
      background: string;
      text: string;
      border: string;
    };
    rgb: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      border: string;
    };
  };
  dark: {
    primary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    secondary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    background: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      1000: string;
    };
    neutral: {
      background: string;
      text: string;
      border: string;
    };
    rgb: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      border: string;
    };
  };
}

function hexToRgb(hex: string): string {
  let r = 0,
    g = 0,
    b = 0;

  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1] + hex[2], 16);
    g = parseInt(hex[3] + hex[4], 16);
    b = parseInt(hex[5] + hex[6], 16);
  }

  return `${r}, ${g}, ${b}`;
}

function adjustColor(color: string, amount: number): string {
  let usePound = false;
  if (color[0] === "#") {
    color = color.slice(1);
    usePound = true;
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) + amount;
  r = r > 255 ? 255 : r < 0 ? 0 : r;
  let b = ((num >> 8) & 0x00ff) + amount;
  b = b > 255 ? 255 : b < 0 ? 0 : b;
  let g = (num & 0x0000ff) + amount;
  g = g > 255 ? 255 : g < 0 ? 0 : g;
  return (
    (usePound ? "#" : "") +
    (0x1000000 + (r << 16) + (b << 8) + g).toString(16).slice(1)
  );
}

export function generateColorPalette(
  primaryColor: string,
  textColorLight: string,
  backgroundColorLight: string,
  textColorDark: string,
  backgroundColorDark: string,
): ColorPalette {
  function createPalette(
    primaryColor: string,
    backgroundColor: string,
    textColor: string,
    isDarkMode: boolean,
  ) {
    const borderAdjustment = isDarkMode ? 60 : -60;
    const primaryRgb = hexToRgb(primaryColor);
    const backgroundRgb = hexToRgb(backgroundColor);
    const textRgb = hexToRgb(textColor);

    return {
      primary: {
        50: adjustColor(primaryColor, 100),
        100: adjustColor(primaryColor, 70),
        200: adjustColor(primaryColor, 50),
        300: adjustColor(primaryColor, 30),
        400: adjustColor(primaryColor, 20),
        500: primaryColor,
        600: adjustColor(primaryColor, -10),
        700: adjustColor(primaryColor, -20),
        800: adjustColor(primaryColor, -30),
        900: adjustColor(primaryColor, -50),
      },
      secondary: {
        50: adjustColor(primaryColor, -100),
        100: adjustColor(primaryColor, -70),
        200: adjustColor(primaryColor, -50),
        300: adjustColor(primaryColor, -30),
        400: adjustColor(primaryColor, -20),
        500: adjustColor(primaryColor, -10),
        600: adjustColor(primaryColor, -20),
        700: adjustColor(primaryColor, -30),
        800: adjustColor(primaryColor, -40),
        900: adjustColor(primaryColor, -50),
      },
      background: {
        50: adjustColor(backgroundColor, 100),
        100: adjustColor(backgroundColor, 70),
        200: adjustColor(backgroundColor, 50),
        300: adjustColor(backgroundColor, 30),
        400: adjustColor(backgroundColor, 20),
        500: backgroundColor,
        600: adjustColor(backgroundColor, -10),
        700: adjustColor(backgroundColor, -20),
        800: adjustColor(backgroundColor, -30),
        900: adjustColor(backgroundColor, -50),
        1000: adjustColor(backgroundColor, -80),
      },
      neutral: {
        background: backgroundColor,
        text: textColor,
        border: adjustColor(backgroundColor, borderAdjustment),
      },
      rgb: {
        primary: primaryRgb,
        secondary: hexToRgb(adjustColor(primaryColor, -20)),
        background: backgroundRgb,
        text: textRgb,
        border: hexToRgb(adjustColor(backgroundColor, borderAdjustment)),
      },
    };
  }

  return {
    light: createPalette(
      primaryColor,
      backgroundColorLight,
      textColorLight,
      false,
    ),
    dark: createPalette(primaryColor, backgroundColorDark, textColorDark, true),
  };
}

export function generateCSSVariables(palette: ColorPalette): string {
  function createVariables(mode: "light" | "dark"): string {
    const { primary, secondary, neutral, rgb, background } = palette[mode];

    return `
      --${mode}-primary-50: ${primary[50]};
      --${mode}-primary-100: ${primary[100]};
      --${mode}-primary-200: ${primary[200]};
      --${mode}-primary-300: ${primary[300]};
      --${mode}-primary-400: ${primary[400]};
      --${mode}-primary-500: ${primary[500]};
      --${mode}-primary-600: ${primary[600]};
      --${mode}-primary-700: ${primary[700]};
      --${mode}-primary-800: ${primary[800]};
      --${mode}-primary-900: ${primary[900]};


      --${mode}-primary-100_rgb: ${hexToRgb(primary[100])};
      --${mode}-primary-900_rgb: ${hexToRgb(primary[900])};

      --${mode}-secondary-50: ${secondary[50]};
      --${mode}-secondary-100: ${secondary[100]};
      --${mode}-secondary-200: ${secondary[200]};
      --${mode}-secondary-300: ${secondary[300]};
      --${mode}-secondary-400: ${secondary[400]};
      --${mode}-secondary-500: ${secondary[500]};
      --${mode}-secondary-600: ${secondary[600]};
      --${mode}-secondary-700: ${secondary[700]};
      --${mode}-secondary-800: ${secondary[800]};
      --${mode}-secondary-900: ${secondary[900]};

      --${mode}-background-50: ${background[50]};
      --${mode}-background-100: ${background[100]};
      --${mode}-background-200: ${background[200]};
      --${mode}-background-300: ${background[300]};
      --${mode}-background-400: ${background[400]};
      --${mode}-background-500: ${background[500]};
      --${mode}-background-600: ${background[600]};
      --${mode}-background-700: ${background[700]};
      --${mode}-background-800: ${background[800]};
      --${mode}-background-900: ${background[900]};
      --${mode}-background-1000: ${background[1000]};

      --${mode}-background: ${neutral.background};
      --${mode}-text: ${neutral.text};
      --${mode}-border: ${neutral.border};

      --${mode}-primary_rgb: ${rgb.primary};
      --${mode}-secondary_rgb: ${rgb.secondary};
      --${mode}-background_rgb: ${rgb.background};
      --${mode}-text_rgb: ${rgb.text};
      --${mode}-border_rgb: ${rgb.border};
    `;
  }

  function createSemanticVariables(mode: "light" | "dark"): string {
    const invertedMode = mode === "light" ? "dark" : "light";

    return `
      --semantic-stroke-default: var(--${mode}-border);
      --semantic-text-default: var(--${mode}-text);
      --semantic-text-inverted: var(--${invertedMode}-text);
      --semantic-background-default: var(--${mode}-background-500);
      --semantic-background-inverted: var(--${invertedMode}-background-500);
      --semantic-stroke-highlight: var(--${mode}-primary-500);
      --semantic-text-highlight: var(--${mode}-primary-500);
      --semantic-background-highlight: var(--${mode}-primary-500);

      --semantic-stroke-default_rgb: var(--${mode}-border_rgb);
      --semantic-text-default_rgb: var(--${mode}-text_rgb);
      --semantic-text-inverted_rgb: var(--${invertedMode}-text_rgb);
      --semantic-background-default_rgb: var(--${mode}-background_rgb);
      --semantic-background-inverted_rgb: var(--${invertedMode}-background_rgb);
      --semantic-stroke-highlight_rgb: var(--${mode}-primary_rgb);
      --semantic-text-highlight_rgb: var(--${mode}-primary_rgb);
      --semantic-background-highlight_rgb: var(--${mode}-primary_rgb);

      --semantic-background-alternate: ${
        mode === "dark"
          ? `var(--${mode}-background-300)`
          : `var(--${mode}-background-700)`
      };
          
      --semantic-text-hover: ${
        mode === "dark"
          ? `var(--${mode}-primary-100)`
          : `var(--${mode}-primary-900)`
      };
      
      --semantic-stroke-hover: ${
        mode === "dark"
          ? `var(--${mode}-primary-100)`
          : `var(--${mode}-primary-900)`
      };

            
      --semantic-stroke-light: ${
        mode === "dark"
          ? `var(--${mode}-background-200)`
          : `var(--${mode}-background-800)`
      };

      --semantic-background-hover: ${
        mode === "dark"
          ? `var(--${mode}-primary-100)`
          : `var(--${mode}-primary-900)`
      };

       --semantic-text-hover_rgb: ${
         mode === "dark"
           ? `var(--${mode}-primary-100_rgb)`
           : `var(--${mode}-primary-900_rgb)`
       };

      --semantic-stroke-hover_rgb: ${
        mode === "dark"
          ? `var(--${mode}-primary-100_rgb)`
          : `var(--${mode}-primary-900_rgb)`
      };

      --semantic-background-hover_rgb: ${
        mode === "dark"
          ? `var(--${mode}-primary-100_rgb)`
          : `var(--${mode}-primary-900_rgb)`
      };
      
      
    `;
  }

  return `
    :host {
      ${createVariables("light")}
      ${createVariables("dark")}
    }
    
    @media (prefers-color-scheme: dark) {
      :host([theme='${Mode.AUTO}']) {
        ${createSemanticVariables("dark")}
      }
    }
    
    @media (prefers-color-scheme: light) {
      :host([theme='${Mode.AUTO}']) {
        ${createSemanticVariables("light")}
      }
    }

    :host([theme='${Mode.LIGHT}']) {
      ${createSemanticVariables("light")}
    }

    :host([theme='${Mode.DARK}']) {
      ${createSemanticVariables("dark")}
    }
  `;
}
