<template>
  <div>
    <!-- ส่วนแสดงผลของ Router ที่เลือก -->
    <router-view/>
  </div>
</template>

<script>
import { store } from "./store/store";
export default {
  name: "app",
  store
};
</script>

