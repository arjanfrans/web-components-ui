import { register, getPrefix } from "./framework/register";
import { Breakpoint } from "./variables/Breakpoint";
import {
  generateColorPalette,
  generateCSSVariables,
} from "./framework/color-palette";

export class Theme extends HTMLElement {
  private shadow: ShadowRoot;
  private styleElement?: HTMLElement = undefined;
  private defaultStyles = {
    fontSizeTitle: "2rem", // 32px / 16 = 2rem
    fontSizeLarge: "1.5rem", // 24px / 16 = 1.5rem
    fontSizeMedium: "1.125rem", // 18px / 16 = 1.125rem
    fontSizeSmall: "0.875rem", // 14px / 16 = 0.875rem
    fontSizeDefault: "1rem", // 16px / 16 = 1rem
    fontFamilyDefault: "sans-serif",
    fontFamilyHeading: "arial",
    colorPrimary: "#ed1c24",
    colorTextLight: "#000000",
    colorTextDark: "#ffffff",
    colorBackgroundLight: "#ffffff",
    colorBackgroundDark: "#000000",
    cardMediaSizeSmall: "6rem", // 96px / 16 = 6rem
    cardMediaSizeMedium: "6.75rem", // 108px / 16 = 6.75rem
    cardMediaSizeLarge: "9.75rem", // 156px / 16 = 9.75rem
  };

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    const slot = document.createElement("slot");
    this.shadow.append(slot);

    this.updateStyles();
  }

  static get observedAttributes() {
    return [
      "font-family-heading",
      "font-family-default",
      "font-size-title",
      "font-size-lg",
      "font-size-md",
      "font-size-sm",
      "font-size-default",
      "color-primary",
      "color-text-dark",
      "color-background-dark",
      "color-text-light",
      "color-background-light",
      "card-media-size-sm",
      "card-media-size-md",
      "card-media-size-lg",
    ];
  }

  attributeChangedCallback() {
    this.updateStyles();
  }

  updateStyles() {
    const fontSizeTitle =
      this.getAttribute("font-size-title") || this.defaultStyles.fontSizeTitle;
    const fontSizeLarge =
      this.getAttribute("font-size-lg") || this.defaultStyles.fontSizeLarge;
    const fontSizeMedium =
      this.getAttribute("font-size-md") || this.defaultStyles.fontSizeMedium;
    const fontSizeSmall =
      this.getAttribute("font-size-sm") || this.defaultStyles.fontSizeSmall;
    const fontSizeDefault =
      this.getAttribute("font-size-default") ||
      this.defaultStyles.fontSizeDefault;

    const fontFamilyDefault =
      this.getAttribute("font-family-default") ||
      this.defaultStyles.fontFamilyDefault;
    const fontFamilyHeading =
      this.getAttribute("font-family-heading") ||
      this.defaultStyles.fontFamilyHeading;

    const colorPrimary =
      this.getAttribute("color-primary") || this.defaultStyles.colorPrimary;
    const colorTextLight =
      this.getAttribute("color-text-light") ||
      this.defaultStyles.colorTextLight;
    const colorTextDark =
      this.getAttribute("color-text-dark") || this.defaultStyles.colorTextDark;

    const colorBackgroundLight =
      this.getAttribute("color-background-light") ||
      this.defaultStyles.colorBackgroundLight;
    const colorBackgroundDark =
      this.getAttribute("color-background-dark") ||
      this.defaultStyles.colorBackgroundDark;

    const cardMediaSizeLarge =
      this.getAttribute("card-media-size-lg") ||
      this.defaultStyles.cardMediaSizeLarge;
    const cardMediaSizeMedium =
      this.getAttribute("card-media-size-md") ||
      this.defaultStyles.cardMediaSizeMedium;
    const cardMediaSizeSmall =
      this.getAttribute("card-media-size-sm") ||
      this.defaultStyles.cardMediaSizeSmall;

    const palette = generateColorPalette(
      colorPrimary, // Primary color
      colorTextLight, // Light mode text color
      colorBackgroundLight, // Light mode background color
      colorTextDark, // Dark mode text color
      colorBackgroundDark, // Dark mode background color
    );
    const cssVariables = generateCSSVariables(palette);

    if (this.styleElement) {
      this.shadow.removeChild(this.styleElement);
    }

    this.styleElement = document.createElement("style");

    this.styleElement.textContent = `
      :host {
        display: flex;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        height: 100%;
        width: 100%;

        --${getPrefix()}-font-family-default: ${fontFamilyDefault};
        --${getPrefix()}-font-family-heading: ${fontFamilyHeading};
        --${getPrefix()}-font-size-default: ${fontSizeDefault};
        --${getPrefix()}-font-size-title: ${fontSizeTitle};
        --${getPrefix()}-font-size-lg: ${fontSizeLarge};
        --${getPrefix()}-font-size-md: ${fontSizeMedium};
        --${getPrefix()}-font-size-sm: ${fontSizeSmall};

        /* Spacing Variables */
        --${getPrefix()}-spacing-xs: 0.25rem;   /* 4px */
        --${getPrefix()}-spacing-sm: 0.5rem;    /* 8px */
        --${getPrefix()}-spacing-md: 0.75rem;   /* 12px */
        --${getPrefix()}-spacing-lg: 1rem;      /* 16px */
        --${getPrefix()}-spacing-xl: 1.25rem;   /* 20px */
        --${getPrefix()}-spacing-2xl: 1.5rem;   /* 24px */
        --${getPrefix()}-spacing-3xl: 1.75rem;  /* 28px */
        --${getPrefix()}-spacing-4xl: 2rem;     /* 32px */
        --${getPrefix()}-spacing-5xl: 2.5rem;   /* 40px */

        /* Media Sizes */
        --${getPrefix()}-card-media-size-sm: ${cardMediaSizeSmall};
        --${getPrefix()}-card-media-size-md: ${cardMediaSizeMedium};
        --${getPrefix()}-card-media-size-lg: ${cardMediaSizeLarge};
      }

      @media (min-width: ${Breakpoint.MD}px) {
        :host {
          /* Desktop Spacing Variables in rem */
          --${getPrefix()}-spacing-xs: 0.5rem;    /* 8px */
          --${getPrefix()}-spacing-sm: 1rem;      /* 16px */
          --${getPrefix()}-spacing-md: 1.5rem;    /* 24px */
          --${getPrefix()}-spacing-lg: 2rem;      /* 32px */
          --${getPrefix()}-spacing-xl: 2.5rem;    /* 40px */
          --${getPrefix()}-spacing-2xl: 3rem;     /* 48px */
          --${getPrefix()}-spacing-3xl: 3.5rem;   /* 56px */
          --${getPrefix()}-spacing-4xl: 4rem;     /* 64px */
          --${getPrefix()}-spacing-5xl: 4.5rem;   /* 72px */
        }
      }

      ${cssVariables}
    `;

    this.shadow.appendChild(this.styleElement);
  }
}

register("theme", Theme);
