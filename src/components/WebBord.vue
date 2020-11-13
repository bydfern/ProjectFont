<template>
  <div class="container fluid">
    <br />
    <div>
      <div class="card">
        <div class="card-header">
          <h2>รวมกระทู้</h2>
        </div>
        <div class="card-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <!-- <th style="width: 8.33%">ลำดับ</th>-->
                <th style="width: 20%">เรื่อง</th>
                <th style="width: 63.33%">รายละเอียด</th>
                <th style="width: 16.66%">วิชา</th>
              </tr>
            </thead>
            <tbody v-for="(document,index) in $store.getters.collections" :key="index">
              <tr>
                <td>{{ document.title }}</td>
                <td>{{ document.detail }}</td>
                <td>{{ document.subject }}</td>
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
  created(){
    this.fetchTopic();
  },
  methods: {
    fetchTopic(){
      this.$store.dispatch("fetchTopic");
    },
    backTohome(){
      this.$router.replace("Home");
    }
  }
};
</script>