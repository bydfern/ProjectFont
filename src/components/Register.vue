<template>
  <div class="container fluid">
    <br />
    <div>
      <div class="card">
        <div class="card-header">
          <h2>สมัครสมาชิก</h2>
        </div>
        <div class="card-body">
          <form v-on:submit.prevent="pressed()"> 
             <div class="form-group">
              <label>ชื่อ</label>
              <input type="text" class="form-control" placeholder="กรอกชื่อ..." v-model="realname"/>
            </div>
            <div class="form-group">
              <label>นามสกุล</label>
              <input type="text" class="form-control" placeholder="กรอกนามสกุล..." v-model="surname"/>
            </div>
            <div class="form-group">
              <label>วันเกิด</label>
              <input type="text" class="form-control" placeholder="วัน/เดือน/ปี(พ.ศ.)" v-model="birthdate"/>
            </div>
            <div class="form-group">
              <label>มหาวิทยาลัย</label>
              <input type="text" class="form-control" placeholder="กรอกชื่อมหาวิทยาลัย..." v-model="univer"/>
            </div>
            <div class="form-group">
              <label>คณะ</label>
              <input type="text" class="form-control" placeholder="กรอกชื่อคณะ..." v-model="faculty"/>
            </div>
            <div class="form-group">
              <label>สาขาวิชา</label>
              <input type="text" class="form-control" placeholder="กรอกชื่อสาขาวิชา..." v-model="department"/>
            </div>
            <div class="form-group">
              <label>อีเมล</label>
              <input type="email" class="form-control" placeholder="กรอกอีเมล..." v-model="email"/>
            </div>
            <div class="form-group">
              <label>รหัสผ่าน</label>
              <input type="text" class="form-control" placeholder="กรอกรหัสผ่าน..." v-model="password"/>
            </div>
            <div class="form-group">
              <label>ยืนยันรหัสผ่าน</label>
              <input type="text" class="form-control" placeholder="กรอกรหัสผ่าน..." v-model="confirmpassword"/>
            </div>
            <div>
              <div >
                <p>เพิ่มรูปภาพโปรไฟล์</p>
                <input type="file" @change="previewImage" accept="image/*" >
              </div>
            </div>
            <br />
            <div class="nav-right">
              <button type="submit" class="btn btn-primary">ตกลง</button>&nbsp;
              <button type="reset" class="btn btn-danger">ยกเลิก</button>&nbsp;
              <button type="button" class="btn btn-secondary" v-on:click="backTohome()">กลับ</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      realname: "",
      surname: "",
      birthdate: "",
      univer: "",
      faculty: "",
      department: "",
      confirmpassword: "",
      imageData: null,
    };
  },
  methods: {
    async pressed() {
      if (this.email != "" && this.password != "" && this.realname != "" && this.surname != "" && this.email != "" && this.date != "" && this.univer != "" && this.faculty != "" && this.department != "") {
        if(this.password == this.confirmpassword){
          let payload = { realname: this.realname, surname: this.surname , birthdate: this.birthdate, univer: this.univer, faculty: this.faculty, department: this.department, email: this.email};
          if(this.imageData != null){
            // const url = await this.uploadImage()
            const task = []
            const name = Date.now().toString()
            const storageRef=firebase.storage().ref(`${name}`).put(this.imageData);
            task.push(storageRef)
            storageRef.on(`state_changed`, ()=>{}, error=>{console.log(error.message)});
            const result = await Promise.all(task)
            if (result) {
              const url = await firebase.storage().ref(name).getDownloadURL()
              console.log(url)
              payload.imageUrl = url
            }
            // payload.imageUrl = url
            // console.log(url)
          }
          this.$store.dispatch("addMember", payload);
          //ส่วนของอัพไฟล์รูป
          firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            console.log("create account success...");
            this.$router.replace({ name: "Login" });
          })
          .catch(error => (this.error = error));
          }else{
            alert("กรุณากรอกรหัสผ่านของคุณให้ตรงกัน");
          }
      }else{
        alert("กรุณากรอกข้อมูลการสมัครให้ครบ");
      }
    },
    backTohome(){
          this.$router.replace("/");
    },
    previewImage(event) {
      this.imageData = event.target.files[0];
    },
    async uploadImage() {
      const name = Date.now().toString()
      const storageRef=firebase.storage().ref(`${name}`).put(this.imageData);
      storageRef.on(`state_changed`, ()=>{}, error=>{console.log(error.message)}, async () => {
        const downloadUrl = await storageRef.snapshot.ref.getDownloadURL()
        console.log(downloadUrl)

        return downloadUrl
      });
    }
  }
};
</script>


<style>
.nav-right {
  float: right;
  padding: 14px 22px;
}
</style>