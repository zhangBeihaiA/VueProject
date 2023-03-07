<template>
  <div class="spec-preview">
    <img :src="bigObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="bigObj.imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>
  
  <script>
import { mapGetters } from "vuex";
export default {
  name: "Zoom",
  props:['skuImageList'],
  data() {
    return {
      index: 0,
    };
  },
  mounted() {
    // console.log(this.skuImageList);
    this.$bus.$on('getIndex',(index)=>{
      // console.log(index)
      this.index = index

    })
  },
  computed: {
    ...mapGetters(["skuInfo"]),
    bigObj() {
      return this.skuImageList[this.index] || {};
    },
  },
  methods:{
    handler(e){
      // offsetX 鼠标的位置到边框的距离   (clientX是到网页的距离)
      let mask = this.$refs.mask
      let big = this.$refs.big
      // mask.style.left = e.offset-f.style.width
      let l = e.offsetX - mask.offsetWidth/2
      let t = e.offsetY - mask.offsetHeight/2
      if(l<0){l = 0}
      if(t<0){t=0}
      if(l>mask.offsetWidth){l = mask.offsetWidth}
      if(t>mask.offsetHeight){t = mask.offsetHeight}
      mask.style.left = l + "px" 
      mask.style.top = t + "px" 
      big.style.left = -2 * l + "px"
      big.style.top = -2 * t + "px"

    }
  }
};
</script>
  
  <style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: #fede4f;
    opacity: .5;
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>