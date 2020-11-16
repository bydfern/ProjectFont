<template>
  <div class="container fluid">
    <br />
    <div>
      <div class="card">
        <div class="card-header">
          <h2>แก้ไขโปรไฟล์</h2>
        </div>
        <div class="card-body">
          <table class="table table-hover">
            <thead>
              <tr>
                <th style="width: 10%">ชื่อจริง</th>
                <th style="width: 10.33%">นามสกุล</th>
                <th style="width: 11.66%">วันเกิด</th>
                <th style="width: 20">มหาวิทยาลัย</th>
                <th style="width: 20%">คณะ</th>
                <th style="width: 18%">สาขา</th>
                <!-- <th style="width: 10%">เปลี่ยนรูปโปรไฟล์</th> -->
                <th></th>
              </tr>
            </thead>
            <tbody v-for="(member,index) in $store.getters.members" :key="index">
              <tr v-if="currentEmail == member.email">
                <td v-if="index !== editIndex">{{ member.realname }}</td>
                <td v-if="index !== editIndex">{{ member.surname }}</td>
                <td v-if="index !== editIndex">{{ member.birthdate }}</td>
                <td v-if="index !== editIndex">{{ member.univer }}</td>
                <td v-if="index !== editIndex">{{ member.faculty }}</td>
                <td v-if="index !== editIndex">{{ member.department }}</td>
                <!-- <td v-if="index !== editIndex"><input type="file" @change="previewImage" accept="image/*" ></td> -->
                <td v-if="index !== editIndex">
                  <button
                    type="button"
                    class="btn btn-warning"
                    v-on:click="openEdit(index,member)"
                  >แก้ไข</button>
                </td>

                <td v-if="index === editIndex">
                  <input type="text" :value="realname" v-on:change="realname = $event.target.value" placeholder="ชื่อจริง" />
                </td>
                <td v-if="index === editIndex">
                  <input type="text" :value="surname" v-on:change="surname = $event.target.value" placeholder="นามสกุล" />
                </td>
                <td v-if="index === editIndex">
                  <input type="text" :value="birthdate" v-on:change="birthdate = $event.target.value" placeholder="วันเกิด" />
                </td>
                <td v-if="index === editIndex">
                  <input type="text" :value="univer" v-on:change="univer = $event.target.value" placeholder="มหาวิทยาลัย" />
                </td>
                <td v-if="index === editIndex">
                  <input type="text" :value="faculty" v-on:change="faculty = $event.target.value" placeholder="คณะ" />
                </td>
                <td v-if="index === editIndex">
                  <input type="text" :value="department" v-on:change="department = $event.target.value" placeholder="สาขา" />
                </td>
                <td v-if="index === editIndex">
                  <button type="button" class="btn btn-success" v-on:click="editMember(member._id)">ตกลง</button>&nbsp;
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
import * as firebase from "firebase/app";
export default {
  data() {
    return {
      editIndex: -1,
      realname: "",
      surname: "",
      birthdate: "",
      univer: "",
      faculty: "",
      department: "",
      imageData: null,
      currentEmail: ''
    };
  },
  created(){
    this.fetchMember();
    this.fetchSession();
    this.fetchCurrentEmail()
  },
  methods: {
    fetchSession(){
      this.$store.dispatch("fetchSession");
    },
    fetchMember(){
      this.$store.dispatch("fetchMember");
    },
    openEdit(index, member) {
      this.editIndex = index;
      this.realname = member.realname;
      this.surname = member.surname;
      this.birthdate = member.birthdate;
      this.univer = member.univer;
      this.faculty = member.faculty;
      this.department = member.department;
    },
    closeEdit() {
      this.editIndex = -1;
      this.realname = "";
      this.surname = "";
      this.birthdate = "";
      this.univer = "";
      this.faculty = "";
      this.department = "";
    },
    editMember(_id) {
      let payload = {
        index: this.editIndex,
        _id: _id,
        realname: this.realname,
        surname: this.surname,
        birthdate: this.birthdate,
        univer: this.univer,
        faculty: this.faculty,
        department: this.department
      };
      this.$store.dispatch("editMember", payload).then(this.closeEdit());
      if(this.imageData != null){
              const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
              storageRef.on(`state_changed`,()=>{}, error=>{console.log(error.message)});
      }
    },
    backTohome(){
      this.$router.replace("Home");
    },
    previewImage(event) {
      this.imageData = event.target.files[0];
    },
    fetchCurrentEmail() {
      this.currentEmail = this.$store.state.currentEmail
    }
  }
};
</script>