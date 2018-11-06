declare global {
    interface Window { SafariViewController: any; handleOpenURL: any; }
}

export class Agent {
  public static open(url: string): Promise<string> {
    return new Promise((resolve) => {
      window.SafariViewController.isAvailable((available: boolean) => {
        window.handleOpenURL = (callbackUrl: string) => {
          resolve(callbackUrl);
          window.handleOpenURL = null;
        };
        if (available) {
          window.SafariViewController.show({url, enterReaderModeIfAvailable: true});
        } else {
          window.open(url);
        }
      });
    });
  }
}
