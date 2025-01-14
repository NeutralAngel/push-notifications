import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly VAPID_PUBLIC_KEY =
    'BPE45LPjX4r2n9-Gd4aL5OhghbtInabVNJnVr1RiUtwAltXIgAZqkB0tEgaiPuLEg-qQfg7NwVvxHfyhKK2ifWQ';

  constructor(private swPush: SwPush) {}

  subscribe() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => console.log(JSON.stringify(sub)));
  }
}
