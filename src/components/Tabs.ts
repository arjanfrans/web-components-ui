import { register, getPrefix } from "./framework/register";

export class Tabs extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        --tab-button-bg: rgba(var(--semantic-background-inverted_rgb), 0.1);
        --tab-button-active-bg: var(--semantic-background-default);
        --tab-button-border: 1px solid rgba(var(--semantic-background-inverted_rgb), 0.1);
        --tab-button-active-border: 2px solid var(--semantic-stroke-highlight);
        --tab-panel-bg: var(--semantic-background-default);
        --tab-panel-border: 1px solid rgba(var(--semantic-background-inverted_rgb), 0.1);
        width: 100%;
      }

      .tab-buttons {
        display: flex;
        border-bottom: var(--tab-button-border);
        margin: 0;
        padding: 0;
        list-style: none;
        overflow: hidden; /* Ensure buttons stay within bounds */
      }

      .tab-buttons button {
        flex: 1;
        background: var(--tab-button-bg);
        border: none;
        padding: 10px;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        transition: background 0.3s, border-color 0.3s;
        text-align: center; /* Center text */
      }

      .tab-buttons button[active] {
        background: var(--tab-button-active-bg);
        border-bottom: var(--tab-button-active-border);
      }

      .tab-buttons button:hover {
        background: #e0e0e0;
      }

      .tab-panels {
        border: var(--tab-panel-border);
        padding: 10px;
        background: var(--tab-panel-bg);
      }

      .tab-panel {
        display: none;
      }

      .tab-panel[active] {
        display: block;
      }
    `;

    shadow.appendChild(style);

    // Create tab buttons container
    const tabButtonsContainer = document.createElement("div");
    tabButtonsContainer.className = "tab-buttons";
    shadow.appendChild(tabButtonsContainer);

    // Create tab panels container
    const tabPanelsContainer = document.createElement("div");
    tabPanelsContainer.className = "tab-panels";
    shadow.appendChild(tabPanelsContainer);

    // Initialize tabs
    this.initializeTabs();
  }

  private initializeTabs() {
    // Get all tab button elements and tab panel elements
    const tabButtons = Array.from(
      this.querySelectorAll(`${getPrefix()}-tab-button`),
    );
    const tabPanels = Array.from(
      this.querySelectorAll(`${getPrefix()}-tab-panel`),
    );

    if (tabButtons.length === 0 || tabPanels.length === 0) {
      console.error("No tab buttons or panels found.");
      return;
    }

    // Create tab buttons in the tab-buttons container
    tabButtons.forEach((tab) => {
      const button = document.createElement("button");
      const id = tab.getAttribute("id");
      if (id) {
        button.setAttribute("data-id", id);
        button.textContent = tab.textContent || `Tab ${id}`;
        button.addEventListener("click", () => this.selectTab(id));
        this.shadowRoot?.querySelector(".tab-buttons")?.appendChild(button);
      }
    });

    // Create tab panels in the tab-panels container
    tabPanels.forEach((panel) => {
      const div = document.createElement("div");
      const id = panel.getAttribute("id");
      if (id) {
        div.className = "tab-panel";
        div.setAttribute("data-id", id);
        div.innerHTML = panel.innerHTML;
        this.shadowRoot?.querySelector(".tab-panels")?.appendChild(div);
      }
    });

    // Select the tab based on the `selected` attribute if present
    const selectedId =
      this.getAttribute("selected") ||
      tabButtons[0]?.getAttribute("data-id") ||
      "";
    if (selectedId) {
      this.selectTab(selectedId);
    } else if (tabButtons.length > 0) {
      this.selectTab(tabButtons[0].getAttribute("data-id") || "");
    }
  }

  private selectTab(id: string) {
    // Remove active class from all buttons and panels
    this.shadowRoot
      ?.querySelectorAll(".tab-buttons button")
      .forEach((button) => button.removeAttribute("active"));
    this.shadowRoot
      ?.querySelectorAll(".tab-panel")
      .forEach((panel) => panel.removeAttribute("active"));

    // Add active class to selected tab button and panel
    const button = this.shadowRoot?.querySelector(
      `.tab-buttons button[data-id="${id}"]`,
    );
    const panel = this.shadowRoot?.querySelector(`.tab-panel[data-id="${id}"]`);
    if (button && panel) {
      button.setAttribute("active", "");
      panel.setAttribute("active", "");
    }
  }
}

register("tabs", Tabs);
