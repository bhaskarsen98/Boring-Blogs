import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  title : string;
  content: any;
  @Output('postCreated') postCreated = new EventEmitter();
  constructor() {
    
   }

  ngOnInit(): void {
  }

  createPost(){
    // firebase.firestore().settings({
    //   timestampsInSnapshots: true
    // });

    firebase.firestore().collection("posts").add({
      title: this.title,
      content: this.content,
      owner: firebase.auth().currentUser.uid,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      name : firebase.auth().currentUser.displayName
    }).then((data) => {
      console.log(data);
      this.postCreated.emit();
    }).catch((error) =>{
      console.log(error);
    })
  }

}
