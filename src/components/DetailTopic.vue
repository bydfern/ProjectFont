<template>
  <div class="container fluid">
    <br />
    <div>
      <div class="card">
        <div class="card-header">
        <!-- <div v-for="(detail,idex) in $store.getters.selects" :key="idex"> -->
          <h2>กระทู้ {{ selectedTopic.title }}</h2>
        <!-- </div> -->
        </div>
        <div class="card-body">
        <!-- <div v-for="(detail,idex) in $store.getters.selects" :key="idex"> -->
          <table class="table table-hover">
            <thead>
              <tr>
                <!-- <th style="width: 8.33%">ลำดับ</th>-->
                <th style="width: 30%">เรื่อง</th>
                <th style="width: 20%">รายละเอียด</th>
                <th style="width: 30%">วิชา</th>
                <th style="width: 10%">ลิ้งไฟล์แนบ</th>
                <th style="width: 10%">เจ้าของ</th>
              </tr>
            </thead>
            <!-- <tbody v-for="(document,index) in $store.getters.collections" :key="index"> -->
              <!-- <tr v-if="detail.title == document.title"> -->
              <tr>
                <td>{{ selectedTopic.title }}</td>
                <td>{{ selectedTopic.detail }}</td>
                <td>{{ selectedTopic.subject }}</td>
                <td><a :href="selectedTopic.fileUrl">Link</a></td>
                <td>{{ selectedTopic.email }}</td>
              </tr>
            <!-- </tbody> -->
          </table>

          <div class="nav-right">
            <button type="button" class="btn btn-secondary" v-on:click="backTohome()">กลับ</button>
          <!-- </div> -->
        </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default{
         data() {
            return {
            title: "",
            detail: "",
            subject: "",
            selectedTopic: {}
            };
  },
  created(){
    this.fetchTopic();
    this.fetchSelect();
    this.fetchSelectedTopic()
  },
  methods: {
        fetchSelect(){
            this.$store.dispatch("fetchSelect");
        },
        fetchTopic(){
            this.$store.dispatch("fetchTopic");
        },
        fetchSelectedTopic() {
          this.selectedTopic = this.$store.state.selectedTopic
        },
        backTohome(){
            //alert(_id);
            this.$router.replace("Home");
        }
  }
};
</script>

