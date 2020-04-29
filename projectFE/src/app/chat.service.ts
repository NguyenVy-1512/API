import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient';

import { Observable, BehaviorSubject, from } from 'rxjs';
import {bot} from './_models'

// Message class for displaying messages in the component
export class Message {

  constructor(public content: string[], public sentBy: string) {}
}

@Injectable()
export class ChatService {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);

  constructor() {}
  public bot: bot[];
  public user: string[];
  public bots: string[];
  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    this.user = [];
    this.user.push(msg);
    const userMessage = new Message(this.user, 'user');
    console.log(userMessage);
    this.update(userMessage);

    return this.client.textRequest(msg)
               .then(res => {
                 console.log(res);
                 this.bots = [];
                  this.bot = res.result.fulfillment.messages;
                  for (var i=0; i <this.bot.length; i++)
                  {
                    this.bots.push(this.bot[i].speech);
                  }
                  console.log(this.bots);
                  const botMessage = new Message(this.bots, 'bot');
                  this.update(botMessage);
                  console.log(botMessage);
               });
  }



  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

}