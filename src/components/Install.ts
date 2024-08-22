import { isPWAInstalled } from "../pwa/install";
import { getPrefix, register, variable } from "../framework/register";

export class Install extends HTMLElement {
  private installPromptEvent: BeforeInstallPromptEvent | null = null;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");

    (async () => {
      if (await isPWAInstalled()) {
        return;
      }

      style.textContent = `
      :host {
        display: block;
        background-color: var(--semantic-background-default);
        color: var(--semantic-text-default);
        font-family: ${variable("font-family-default")};
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
    `;

      shadow.appendChild(style);

      const slot = document.createElement("slot");
      shadow.appendChild(slot);

      const appContainer = document.querySelector(
        `${getPrefix()}-container`,
      ) as HTMLElement;

      if (appContainer) {
        appContainer.style.display = "none";
      }

      const installButton = this.querySelector("#install") as HTMLElement;

      window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        this.installPromptEvent = event as BeforeInstallPromptEvent;

        if (installButton) {
          installButton.style.display = "block";

          installButton.addEventListener("click", (event) => {
            event.stopPropagation();

            if (this.installPromptEvent) {
              this.installPromptEvent.prompt();

              this.installPromptEvent.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                  console.log("User accepted the A2HS prompt");

                  this.showAppContainer();
                } else {
                  console.log("User dismissed the A2HS prompt");

                  window.location.reload();

                  return;
                }

                this.installPromptEvent = null;
                this.showAppContainer();
              });
            }
          });
        }
      });

      const noInstallButton = this.querySelector("#no-install") as HTMLElement;

      if (noInstallButton) {
        noInstallButton.addEventListener("click", () => {
          this.showAppContainer();
        });
      }
    })();
  }

  private showAppContainer() {
    const appContainer = document.querySelector(
      `${getPrefix()}-container`,
    ) as HTMLElement;

    if (appContainer) {
      appContainer.style.display = "block";
      this.style.display = "none";
    } else {
      throw new Error("No app container found");
    }
  }
}

register("install", Install);
