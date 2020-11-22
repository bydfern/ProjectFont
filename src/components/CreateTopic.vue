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
export default {
  name: "CreateTopic",
  data() {
            return { 
                title: "",
                detail: "",
                subject: "",
                email: sessionStorage.getItem('email')
            };
        },
  methods: {
       createTopic() {
            if(this.title != "" && this.detail != "" && this.subject != ""){
                console.log("create topic success...");
                let payload = { title: this.title, detail: this.detail, subject: this.subject , email: this.email};
                this.$store.dispatch("addTopic", payload);
                this.$router.replace("Home");
            }else{
                alert("กรอกข้อมูลให้ครบ");
            }
       },
       backTohome(){
          this.$router.replace("Home");
       }
  }
}
</script>