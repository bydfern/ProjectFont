<template>
    <div class="container fluid">
    <br />
      <div class="card">
        <div class="card-header">
          <h2>สร้างกระทู้</h2>
        </div>
        <div class="card-body">
          <form @submit="createTopic()">
            <div class="form-group">
              <label>ชื่อเรื่อง</label>
              <input v-model="title" type="text" class="form-control" placeholder="ชื่อเรื่อง.."/>
            </div>

            <div class="form-group">
              <label>รายละเอียด</label>
              <input v-model="detail" type="text" class="form-control" placeholder="รายละเอียด.." />
            </div>

            <div class="form-group">
              <label >เกี่ยวกับวิชา</label>
              <select class="form-control" v-model="subject">
                <option>DATABASE</option>
                <option>DATA COMUNICATION</option>
                <option>COMPUTER PROGRAMING</option>
              </select>
            </div>

            <div class="form-group">
              <label>อัพโหลดไฟล์ประกอบ</label>
              <input type="file" @change="setFileData" accept="*" class="mx-3">
            </div>

            <div class="nav-right">
                <button type="submit" value="submit" class="btn btn-success">สร้าง</button>&nbsp;
                <button type="reset" class="btn btn-danger">ยกเลิก</button>&nbsp;
                <button type="button" class="btn btn-secondary" v-on:click="backTohome()">กลับ</button>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";

export default {
  name: "CreateTopic",
  data() {
            return { 
                title: "",
                detail: "",
                subject: "",
                email: sessionStorage.getItem('email'),
                fileData: null
            };
        },
  methods: {
      async createTopic() {
        if(this.title != "" && this.detail != "" && this.subject != ""){
          let payload = { title: this.title, detail: this.detail, subject: this.subject , email: this.email};
          if (this.fileData != null) {
            console.log(this.fileData)
            const name = Date.now().toString()
            console.log(name)
            console.log(payload)
            const fileRef = firebase.storage().ref(name).put(this.fileData)
            const uploadComplete = await Promise.all([fileRef])
            if (uploadComplete) {
              const fileUrl = await fileRef.snapshot.ref.getDownloadURL()
              payload.fileUrl = fileUrl
            }
          }
          console.log(payload)
          console.log("create topic success...");
          this.$store.dispatch("addTopic", payload);
          this.$router.replace("Home");
        }else{
            alert("กรอกข้อมูลให้ครบ");
        }
      },
      backTohome(){
        this.$router.replace("Home");
      },
      setFileData(event) {
        this.fileData = event.target.files[0]
      }
  }
}
</script>