<template>
    <div class="editable-cell">
        <!-- <a-input ref="inputText" :value="value" @change="handleChange" @blur='check' @pressEnter="check" /> -->
          <!-- <a-checkbox :checked="value" @change="onChange">
            Checkbox
          </a-checkbox> -->
    <div class="editable-cell-text-wrapper">
        <a-checkbox :checked="checkValue" @change="handleChange">
        </a-checkbox>
    </div>
    </div>
</template>

<script>
  export default {
    props: {
        text: String,
    },
    data() {
        return {
            value: this.text,
        };
    },
    computed: {
      checkValue() {
        if (this.value == '1') {
          return true
        }else {
          return false
        }
      }
    },
    methods: {
        handleChange(e) {
            const value = e.target.checked;
            if(value) {
              this.value = '1'
            }else {
              this.value = '0'
            }
            this.$emit('change', this.value);
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
  padding: 5px 5px 5px 8px;
}

</style>
