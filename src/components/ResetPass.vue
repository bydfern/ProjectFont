<template>
    <div class="container fluid">
    <br />
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>คำแนะนำ!</strong> กรุณาตรวจสอบอีเมลที่กรอกให้ถูกต้อง.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
      <div class="card">
        <div class="card-header">
          <h2>รีเซ็ตรหัสผ่าน</h2>
        </div>
        <div class="card-body">
          <form @submit="resetPassWord">
            <div class="form-group">
              <label>อีเมล</label>
              <input v-model="email" type="text" class="form-control" placeholder="กรอกอีเมล..."/>
            </div>
            <div class="nav-right">
                <button type="submit" value="submit" class="btn btn-primary">ตกลง</button>&nbsp;
                <button type="reset" class="btn btn-danger">ยกเลิก</button>&nbsp;
                <button type="button" class="btn btn-secondary" v-on:click="backTohome()">กลับ</button>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  name: "ResetPass",
  data: function() {
            return { email: "" };
        },
  methods: {
       resetPassWord(e) {
            var auth = firebase.auth();
            var emailAddress = this.email;

            auth.sendPasswordResetEmail(emailAddress).then(
                 () => {
                    console.log("send reset success!!!");
                    this.$router.replace("/");
                 },
                 err => {
                    alert(err.message)
                 });
            e.preventDefault();
       },
       backTohome(){
          this.$router.replace("/");
       }
  }
}
</script>