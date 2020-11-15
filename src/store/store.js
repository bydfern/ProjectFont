import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

let mongo_api = process.env.VUE_APP_TOPICS_API;

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    sessions: [],
    collections:[],
    members:[],
    selects:[],
    selectedTopic: {},
    currentEmail: ''
  },

  mutations: {
    fetchSession(state, { res }) {
      state.sessions = res.data;
    },
    fetchTopic(state, { res }) {
      state.collections = res.data;
    },
    fetchMember(state, { res }) {
      state.members = res.data;
    },
    fetchSelect(state, { res }) {
      state.selects = res.data;
    },
    addTopic(state, { payload }) {
      state.collections.push(payload);
    },
    deleteTopic(state, { index }) {
        state.collections.splice(index, 1);
    },
    editTopic(state, { payload }) {
        state.collections[payload.index] = { title: payload.title, detail: payload.detail, subject: payload.subject };
    },
    addSession(state, { payload }) {
      state.sessions.push(payload);
    },
    deleteSession(state, { index }) {
      state.sessions.splice(index, 1);
    },
    addMember(state, { payload }) {
      state.members.push(payload);
    },
    editMember(state, { payload }) {
      state.members[payload.index] = { realname: payload.realname, surname: payload.surname, birthdate: payload.birthdate, univer: payload.univer, faculty: payload.faculty, department: payload.department  };
    },
    addSelect(state, { payload }) {
      state.selects.push(payload);
    },
    deleteSelect(state, { index }) {
      state.selects.splice(index, 1);
    },
    addSelectedTopic(state, { payload }) {
      state.selectedTopic = payload;
    },
    setCurrentEmail(state, { email }) {
      state.currentEmail = email
    }
  },

  actions: {
    async fetchSession({ commit }) {
      await Axios.get(mongo_api+"session/")
        .then(res => commit("fetchSession", { res }))
        .catch(err => alert(err));
    },
    async fetchTopic({ commit }) {
      await Axios.get(mongo_api+"topic/")
        .then(res => commit("fetchTopic", { res }))
        .catch(err => alert(err));
    },
    async fetchMember({ commit }) {
      await Axios.get(mongo_api+"member/")
        .then(res => commit("fetchMember", { res }))
        .catch(err => alert(err));
    },
    async fetchSelect({ commit }) {
      await Axios.get(mongo_api+"select/")
        .then(res => commit("fetchSelect", { res }))
        .catch(err => alert(err));
    },
    async addTopic({ commit }, payload) {
      await Axios.post(mongo_api+"topic/", payload)
        .then(() => commit("addTopic", { payload }))
        .catch(err => alert(err));
    },
    async deleteTopic({ commit }, payload) {
      //alert(payload._id);
      await Axios.delete(mongo_api+"topic/" + payload._id)
        .then(() => commit("deleteTopic", { payload }))
        .catch(err => alert(err));
    },
    async editTopic({ commit }, payload) {
      await Axios.put(mongo_api+"topic/" + payload._id, payload)
        .then(() => commit("editTopic", { payload }))
        .catch(err => alert(err));
    },
    async addSession({ commit }, payload) {
      await Axios.post(mongo_api+"session/", payload)
        .then(() => commit("addSession", { payload }))
        .catch(err => alert(err));
    },
    async deleteSession({ commit }, payload) {
      //alert(payload._id);
      await Axios.delete(mongo_api+"session/" + payload._id)
        .then(() => commit("deleteSession", { payload }))
        .catch(err => alert(err));
    },
    async addMember({ commit }, payload) {
      await Axios.post(mongo_api+"member/", payload)
        .then(() => commit("addMember", { payload }))
        .catch(err => alert(err));
    },
    async editMember({ commit }, payload) {
      await Axios.put(mongo_api+"member/" + payload._id, payload)
        .then(() => commit("editMember", { payload }))
        .catch(err => alert(err));
    },
    async addSelect({ commit }, payload) {
      await Axios.post(mongo_api+"select/", payload)
        .then(() => commit("addSelect", { payload }))
        .catch(err => alert(err));
    },
    async deleteSelect({ commit }, payload) {
      await Axios.delete(mongo_api+"select/" + payload._id)
        .then(() => commit("deleteSelect", { payload }))
        .catch(err => alert(err));
    },
    async addSelectedTopic({ commit }, payload) {
      commit("addSelectedTopic", { payload })
    },
    async setCurrentEmail({commit}, email) {
      commit("setCurrentEmail", {email})
    }
  },

  getters: {
    sessions: state => state.sessions,
    collections: state => state.collections,
    selects: state => state.selects,
    members: state => state.members
  }
});