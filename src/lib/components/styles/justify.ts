import { mapEnum } from "../../framework/enum";
import { Justify } from "../variables/Justify";

export function justifyStyle() {
  return `
    ${mapEnum(Justify, (justify) => {
      return `
            :host([justify-content="${justify}"]) {
                justify-content: ${justify};
            }

            :host([align-items="${justify}"]) {
                align-items: ${justify};
            }
        `;
    }).join("")}
      `;
}
