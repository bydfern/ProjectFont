<template>
<div>
<div class="topnav" >
      <a href="#home">EDUCATE SPACE</a>
    <div class="topnav-right">
      <a href="#" v-for="(session,index) in $store.getters.sessions" :key="index">{{ session.email }}</a>
      <router-link :to="{name: 'Home'}">หน้าหลัก</router-link>
      <a href="#contact">ติดต่อ</a>
      <router-link :to="{name: 'CreateTopic'}">สร้างกระทู้</router-link>
      <router-link :to="{name: 'testshow'}">กระทู้ของฉัน</router-link>
      <div class="btn">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ตัวเลือก
      </button>
      
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" v-for="(session,index) in $store.getters.sessions" :key="index">
            <a class="dropdown-item" v-on:click="signout(index,session._id)">ออกจากระบบ</a>
            <a class="dropdown-item" v-on:click="updatepass(session.email)">แก้ไขรหัสผ่าน</a>
            <a class="dropdown-item" v-on:click="editAccount()">แก้ไขโปรไฟล์</a>
            <a class="dropdown-item" v-on:click="deleteaccount()">ปิดบัญชีผู้ใช้</a>
        </div> 
      </div>
    </div>
</div>

<div class="container fluid">
  <br/>
      <div class="card">
        <div class="card-header">
          <h2>รวมกระทู้</h2>
        </div>
        <div class="card-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th style="width: 58.33%">เรื่อง</th>
                <th style="width: 36.66%">วิชา</th>
                <th style="width: 5%"></th>
              </tr>
            </thead>
            <tbody v-for="(document,index) in $store.getters.collections" :key="index">
              <tr>
                <td>{{ document.title }}</td>
                <td>{{ document.subject }}</td>
                <td><button
                    type="button"
                    class="btn btn-primary"
                    v-on:click="addselect(document.title)"
                  >View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  </div>
</div>
</template>

<script>
    import firebase from "firebase";
   // import { store } from "./store/store";
    export default{
        name: "Home",
        beforeCreate() {
            firebase.auth().onAuthStateChanged((user) => {
                if (!user) {
                this.$router.replace("/")
                //alert("You don't have a permission")
                }
            });
        },
        methods: {
            created(){
              this.fetchTopic();
              this.fetchMember();
            },
            signout(index,_id) {
                let payload = { index: index , _id: _id}
                this.$store.dispatch("deleteSession", payload);
                firebase.auth().signOut().then(() => {
                    this.$router.replace("home");
                    console.log("ออกจากระบบแล้ว!!!");
                });
            },
            deleteaccount(){
                firebase.auth().currentUser.delete().then(() => {
                    this.$router.replace("/");
                });

            },
            updatepass(email) {
            var auth = firebase.auth();
            var emailAddress = email;

            auth.sendPasswordResetEmail(emailAddress).then(
                 () => {
                    console.log("ส่งอีเมล เพื่อแก้ไขรหัสผ่านเรียบร้อย");
                    alert("กรุณาตรวจสอบอีเมลของคุณ เพื่อแก้ไขรหัสผ่าน")
                 },
                 err => {
                    alert(err.message)
                 });
            },
            fetchTopic(){
              this.$store.dispatch("fetchTopic");
            },
            fetchMember(){
              this.$store.dispatch("fetchMember");
            },editAccount(){
              this.$router.replace("Edit_Account");
            },opendetail(){
              this.$router.replace("/Detail_Topic");
            },
            addselect(title){
              let payload = { title: title};
              this.$store.dispatch("addSelect", payload);
              console.log("เพิ่มข้อมูลลง select แล้ว"+title);
              this.$router.replace("/Detail_Topic");
            }
        }
    };
</script>

<style>
.topnav {
    background-color: rgb(48, 47, 47);
    overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #ffffff;
  text-align: center;
  padding: 14px 22px;
  text-decoration: none;
  font-size: 14px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: rgb(206, 206, 206);
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #4bd131;
  color: white;
}

/* Right-aligned section inside the top navigation */
.topnav-right {
  float: right;
}
</style>