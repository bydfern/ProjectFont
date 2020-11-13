<template>
  <div class="container fluid">
    <br />
    
      <div class="card">
        <div class="card-header">
          <h2>เข้าสู่ระบบ</h2>
        </div>
        <div class="card-body">
          <form @submit="loginWithEmail">
            <div class="form-group">
              <label>อีเมล</label>
              <input v-model="email" type="text" class="form-control" placeholder="กรอกอีเมล..."/>
            </div>

            <div class="form-group">
              <label>รหัสผ่าน</label>
              <input v-model="password" id="myInput" type="password" class="form-control" placeholder="กรอกรหัสผ่าน..."/>
              <input type="checkbox" v-on:click="myFunction()"> แสดงรหัสผ่าน
            </div>         
            

          <router-link :to="{name: 'Register'}" class="nav-link">สมัครสมาชิก</router-link>
          <router-link :to="{name: 'ResetPass'}" class="nav-link">ลืมรหัสผ่าน หรือไม่?</router-link>
          <div class="nav-right">
            <button type="submit" value="submit" class="btn btn-success">ตกลง</button>&nbsp;
            <button type="reset" class="btn btn-danger">ยกเลิก</button>
          </div>
          </form>
        </div>
      </div>

  </div>
</template>


<script>
import firebase from 'firebase/app'
export default {
  name: "LoginPage",
  data: function() {
            return { email: "", password: "" };
  },
  methods: {
       loginWithEmail(e) {

            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                 () => {
                   if(this.email){
                      console.log("Session...");
                      let payload = { email: this.email};
                      this.$store.dispatch("addSession", payload);
                    }
                   console.log("เข้าสู่ระบบสำเร็จ!!!");
                   this.$router.replace("Home");
                 },
                 err => {
                    alert(err.message)
                 });
            e.preventDefault();
       },myFunction() {
          var x = document.getElementById("myInput");
          if (x.type === "password") {
            x.type = "text";
          } else {
            x.type = "password";
          }
        }
  }
}

</script>

<style>
.nav-right {
  float: right;
  padding: 14px 22px;
}
</style>