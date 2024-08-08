export class InvalidChildrenError extends Error {
    constructor(element: HTMLElement, allowedChildTags: string[]) {
        super(
            `${element.tagName.toLowerCase()} can only have the following direct children: ${allowedChildTags.join(
                ", "
            )}`
        )
    }
}
