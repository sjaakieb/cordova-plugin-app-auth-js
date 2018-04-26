declare global {
    interface Window { SafariViewController: any; }
}

export class Agent {
  public static open(url: string) {
    window.SafariViewController.isAvailable((available: boolean) => {
      if (available) {
        window.SafariViewController.show({url, enterReaderModeIfAvailable: true});
      } else {
        window.open(url);
      }
    });
  }
}
