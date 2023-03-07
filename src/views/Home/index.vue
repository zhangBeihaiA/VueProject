<template>
  <div>
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/views/Home/ListContainer";
import Recommend from "@/views/Home/Recommend";
import Rank from "@/views/Home/Rank";
import Like from "@/views/Home/Like";
import Floor from "@/views/Home/Floor";
import Brand from "@/views/Home/Brand";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    //获取floor组件的数据
    this.$store.dispatch("getFloorList");
    this.$store.dispatch("GetQinghua");
    //获取用户信息
    // this.$store.dispatch('getUserInfo')

  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList
    }),
    // ...mapState(["qinghua"])
    
  },
};
</script>

<style>
</style>