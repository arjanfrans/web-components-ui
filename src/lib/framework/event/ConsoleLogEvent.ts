import { getPrefix } from "../register.ts";
import { ConsoleMethod } from "../ConsoleMethod.ts";

export interface ConsoleLogEventDetail {
  method: ConsoleMethod;
  args: unknown[];
}

export class ConsoleLogEvent extends CustomEvent<ConsoleLogEventDetail> {
  public static readonly methods: ConsoleMethod[] = [
    "log",
    "info",
    "warn",
    "error",
    "debug",
  ];

  public static type(): string {
    return `${getPrefix()}-console-log`;
  }

  constructor(detail: ConsoleLogEventDetail) {
    super(ConsoleLogEvent.type(), { detail });
  }
}
