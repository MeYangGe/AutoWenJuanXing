<template>
  <div class="Wokoo-hide" @click="handleClose">
    <img :src="logo" class="Wokoo-hide-logo" alt="logo"/>
  </div>
</template>
<script>
import './app.less'
import logo from '../public/icon.jpg'

export default {
  data: function () {
    return {
      logo,
      // 配置自动提交间隔与自动刷新时间，单位ms
      auto: 1, //启用自动提交，默认关闭。0关闭，1开启
      clearCookie: 0, //启用清除cookie，默认关闭。0关闭，1开启
      submitTime: 2000, //提交时间
      refreshTime: 6000, //刷新时间，如想快速重复提交，改小点，但是若有滑块会卡bug
      single: 0,//1为固定单选，0为随机单选
      cho: 1, //固定单选选项，1为选择第一个，以此类推
      config: [
        {
          id: 1, // 第一题填空题:
          answer: ["张三"]
        },
        {
          id: 4,// 第一题填空题:
          answer: ["张三"]
        }
      ],

    }
  },
  methods: {
    handleClose() {
      this.judgeType()
    },
    /**
     *
     * 随机数字
     * @param {int} min The minimum value in the range
     * @param {int} max The maxmum value in the range
     * @return {int} Return Returns a random number within this range (both include)
     */
    randInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    /**
     *
     * 随机字符串
     */
    randomString(length) {
      const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result = '';
      for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    },
    getRandomArrayElements(arr, count) {
      let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
    /**
     * @name 普通单选题固定选择与随机选择
     * @param {object}  subject single subject
     */
    singleChoose(subject) {
      if (this.single === 1)//固定选择
      {
        if (subject.querySelectorAll("img")[0]) { //带有图片的，无法直接click 标签<li>
          const img = subject.querySelectorAll("img");
          img[this.cho - 1].click();
        } else {
          const list = subject.querySelectorAll(".ui-radio");
          let no;
          for (let i = 0; i < list.length; i++) {
            if (list[i].querySelector(".ui-text") != null) {
              no = i;
            }
          }
          const index = this.cho - 1;
          list[index].click();
        }
      } else {//随机选择
        if (subject.querySelectorAll("img")[0]) { //带有图片的，无法直接click 标签<li>
          const img = subject.querySelectorAll("img");
          img[this.randInt(0, img.length - 1)].click();
        } else {
          const list = subject.querySelectorAll(".ui-radio");
          let no;
          for (let i = 0; i < list.length; i++) {
            if (list[i].querySelector(".ui-text") != null) {
              no = i;
            }
          }
          let index = this.randInt(0, list.length - 1);
          while (index === no) {
            index = this.randInt(0, list.length - 1);
          }
          list[index].click();
          list[index].click();
        }
      }
    },
    /****
     * @name    普遍多选题随机选择
     * @param {object}  subject single subject
     *
     */
    multiChoose(subject) {
      const list = subject.querySelectorAll(".ui-checkbox");
      const arr = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].querySelectorAll("input")[0].checked === true) {
          list[i].click();
        }
        arr.push(list[i]);
      }
      const times = this.randInt(3, arr.length - 1); // 多选题选择数量，一般不小于3
      const indexAry = this.getRandomArrayElements(arr, times);//准备选中的项
      let no;//禁止项
      for (let j = 0; j < indexAry.length; j++) {
        if (indexAry[j].querySelector(".ui-text") != null) {//去除多选框里需要填空的项
          no = j;
        }
      }
      for (let i = 0; i < indexAry.length; i++) {
        if (indexAry[i].querySelectorAll("input")[0].checked === false && (i !== no)) {
          indexAry[i].click();
        }
      }
    },
    /**
     *随机排序题
     *
     */
    randomSort(subject) {
      let i;
      const list = subject.querySelectorAll("li");
      const arr = [];
      for (i = 0; i < list.length; i++) {
        list[i].querySelectorAll("input")[0].checked = false;
        list[i].querySelectorAll("span")[0].classList.remove("sortnum-sel"); //事实上这个只是一个样式，真正选择在于checkd = true || false
        arr.push(list[i]);
      }
      for (i = 0; i < list.length; i++) {
        const randomChoose = arr.splice(this.randInt(0, arr.length - 1), 1)[0];
        randomChoose.querySelectorAll("input")[0].checked = true;
        randomChoose.querySelectorAll("span")[0].classList.add("sortnum-sel");
        randomChoose.querySelectorAll("span")[0].innerHTML = i + 1;
      }
    },
    /**
     * 表格单选
     *
     */
    tableSingleChoose(subject) {
      const tr = subject.querySelectorAll("tbody > tr:not(.rowtitle):not(.trlabel)");
      for (let i = 0; i < tr.length; i++) {
        const td = tr[i].querySelectorAll("td:not(.scalerowtitletd)");
        td[this.randInt(0, td.length - 1)].click();
      }
    },
    /**
     * 表格多选
     */
    tableMultiChoose(subject) {
      const tr = subject.querySelectorAll("tbody > tr:not(.rowtitle):not(.trlabel)");
      for (let i = 0; i < tr.length; i++) {
        const td = tr[i].querySelectorAll("td:not(.scalerowtitletd)");
        const times = this.randInt(3, td.length - 1); // 多选题选择数量，一般不小于3
        for (let k = 0; k < times; k++) {
          const randomChoose = this.randInt(0, td.length - 1);
          td[randomChoose].click();
        }
      }
    },
    /**
     * 下拉框
     */
    dropdownSelect(subject) {
      const select = subject.querySelectorAll("select")[0];
      select.selectedIndex = this.randInt(1, select.length - 1);
    },

    /**
     *
     * @param {int} _value 随机值
     * @param {*} min 可选的最小值
     * @param {*} max 可选的最大值
     * @param {*} subject 题目
     * @param {*} current 当前第几题
     *
     */

    singleSlider(subject, current) {
      const max = Number(subject.querySelectorAll("input")[0].getAttribute("max"));
      const min = Number(subject.querySelectorAll("input")[0].getAttribute("min"));
      let score = this.randInt(min, max);
      console.log(subject.querySelector(`#q${current}`))
      subject.querySelector(`#q${current}`).value = score;
      console.log("对于问题", current, "输入的分数", score);
    },
    singleStar(subject) {
      const td = subject.querySelectorAll(".td");
      td[this.randInt(0, td.length - 1)].click();
    },
    /**
     * @name 题目类型判断，并随机选择
     */
    judgeType() {
      let input;
      const q = document.getElementsByClassName("ui-field-contain");
      for (let i = 0; i < q.length; i++) {
        //普通单选 or 多选
        if ((q[i].querySelectorAll(".ui-checkbox")[0]) || (q[i].querySelectorAll(".ui-radio")[0])) { // 非表格单选或者多选
          input = q[i].querySelectorAll("input");
          if (input[0].type === 'radio') {
            console.log("单选题", i);
            this.singleChoose(q[i]);
          } else if (input[0].type === 'checkbox') {
            console.log("多选题", i);
            this.multiChoose(q[i]);
          }
          //表格
        } else if (q[i].querySelectorAll("table")[0]) {
          if (q[i].querySelectorAll("table")[0]) { // 表格题中包含有单选， 多选
            // 获取带有 rate-off 类的元素
            let rateOffElements = q[i].querySelectorAll('.rate-off');

            // 排除同时带有 rate-off 和 rate-offlarge 类的元素
            let filteredRateOffElements = [];
            for (let i = 0; i < rateOffElements.length; i++) {
              let element = rateOffElements[i];
              if (!element.classList.contains('rate-offlarge')) {
                filteredRateOffElements.push(element);
              }
            }
            // 获取同时带有 rate-off 和 rate-offlarge 类的元素
            let rateOffAndLargeElements = q[i].querySelectorAll('.rate-off.rate-offlarge');
            if (rateOffAndLargeElements.length > 0) {
              console.log("表格单选", i);
              this.tableSingleChoose(q[i]);
            } else if (filteredRateOffElements.length > 0) {
              console.log("表格多选", i);
              this.tableMultiChoose(q[i]);
            }

          }
          // 填空题
        } else if (q[i].querySelectorAll("textarea")[0]) {
          for (let j = 0; j < this.config.length; j++) {
            if (q[i].querySelectorAll("textarea")[0].id === ("q" + this.config[j].id + '_' + j)) {
              q[i].querySelectorAll("textarea")[0].value = this.config[j].answer[Math.floor(Math.random() * this.config[j].answer.length)];
            }
          }
          console.log("文本域填空", i);
        } else if (q[i].querySelectorAll(".ui-input-text input")[0]) {
          for (let j = 0; j < this.config.length; j++) {
            if (q[i].querySelectorAll(".ui-input-text input")[0].id === ("q" + this.config[j].id)) {
              q[i].querySelectorAll(".ui-input-text input")[0].value = this.config[j].answer[Math.floor(Math.random() * this.config[j].answer.length)];
            }
          }
          console.log("填空", i);
        } else if (q[i].querySelectorAll(".rangeslider")[0]) {
          console.log("Slider-Single-line", i);
          this.singleSlider(q[i], i + 1);
        } else if (q[i].querySelectorAll(".scale-rating")[0]) {
          console.log("Star-Single-line", i);
          this.singleStar(q[i]);
        } else if (q[i].querySelectorAll(".ui-li-static")[0]) {
          console.log("li-Sort", i);
          this.randomSort(q[i]);
        } else if (q[i].querySelectorAll("select")[0]) {
          console.log("Select", i);
          this.dropdownSelect(q[i]);
        }
      }
      /**
       * 滚动到提交按钮处
       */
      try {
        const scrollValue = document.getElementById("submit_button").offsetParent.offsetParent.offsetTop;
        window.scrollTo({
          top: scrollValue,
          behavior: "smooth"
        });
      } catch (error) {

      }
      /**
       * 自动提交
       */
      this.submit()
    },
    /**
     * 自动提交
     */
    submit() {
      // 延迟 5 秒后单击确认按钮
      if (this.auto === 1) {
        setTimeout(() => {
          this.modifyStartTime();
          // 点击提交按钮
          const nextBtn = document.evaluate('//*[@id="ctlNext"]', document, null,
              XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          if (nextBtn) {
            nextBtn.click();
          }
        }, 5000);
      }
      // 延迟 1 秒后单击确认按钮
      setTimeout(() => {
        document.querySelector('.layui-layer-btn0').click();
      }, 1000);
      // 延迟 2 秒后单击验证按钮
      setTimeout(() => {
        document.querySelector('#rectMask').click();
      }, 2000);
      // 延迟 4 秒后执行 simulateSliderVerification 函数
      setTimeout(() => {
        this.simulateSliderVerification();
      }, 4000);
      if (this.clearCookie === 1) {
        setTimeout(() => {
          const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
          if (keys) {
            for (let i = keys.length; i--;) {
              document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
              document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
            }
          }
        }, 6000);
      }
      // setTimeout(() => {
      //   // 自动刷新,解决验证问题
      //   location.reload();
      // }, this.refreshTime);


    },
    // 滑块验证功能
    simulateSliderVerification() {
      const slider = document.querySelector('#nc_1__scale_text > span');
      console.log("slider", slider);
      if (slider.textContent.startsWith('请按住滑块')) {
        const width = slider.offsetWidth;
        const eventOptions = {bubbles: true, cancelable: true};
        const dragStartEvent = new MouseEvent('mousedown', eventOptions);
        const dragEndEvent = new MouseEvent('mouseup', eventOptions);
        const steps = 10;
        const stepWidth = width / steps;
        let currX = stepWidth / 2;
        slider.dispatchEvent(dragStartEvent);
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        for (let i = 0; i < steps; i++) {
          slider.dispatchEvent(new MouseEvent('mousemove', Object.assign({clientX: currX}, eventOptions)));
          currX += stepWidth;
          delay(50);
        }
        slider.dispatchEvent(dragEndEvent);
        console.log("滑块已滑动");
      }
    },
    modifyStartTime() {
      const startTime = document.getElementById('starttime');
      const date = new Date();
      startTime.value = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate().toString().padStart(2, '0')} ${date.getHours()}:${date.getMinutes() < 10 ? "0" : date.getMinutes() - 7}:${date.getSeconds()}`
    },
  }
}
</script>
<style scoped>
</style>
