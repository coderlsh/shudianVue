<template>
    <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
        <a-input ref="inputText" :value="value" @change="handleChange" @blur='check' @pressEnter="check" />
    </div>
    <div @click="edit" v-else class="editable-cell-text-wrapper">
        {{ value || ' ' }}
    </div>
    </div>
</template>

<script>
  export default {
    props: {
        text: String || Number,
        type: ''
    },
    data() {
        return {
            value: this.text,
            editable: false,
        };
    },
    methods: {
        handleChange(e) {
            const value = e.target.value;
            //console.log(value)
            this.value = value;
        },
        
        check() {
            console.log(1)
            this.editable = false;
            this.$emit('change', this.value);
        },
        edit() {
            this.editable = true;
            var timer = setTimeout(() => {// 100毫秒延迟解决第二次打开支付框，输入框不自动获取焦点的bug
              this.$refs.inputText.focus();// 等价  document.getElementById("inputValId").focus();
              if(this.type == 'name') {
                this.$refs.inputText.value = ''
              }
              clearTimeout(timer)
            }, 100);
        },
    },
  }
</script>

<style scoped>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

</style>
