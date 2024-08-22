interface BeforeInstallPromptEvent extends Event {
  readonly prompt: () => void;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
  }>;
}
