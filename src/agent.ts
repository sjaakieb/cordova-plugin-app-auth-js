declare global {
    interface Window { SafariViewController: any; handleOpenURL: any; }
}

export class Agent {
  public static open(url: string): Promise<string> {
    console.log('OPENING 1');
    return new Promise((resolve) => {
      console.log('RESOLVING 2');
      window.SafariViewController.isAvailable((available: boolean) => {
        console.log('SAFARI VIEW INIT', available);
        window.handleOpenURL = (callbackUrl: string) => {
          console.log('Callback', callbackUrl);
          resolve(callbackUrl);
          window.handleOpenURL = null;
        };
        if (available) {
          console.log('SAFARI');
          window.SafariViewController.show({url, enterReaderModeIfAvailable: true});
        } else {
          console.log('OPENING IN SYSTEM BROWSER');
          window.open(url, "_system");
        }
      });
    });
  }
}
