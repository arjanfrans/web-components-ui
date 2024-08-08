interface ColorPalette {
    light: {
        primary: {
            50: string
            100: string
            200: string
            300: string
            400: string
            500: string
            600: string
            700: string
            800: string
            900: string
        }
        secondary: {
            50: string
            100: string
            200: string
            300: string
            400: string
            500: string
            600: string
            700: string
            800: string
            900: string
        }
        neutral: {
            background: string
            text: string
            border: string
        }
    }
    dark: {
        primary: {
            50: string
            100: string
            200: string
            300: string
            400: string
            500: string
            600: string
            700: string
            800: string
            900: string
        }
        secondary: {
            50: string
            100: string
            200: string
            300: string
            400: string
            500: string
            600: string
            700: string
            800: string
            900: string
        }
        neutral: {
            background: string
            text: string
            border: string
        }
    }
}

export function generateColorPalette(
    primaryColor: string,
    textColorLight: string,
    backgroundColorLight: string,
    textColorDark: string,
    backgroundColorDark: string
): ColorPalette {
    // Function to adjust color brightness
    function adjustColor(color: string, amount: number): string {
        let usePound = false
        if (color[0] === "#") {
            color = color.slice(1)
            usePound = true
        }
        const num = parseInt(color, 16)
        let r = (num >> 16) + amount
        r = r > 255 ? 255 : r < 0 ? 0 : r
        let b = ((num >> 8) & 0x00ff) + amount
        b = b > 255 ? 255 : b < 0 ? 0 : b
        let g = (num & 0x0000ff) + amount
        g = g > 255 ? 255 : g < 0 ? 0 : g
        return (usePound ? "#" : "") + (0x1000000 + (r << 16) + (b << 8) + g).toString(16).slice(1)
    }

    // Create shades of the primary color for light and dark modes
    function createPalette(primaryColor: string, backgroundColor: string, textColor: string, isDarkMode: boolean) {
        const borderAdjustment = isDarkMode ? 60 : -60 // Darker border for dark mode, lighter for light mode
        return {
            primary: {
                50: adjustColor(primaryColor, 100), // Very light shade
                100: adjustColor(primaryColor, 70), // Light shade
                200: adjustColor(primaryColor, 50),
                300: adjustColor(primaryColor, 30),
                400: adjustColor(primaryColor, 20),
                500: primaryColor, // Base color
                600: adjustColor(primaryColor, -10), // Darker shade
                700: adjustColor(primaryColor, -20),
                800: adjustColor(primaryColor, -30),
                900: adjustColor(primaryColor, -50), // Very dark shade
            },
            secondary: {
                50: adjustColor(primaryColor, -100), // Example complementary color shades
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
            neutral: {
                background: backgroundColor,
                text: textColor,
                border: adjustColor(backgroundColor, borderAdjustment), // Adjust border color based on mode
            },
        }
    }

    return {
        light: createPalette(primaryColor, backgroundColorLight, textColorLight, false),
        dark: createPalette(primaryColor, backgroundColorDark, textColorDark, true),
    }
}

export function generateCSSVariables(palette: ColorPalette): string {
    function createVariables(mode: "light" | "dark"): string {
        const { primary, secondary, neutral } = palette[mode]

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

          --${mode}-background: ${neutral.background};
          --${mode}-text: ${neutral.text};
          --${mode}-border: ${neutral.border};
    `
    }

    function createSemanticVariables(mode: "light" | "dark"): string {
        const invertedMode = mode === "light" ? "dark" : "light"

        return `
      --semantic-stroke-default: var(--${mode}-border);
      --semantic-text-default: var(--${mode}-text);
      --semantic-text-inverted: var(--${invertedMode}-text);
      --semantic-background-default: var(--${mode}-background);
      --semantic-background-inverted: var(--${invertedMode}-background);
      
      --semantic-stroke-highlight: var(--${mode}-primary-500);
      --semantic-text-highlight: var(--${mode}-primary-500);
      --semantic-background-highlight: var(--${mode}-primary-500);
      --semantic-background-inverted: var(--${invertedMode}-background);
    `
    }

    // Generate CSS variables for both light and dark modes
    return `
    :host {
      ${createVariables("light")}
      ${createVariables("dark")}
    }
    
    :host([theme='light']) {
      ${createSemanticVariables("light")}
    }

    :host([theme='dark']) {
      ${createSemanticVariables("dark")}
    }
  `
}
