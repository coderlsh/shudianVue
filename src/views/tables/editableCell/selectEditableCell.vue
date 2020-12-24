<template>
    <div class="editable-cell">
    <div v-if="editable" class="editable-cell-input-wrapper">
        <!-- <a-input :value="value" @change="handleChange" @blur='check' @pressEnter="check" /> -->
        <a-select   :style="{width:selectWidth+'px'}"
                    showArrow
                    v-model="value" 
                    @change="handleChange"
                    @blur='check'
                    >
            <a-select-option v-for="(value,key,index) of this.selectList" 
                            :value=value 
                            :key="key"
                            >
              {{value}}</a-select-option>
        </a-select>
    </div>
    <div @click="edit" v-else class="editable-cell-text-wrapper">
        {{ value || ' ' }}
    </div>
    </div>
</template>

<script>
  export default {
    props: {
        text: String,
        selectList: Array,
        selectWidth: {
            type:Number,
            default: 100
        }
    },
    data() {
        return {
            value: this.text,
            editable: false,
        };
    },
    watch: {
        text() {
            this.value = this.text
        }
    },
    methods: {
        handleChange(e) {
            this.value = e;
            this.editable = false;
            this.$emit('change', this.value);
        },
        check() {
            this.editable = false;
            this.$emit('change', this.value);
        },
        edit() {
            this.editable = true;
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