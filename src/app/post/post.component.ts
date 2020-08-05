import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('post') post: any;
  @Output('onDelete') onDelete = new EventEmitter();

  postData: any = {};
  user: any = {};
  constructor() { 
  }

  ngOnInit(): void {
    this.postData = this.post.data();
    this.user = firebase.auth().currentUser;
    // console.log(this.postData)
  }
  delete(){
    firebase.firestore().collection("posts").doc(this.post.id).delete().then(() => {
      alert("Post deleted sucessfully");
      this.onDelete.emit();
    })
  }
}
