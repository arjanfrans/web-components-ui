import { register } from "./framework/register"
import { generateColorPalette, generateCSSVariables } from "./framework/color-palette"

export class Theme extends HTMLElement {
    private shadow: ShadowRoot
    private styleElement?: HTMLElement = undefined
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
    }

    constructor() {
        super()
        // Attach the shadow root
        this.shadow = this.attachShadow({ mode: "open" })

        const slot = document.createElement("slot")
        this.shadow.append(slot)

        this.updateStyles()
    }

    static get observedAttributes() {
        return [
            "--hb-font-family-heading",
            "--hb-font-family-default",
            "--hb-font-size-title",
            "--hb-font-size-lg",
            "--hb-font-size-md",
            "--hb-font-size-sm",
            "--hb-font-size-default",
            "--hb-color-primary",
            "--hb-color-text",
            "--hb-color-background",
        ]
    }

    attributeChangedCallback() {
        this.updateStyles()
    }

    updateStyles() {
        const fontSizeTitle = this.getAttribute("--hb-font-size-title") || this.defaultStyles.fontSizeTitle
        const fontSizeLarge = this.getAttribute("--hb-font-size-lg") || this.defaultStyles.fontSizeLarge
        const fontSizeMedium = this.getAttribute("--hb-font-size-md") || this.defaultStyles.fontSizeMedium
        const fontSizeSmall = this.getAttribute("--hb-font-size-sm") || this.defaultStyles.fontSizeSmall
        const fontSizeDefault = this.getAttribute("--hb-font-size-default") || this.defaultStyles.fontSizeDefault

        const fontFamilyDefault = this.getAttribute("--hb-font-family-default") || this.defaultStyles.fontFamilyDefault
        const fontFamilyHeading = this.getAttribute("--hb-font-family-heading") || this.defaultStyles.fontFamilyHeading

        const colorPrimary = this.getAttribute("--hb-color-primary") || this.defaultStyles.colorPrimary
        const colorTextLight = this.getAttribute("--hb-color-text-light") || this.defaultStyles.colorTextLight
        const colorTextDark = this.getAttribute("--hb-color-text-dark") || this.defaultStyles.colorTextDark

        const colorBackgroundLight =
            this.getAttribute("--hb-color-background-light") || this.defaultStyles.colorBackgroundLight
        const colorBackgroundDark =
            this.getAttribute("--hb-color-background-dark") || this.defaultStyles.colorBackgroundDark

        const cardMediaSizeLarge = this.getAttribute("--hb-card-media-size-lg") || this.defaultStyles.cardMediaSizeLarge
        const cardMediaSizeMedium =
            this.getAttribute("--hb-card-media-size-md") || this.defaultStyles.cardMediaSizeMedium
        const cardMediaSizeSmall = this.getAttribute("--hb-card-media-size-sm") || this.defaultStyles.fontSizeSmall

        const palette = generateColorPalette(
            colorPrimary, // Primary color
            colorTextLight, // Light mode text color
            colorBackgroundLight, // Light mode background color
            colorTextDark, // Dark mode text color
            colorBackgroundDark // Dark mode background color
        )
        const cssVariables = generateCSSVariables(palette)

        if (this.styleElement) {
            this.shadow.removeChild(this.styleElement)
        }

        this.styleElement = document.createElement("style")

        this.styleElement.textContent = `
            :host {
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
        `

        this.shadow.appendChild(this.styleElement)
    }
}

register("theme", Theme)
