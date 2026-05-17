<template>
  <div class="count-box">
    <span class="reduce" @click="reduceFn">-</span>
    <input type="text" class="number" :value="modelValue" @input="changeFn" />
    <span class="add" @click="addFn">+</span>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 999
  }
})

// <CountBox 
//   v-model:count="count" 
//   v-model:max="max" 
//   v-model:min="min"
// />

// const emit = defineEmits(['update:count', 'update:max', 'update:min'])

const emit = defineEmits(['update:modelValue'])

const reduceFn = () => {
  if (props.modelValue > 1) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

const addFn = () => {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}

const changeFn = (e) => {
  const val = parseInt(e.target.value)
  // 处理 NaN 的情况
  if (isNaN(val)) {
    return  // 不更新，保持原值
  }
  if (val >= 1 && val <= props.max) {
    emit('update:modelValue', val)
  }
}
</script>

<style lang="less" scoped>
.count-box {
  display: flex;
  align-items: center;

  span {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f2f2f2;
    font-size: 16px;
  }

  .reduce {
    border-radius: 2px 0 0 2px;
  }

  .add {
    border-radius: 0 2px 2px 0;
  }

  .number {
    width: 44px;
    height: 28px;
    text-align: center;
    border: none;
    background-color: #f2f2f2;
    font-size: 14px;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
  }
}
</style>