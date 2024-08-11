import { register } from "./framework/register";
import {
  generateColorPalette,
  generateCSSVariables,
} from "./framework/color-palette";

export class Theme extends HTMLElement {
  private shadow: ShadowRoot;
  private styleElement?: HTMLElement = undefined;
  private defaultStyles = {
    fontSizeTitle: "32px",
    fontSizeLarge: "24px",
    fontSizeMedium: "18px",
    fontSizeSmall: "14px",
    fontSizeDefault: "16px",
    fontFamilyDefault: "sans-serif",
    fontFamilyHeading: "arial",
    colorPrimary: "#ed1c24",
    colorTextLight: "#000000",
    colorTextDark: "#ffffff",
    colorBackgroundLight: "#ffffff",
    colorBackgroundDark: "#000000",
    cardMediaSizeSmall: "96px",
    cardMediaSizeMedium: "108px",
    cardMediaSizeLarge: "156px",
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
      "color-text",
      "color-background",
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
      this.defaultStyles.fontSizeSmall;

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
                
                --hb-font-family-default: ${fontFamilyDefault};
                --hb-font-family-heading: ${fontFamilyHeading};
                --hb-font-size-default: ${fontSizeDefault};
                --hb-font-size-title: ${fontSizeTitle};
                --hb-font-size-lg: ${fontSizeLarge};
                --hb-font-size-md: ${fontSizeMedium};
                --hb-font-size-sm: ${fontSizeSmall};
                --hb-gap-5xs: 4px;
                --hb-gap-4xs: 8px;
                --hb-gap-3xs: 12px;
                --hb-gap-2xs: 16px;
                --hb-gap-xs: 20px;
                --hb-gap-sm: 24px;
                --hb-gap-md: 32px;
                --hb-gap-lg: 40px;
                --hb-gap-xl: 56px;
                --hb-gap-2xl: 64px;
                --hb-gap-3xl: 72px;
                --hb-gap-4xl: 96px;
                --hb-card-media-size-sm: ${cardMediaSizeSmall};
                --hb-card-media-size-md: ${cardMediaSizeMedium};
                --hb-card-media-size-lg: ${cardMediaSizeLarge};
            }
            
            ${cssVariables}
        `;

    this.shadow.appendChild(this.styleElement);
  }
}

register("theme", Theme);
