<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="c in cartInfoList" :key="c.id">
          <li class="cart-list-con1">
            <!-- 点击勾选/取消商品 -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="c.isChecked == 1"
              @change="isCheckedChange(c, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="c.imgUrl" />
            <div class="item-msg">{{ c.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ c.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handler('minus', -1, c)" disabled="true"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="c.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, c)"
            />
            <a class="plus" @click="handler('add', 1, c)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ c.cartPrice * c.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteSku(c)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck&&cartInfoList.length!=0"
          @click="updateAllCartChecked"
          :disabled="cartInfoList.length==0"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    //获取个人购物车数据
    getData() {
      this.$store.dispatch("getCartList");
    },
    //节流 增加或者减少商品数量
    handler: throttle(async function (type, disNum, c) {
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          disNum = c.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(disNum) || disNum < 0) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - c.skuNum;
          }
          break;
      }
      console.log("派发action，通知服务器修改个数", type, disNum, c);
      //派发action
      try {
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuID: c.skuId,
          skuNum: disNum,
        });
        this.getData();
      } catch (error) {}
    }, 1000),
    //删除商品
    async deleteSku(c) {
      try {
        await this.$store.dispatch("deleteCartById", c.skuId);
        this.getData();
        console.log("重新发请求展示数据");
      } catch (error) {
        alert(error.message);
      }
    },
    //修改商品的选中状态
    async isCheckedChange(c, $event) {
      try {
        let checked = $event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateCheckedByid", {
          skuId: c.skuId,
          isChecked: checked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除所有选中的商品
    async deleteAll() {
      try {
        await this.$store.dispatch("deleteAllCheckedCart");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //修改 全部商品 的选中状态
    async updateAllCartChecked(event) {
      let isChecked = event.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("updataAllCartIsChecked", isChecked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.cartPrice;
      });
      return sum;
    },
    isAllCheck() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>