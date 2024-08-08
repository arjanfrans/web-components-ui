const PREFIX = "hb"

export function register(
    name: string,
    constructor: CustomElementConstructor,
    options?: ElementDefinitionOptions
): void {
    window.customElements.define(`${PREFIX}-${name}`, constructor, options)
}

export function getPrefix() {
    return PREFIX
}
