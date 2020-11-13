import Vue from 'vue'
import router from './router'
import App from './App.vue'
import firebase from 'firebase/app'


Vue.config.productionTip = false;

const config = {
  apiKey: 'AIzaSyAnXWgklaVUM5DhpNeNjPwo4KMlfEEc1G8',
  authDomain: '858742457119.firebaseapp.com',
  databaseURL: 'https://858742457119.firebaseio.com',
  projectId: '858742457119',
  //storageBucket: '858742457119.appspot.com',
  storageBucket: "member-educate-space.appspot.com",
  messagingSenderId: '858742457119'
};
firebase.initializeApp(config)

// var firebaseConfig = {
//   apiKey: "AIzaSyAnXWgklaVUM5DhpNeNjPwo4KMlfEEc1G8",
//   authDomain: "member-educate-space.firebaseapp.com",
//   databaseURL: "https://member-educate-space.firebaseio.com",
//   projectId: "member-educate-space",
//   storageBucket: "member-educate-space.appspot.com",
//   messagingSenderId: "858742457119",
//   appId: "1:858742457119:web:bab071a2eecc678cdee62a"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
