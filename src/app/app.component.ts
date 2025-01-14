import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly VAPID_PUBLIC_KEY =
    'BPE45LPjX4r2n9-Gd4aL5OhghbtInabVNJnVr1RiUtwAltXIgAZqkB0tEgaiPuLEg-qQfg7NwVvxHfyhKK2ifWQ';
  posturl = '';

  constructor(private swPush: SwPush, private http: HttpClient) {
    this.swPush.messages.subscribe((message) => {
      console.log(message);
    });
  }

  subscribe() {
    console.log('postring to', this.posturl);
    this.http.post(this.posturl, { subscription: 'yeahbaby' }).subscribe();
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => {
        console.log(JSON.stringify(sub));
        this.http.post(this.posturl, sub).subscribe();
      });
  }
}
