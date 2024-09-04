export function stretchStyle() {
  return `
        :host([stretch-vertical]) {
            height: 100%;
        }
        
        :host([stretch-horizontal]) {
            width: 100%;
        }
    `;
}
