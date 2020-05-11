import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable, from } from 'rxjs';
import {scan} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;

  constructor(public chat: ChatService, public router: Router) { }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable()
        .pipe (scan((acc, val) => acc.concat(val) ));
    console.log(this.messages);
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

  send(rep){
    this.chat.converse(rep);
  }
  sendurl(rep)
  {
    this.router.navigateByUrl(rep);
  }
}