<template>
  <div class="container fluid">
    <br />
    <div>
      <div class="card">
        <div class="card-header">
          <h2>กระทู้ของฉัน</h2>
        </div>
        <div class="card-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <!-- <th style="width: 8.33%">ลำดับ</th>-->
                <th style="width: 15%">เรื่อง</th>
                <th style="width: 28.33%">รายละเอียด</th>
                <th style="width: 11.66%">วิชา</th>
                <th style="width: 20">อีเมล์</th>
                <th style="width: 25%">การกระทำ</th>
              </tr>
            </thead>
            <tbody v-for="(document,index) in topics" :key="index">
              <tr v-if="currentEmail == document.email">
                <!-- <td>{{ index + 1 }}</td> -->
                <td v-if="index !== editIndex">{{ document.title }}</td>
                <td v-if="index !== editIndex">{{ document.detail }}</td>
                <td v-if="index !== editIndex">{{ document.subject }}</td>
                <td v-if="index !== editIndex">{{ document.email }}</td>
                <td v-if="index !== editIndex">
                  <button
                    type="button"
                    class="btn btn-warning"
                    v-on:click="openEdit(index,document)"
                  >แก้ไข</button>&nbsp;
                  <button
                    type="button"
                    class="btn btn-danger mr-2"
                    v-on:click="deleteTopic(index,document._id)"
                  >ลบเรื่อง</button>
                </td>

                <td v-if="index === editIndex">
                  <input type="text" :value="title" v-on:change="title = $event.target.value" placeholder="new title" />
                </td>
                <td v-if="index === editIndex">
                  <input type="text" :value="detail" v-on:change="detail = $event.target.value" placeholder="new detail" />
                </td>
                <td v-if="index === editIndex">
                    <select class="form-control" v-model="subject" v-on:change="subject = $event.target.value">
                      <option>DATABASE</option>
                      <option>DATA COMUNICATION</option>
                      <option>COMPUTER PROGRAMING</option>
                    </select>
                </td>
                <td v-if="index === editIndex"></td>
                <td v-if="index === editIndex">
                  <button type="button" class="btn btn-success" v-on:click="editTopic(document._id)">ตกลง</button>&nbsp;
                  <button type="button" class="btn btn-secondary mr-2" v-on:click="closeEdit(index)">ยกเลิก</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="nav-right">
            <button type="button" class="btn btn-secondary" v-on:click="backTohome()">กลับ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      editIndex: -1,
      title: "",
      detail: "",
      subject: "",
      currentEmail: sessionStorage.getItem('email'),
      topics: []
    };
  },
  created(){
    this.fetchTopic();
    this.fetchSession();
    this.getTopic();
  },
  methods: {
    fetchSession(){
      this.$store.dispatch("fetchSession");
    },
    fetchTopic(){
      this.$store.dispatch("fetchTopic");
    },
    deleteTopic(index,_id) {
      let payload = { index: index , _id: _id}
      this.topics.splice(index, 1)
      this.$store.dispatch("deleteTopic", payload);
    },
    openEdit(index, document) {
      this.editIndex = index;
      this.title = document.title;
      this.detail = document.detail;
      this.subject = document.subject;
    },
    closeEdit() {
      this.editIndex = -1;
      this.title = "";
      this.detail = "";
      this.subject = "";
    },
    editTopic(_id) {
      let payload = {
        index: this.editIndex,
        _id: _id,
        title: this.title,
        detail: this.detail,
        subject: this.subject
      };
      this.topics[this.editIndex] = { email: this.currentEmail, ...payload }
      this.$store.dispatch("editTopic", payload).then(this.closeEdit());
    },
    backTohome(){
      this.$router.replace("Home");
    },
    getTopic() {
      this.topics = this.$store.state.collections
    }
  }
};
</script>