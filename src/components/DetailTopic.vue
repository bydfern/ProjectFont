<template>
  <div class="container fluid">
    <br />
    <div>
      <div class="card">
        <div class="card-header">
        <div v-for="(detail,idex) in $store.getters.selects" :key="idex">
          <h2>กระทู้ {{ detail.title}}</h2>
        </div>
        </div>
        <div class="card-body">
        <div v-for="(detail,idex) in $store.getters.selects" :key="idex">
          <table class="table table-hover">
            <thead>
              <tr>
                <!-- <th style="width: 8.33%">ลำดับ</th>-->
                <th style="width: 20%">เรื่อง</th>
                <th style="width: 43.33%">รายละเอียด</th>
                <th style="width: 16.66%">วิชา</th>
                <th style="width: 20">เจ้าของ</th>
              </tr>
            </thead>
            <tbody v-for="(document,index) in $store.getters.collections" :key="index">
              <tr v-if="detail.title == document.title">
                <td>{{ document.title }}</td>
                <td>{{ document.detail }}</td>
                <td>{{ document.subject }}</td>
                <td>{{ document.email }}</td>
              </tr>
            </tbody>
          </table>

          <div class="nav-right">
            <button type="button" class="btn btn-secondary" v-on:click="backTohome(detail._id)">กลับ</button>
          </div>
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
            subject: ""
            };
  },
  created(){
    this.fetchTopic();
    this.fetchSelect();
  },
  methods: {
        fetchSelect(){
            this.$store.dispatch("fetchSelect");
        },
        fetchTopic(){
            this.$store.dispatch("fetchTopic");
        },
        backTohome(_id){
            //alert(_id);
            let payload = {index: 0 ,_id: _id}
            this.$store.dispatch("deleteSelect", payload);
            this.$router.replace("Home");
        }
  }
};
</script>

