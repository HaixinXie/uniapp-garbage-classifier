<template>
  <view class="custom-search-bar" :class="{ 'with-icon': leftIcon }">
    <!-- 左侧图标区域 -->
    <view v-if="leftIcon" class="search-icon" @click="onIconClick">
      <uni-icons :type="leftIcon" :size="iconSize" :color="iconColor" />
    </view>
    
    <!-- 搜索输入框 -->
    <view class="search-input-container">
      <input
        class="search-input"
        type="text"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        :disabled="disabled"
        v-model="searchValue"
        @input="onInput"
        @confirm="onConfirm"
        @focus="onFocus"
        @blur="onBlur"
      />
      
      <!-- 清除按钮 -->
      <view v-if="showClearBtn" class="clear-btn" @click="clearSearch">
        <uni-icons type="close-circle" size="16" color="#999" />
      </view>
    </view>
    
    <!-- 右侧图标区域 -->
    <view v-if="rightIcons && rightIcons.length > 0" class="right-icons">
      <view 
        v-for="(icon, index) in rightIcons" 
        :key="index" 
        class="right-icon"
        @click="() => onRightIconClick(index)"
      >
        <uni-icons :type="icon.type" :size="icon.size || iconSize" :color="icon.color || iconColor" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted } from 'vue'

// 定义组件props
const props = defineProps({
  placeholder: {
    type: String,
    default: '请输入搜索内容'
  },
  value: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  leftIcon: {
    type: String,
    default: 'search'  // 默认使用搜索图标
  },
  rightIcons: {
    type: Array,
    default: () => []  // 示例: [{ type: 'setting' }, { type: 'more' }]
  },
  iconSize: {
    type: [Number, String],
    default: 18
  },
  iconColor: {
    type: String,
    default: '#999'
  },
  bgColor: {
    type: String,
    default: '#F5F5F5'
  },
  borderRadius: {
    type: [Number, String],
    default: 20
  }
})

// 定义组件事件
const emits = defineEmits([
  'input',    // 输入内容变化时触发
  'confirm',  // 按下回车键触发
  'focus',    // 获得焦点时触发
  'blur',     // 失去焦点时触发
  'clear',    // 点击清除按钮时触发
  'iconClick',// 点击左侧图标时触发
  'rightIconClick' // 点击右侧图标时触发
])

// 内部状态
const searchValue = ref(props.value)
const showClearBtn = ref(false)

// 监听外部值变化
const updateValue = (newVal) => {
  searchValue.value = newVal
  showClearBtn.value = !!newVal
}

// 监听props.value变化
const watch = (source, cb) => {
  // 简单实现watch，实际项目中应使用正确的Vue3 watch API
  let value = source()
  Object.defineProperty(source, 'value', {
    get() { return value },
    set(newVal) {
      const oldVal = value
      value = newVal
      cb(newVal, oldVal)
    }
  })
}

watch(() => props.value, (newVal) => {
  updateValue(newVal)
})

// 输入事件处理
const onInput = (e) => {
  const value = e.detail.value
  searchValue.value = value
  showClearBtn.value = !!value
  emits('input', value)
}

// 确认搜索
const onConfirm = (e) => {
  emits('confirm', searchValue.value)
}

// 获得焦点
const onFocus = (e) => {
  emits('focus', e)
}

// 失去焦点
const onBlur = (e) => {
  emits('blur', e)
}

// 清除搜索内容
const clearSearch = () => {
  searchValue.value = ''
  showClearBtn.value = false
  emits('clear')
}

// 左侧图标点击
const onIconClick = () => {
  emits('iconClick')
}

// 右侧图标点击
const onRightIconClick = (index) => {
  emits('rightIconClick', index)
}

// 组件挂载后初始化
onMounted(() => {
  updateValue(props.value)
})
</script>

<style scoped>
.custom-search-bar {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  background-color: var(--bgColor, #F5F5F5);
  border-radius: var(--borderRadius, 20px);
}

.search-icon {
  margin-right: 8px;
}

.search-input-container {
  flex: 1;
  display: flex;
  align-items: center;
  position: relative;
}

.search-input {
  flex: 1;
  height: 100%;
  font-size: 14px;
  background-color: transparent;
}

.clear-btn {
  position: absolute;
  right: 0;
  padding: 0 8px;
  display: flex;
  align-items: center;
}

.right-icons {
  display: flex;
  margin-left: 10px;
}

.right-icon {
  margin-left: 12px;
}
</style>