let componentPrefix = "x";

export function configurePrefix(prefix: string): void {
  componentPrefix = prefix;
}

export function register(
  name: string,
  constructor: CustomElementConstructor,
  options?: ElementDefinitionOptions,
): void {
  window.customElements.define(
    `${componentPrefix}-${name}`,
    constructor,
    options,
  );
}

export function getPrefix() {
  return componentPrefix;
}

export function variable(name: string): string {
  return `var(--${getPrefix()}-${name})`;
}
