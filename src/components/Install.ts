import { getPrefix, register, variable } from "../framework/register";

export class Install extends HTMLElement {
  private installPromptEvent: BeforeInstallPromptEvent | null = null;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");

    style.textContent = `
      :host {
        display: block;
        background-color: var(--semantic-background-default);
        color: var(--semantic-text-default);
        font-family: ${variable("font-family-default")};
        width: 100%;
      }
      #install {
        display: none;
      }
    `;

    shadow.appendChild(style);

    const slot = document.createElement("slot");
    shadow.appendChild(slot);

    const appContainer = document.querySelector(`${getPrefix()}-container`) as HTMLElement;

    if (appContainer) {
      appContainer.style.display = "none";
    }

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      this.installPromptEvent = event as BeforeInstallPromptEvent;
      const installButton = this.shadowRoot?.querySelector("#install") as HTMLElement;

      if (installButton) {
        installButton.style.display = "block";
        installButton.addEventListener("click", () => {
          if (this.installPromptEvent) {
            this.installPromptEvent.prompt();
            this.installPromptEvent.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
              } else {
                console.log("User dismissed the A2HS prompt");
              }
              this.installPromptEvent = null;
              installButton.style.display = "none";
            });
          }
        });
      }
    });
  }
}

register("install", Install);
