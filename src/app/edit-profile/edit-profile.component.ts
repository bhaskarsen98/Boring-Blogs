import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { error } from 'protractor';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any = {};
  message: string;
  // userId: string;
  constructor() { 
    this.getProfile();
    // this.userId = firebase.auth().currentUser.uid;
  }

  ngOnInit(): void {
  }

  getProfile(){
    let userId = firebase.auth().currentUser.uid;
    firebase.firestore().collection("users").doc(userId).get().then((documentSnapshot) => {

      this.user = documentSnapshot.data();
      this.user.displayName = this.user.firstName + " " + this.user.lastName;
      this.user.id = documentSnapshot.id;
      // console.log(this.user);
      // console.log(documentSnapshot.id);
      // console.log(userId);

    }).catch((error) => {
      console.log(error);
    })

  }
  update() {
    this.message = "Updating your profile . . .";
    firebase.auth().currentUser.updateProfile({
      displayName: this.user.displayName,
      photoURL: this.user.photoURL
    }).then(() => {
      let userId = firebase.auth().currentUser.uid;
      firebase.firestore().collection("users").doc(userId).update({
        first_name: this.user.displayName.split(' ')[0],
        last_name: this.user.displayName.split(' ')[1],
        hobbies: this.user.hobbies,
        interests: this.user.interests,
        bio: this.user.bio
      }).then(() => {
        this.message = "Updated successfully";
      }).catch((error) => {
        // this.message = error;
        console.log(error);
      })
    }).catch((error) => {
      console.log(error);
    })
  }
}
