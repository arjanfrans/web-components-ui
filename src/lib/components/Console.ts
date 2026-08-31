import { register, variable } from "../framework/register";
import { isConsoleInterceptionEnabled } from "../framework/console.ts";
import { ConsoleLogEvent } from "../framework/event/ConsoleLogEvent.ts";
import { stretchStyle } from "./styles/stretch.ts";
import { ConsoleMethod } from "../framework/ConsoleMethod.ts";

const PREFIXES: Record<ConsoleMethod, string> = {
  log: ">",
  info: "i",
  warn: "!",
  error: "x",
  debug: "#",
};

export class Console extends HTMLElement {
  private logElement: HTMLElement;
  private capturing = false;
  private onWindowError = (event: ErrorEvent) => {
    this.addEntry("error", [event.error ?? event.message]);
  };
  private onUnhandledRejection = (event: PromiseRejectionEvent) => {
    this.addEntry("error", ["Unhandled rejection:", event.reason]);
  };
  private onConsoleLog = (event: ConsoleLogEvent) => {
    if (!isConsoleInterceptionEnabled()) {
      return;
    }

    this.addEntry(event.detail.method, event.detail.args);
  };

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: block;
        box-sizing: border-box;
        overflow: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        font-family: ${variable("font-family-code")};
        font-size: ${variable("font-size-sm")};
        line-height: 1.5;
        background-color: #1e1e1e;
        color: #d4d4d4;
        padding: ${variable("spacing-sm")};
      }
      
      ${stretchStyle()}

      .console-line {
        display: flex;
        gap: ${variable("spacing-sm")};
        white-space: pre-wrap;
        word-break: break-word;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        padding-block: 2px;
      }

      .console-line:last-child {
        border-bottom: none;
      }

      .console-prefix {
        flex-shrink: 0;
        opacity: 0.7;
      }

      .console-log .console-prefix,
      .console-log .console-message {
        color: #d4d4d4;
      }

      .console-info .console-prefix,
      .console-info .console-message {
        color: #4fc1ff;
      }

      .console-warn .console-prefix,
      .console-warn .console-message {
        color: #dcdcaa;
      }

      .console-error .console-prefix,
      .console-error .console-message {
        color: #f14c4c;
      }

      .console-debug .console-prefix,
      .console-debug .console-message {
        color: #9cdcfe;
      }
    `;
    shadow.appendChild(style);

    this.logElement = document.createElement("div");
    this.logElement.className = "console-log";
    shadow.appendChild(this.logElement);
  }

  static get observedAttributes() {
    return ["passive"];
  }

  connectedCallback() {
    if (!this.hasAttribute("passive")) {
      this.startCapture();
    }
  }

  disconnectedCallback() {
    this.stopCapture();
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === "passive" && oldValue !== newValue) {
      if (this.hasAttribute("passive")) {
        this.stopCapture();
      } else {
        this.startCapture();
      }
    }
  }

  log(...args: unknown[]) {
    this.addEntry("log", args);
  }

  info(...args: unknown[]) {
    this.addEntry("info", args);
  }

  warn(...args: unknown[]) {
    this.addEntry("warn", args);
  }

  error(...args: unknown[]) {
    this.addEntry("error", args);
  }

  debug(...args: unknown[]) {
    this.addEntry("debug", args);
  }

  clear() {
    this.logElement.innerHTML = "";
  }

  private addEntry(level: ConsoleMethod, args: unknown[]) {
    const line = document.createElement("div");
    line.className = `console-line console-${level}`;

    const prefix = document.createElement("span");
    prefix.className = "console-prefix";
    prefix.textContent = PREFIXES[level];

    const message = document.createElement("span");
    message.className = "console-message";
    message.textContent = args.map((arg) => this.formatArg(arg)).join(" ");

    line.append(prefix, message);
    this.logElement.appendChild(line);
    this.scrollTop = this.scrollHeight;
  }

  private formatArg(arg: unknown): string {
    if (typeof arg === "string") {
      return arg;
    }

    if (arg instanceof Error) {
      return arg.stack || `${arg.name}: ${arg.message}`;
    }

    try {
      return JSON.stringify(arg);
    } catch {
      return String(arg);
    }
  }

  private startCapture() {
    if (this.capturing) {
      return;
    }

    this.capturing = true;

    window.addEventListener("error", this.onWindowError);
    window.addEventListener("unhandledrejection", this.onUnhandledRejection);
    window.addEventListener(
      ConsoleLogEvent.type(),
      this.onConsoleLog as EventListener,
    );
  }

  private stopCapture() {
    if (!this.capturing) {
      return;
    }

    this.capturing = false;

    window.removeEventListener("error", this.onWindowError);
    window.removeEventListener("unhandledrejection", this.onUnhandledRejection);
    window.removeEventListener(
      ConsoleLogEvent.type(),
      this.onConsoleLog as EventListener,
    );
  }
}

register("console", Console);
