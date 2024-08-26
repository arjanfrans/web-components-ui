import { Theme } from "../components/Theme.ts";

let componentPrefix = "x";

let componentList: Array<() => void> = [];

export function configurePrefix(prefix: string): void {
  componentPrefix = prefix;
}

export function register(
  name: string,
  constructor: CustomElementConstructor,
  options?: ElementDefinitionOptions,
): void {
  componentList.push(() => {
    window.customElements.define(
      `${componentPrefix}-${name}`,
      constructor,
      options,
    );
  });
}

export function loadComponents() {
  for (const component of componentList) {
    component();
  }

  componentList = [];
}

export function getPrefix() {
  return componentPrefix;
}

export function variable(name: string): string {
  return `var(--${getPrefix()}-${name})`;
}

export function waitForComponents() {
  document.addEventListener("DOMContentLoaded", function () {
    const themeTag = `${getPrefix()}-theme`;
    const theme = document.querySelector(themeTag) as Theme | null;

    if (!theme) {
      throw new Error(`Not theme tag found: ${themeTag}`);
    }

    if (theme.style.display !== "none") {
      throw new Error(
        'Theme tag needs inline style of "display: none"  for the wait functionality to work.',
      );
    }

    if (theme && customElements.get(themeTag)) {
      theme.style.display = ""; // Remove the inline display:none
    } else {
      // Fallback if it's not yet defined, use MutationObserver to detect when it is
      customElements.whenDefined(themeTag).then(() => {
        theme.style.display = ""; // Show the element when it's defined
      });
    }
  });
}
