import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';

import { Observable, BehaviorSubject, from } from 'rxjs';
import { bot } from './_models'

// Message class for displaying messages in the component
export class Message {

  constructor(public content: any, public sentBy: string, public num: number) { }
}

@Injectable()
export class ChatService {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  constructor() { }
  public bot: bot[];
  public user: string[];
  public bots: string[];
  public botsfacebook: string[];
  //public replies: string[];
  public rep: string[];
  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    this.user = [];
    this.user.push(msg);
    const userMessage = new Message(this.user, 'user', 0);
    console.log(userMessage);
    this.update(userMessage);

    return this.client.textRequest(msg)
      .then(res => {
        console.log(res);
        this.botsfacebook = [];
        this.bots = [];
        this.bot = res.result.fulfillment.messages;
        console.log(res.result.fulfillment.messages);
        console.log(this.bot);
        for (var i = 0; i < this.bot.length; i++) {
          if (this.bot[0].platform = 'facebook') {

            var replies = this.bot[0].replies;
            console.log(replies);


          }
          var url = undefined;
          url = this.bot[0].url;
          if (this.bot[i].speech != undefined) {
            this.bots.push(this.bot[i].speech);
          }
        }
        console.log(this.bots);
        const botMessage = new Message(this.bots, 'bot', 1);
        const botMessagefacebook = new Message(replies, 'bot', 2);
        if (url != undefined) {
          const botMessageurl = new Message(url, 'bot', 3);
          this.update(botMessageurl);
          console.log(botMessageurl);
        }
        this.update(botMessage);
        this.update(botMessagefacebook);

        console.log(botMessage);
        console.log(botMessagefacebook);

      });
  }



  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

}