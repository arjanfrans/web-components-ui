import { ConsoleLogEvent } from "./event/ConsoleLogEvent.ts";

let interceptionEnabled = false;
let patched = false;

export function isConsoleInterceptionEnabled(): boolean {
  return interceptionEnabled;
}

export function enableConsoleInterception(): void {
  interceptionEnabled = true;
  patchConsole();
}

export function disableConsoleInterception(): void {
  interceptionEnabled = false;
}

function patchConsole(): void {
  if (patched) {
    return;
  }
  patched = true;

  for (const method of ConsoleLogEvent.methods) {
    const original = console[method].bind(console);

    console[method] = (...args: unknown[]) => {
      original(...args);
      if (interceptionEnabled) {
        window.dispatchEvent(new ConsoleLogEvent({ method, args }));
      }
    };
  }
}
