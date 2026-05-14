<template>
  <van-nav-bar
    title="会员登陆"
    left-arrow
    @click-left="onClickLeft"
  />
  <div class="container">
    <div class="title">
      <h3>手机号登录</h3>
      <p>未注册的手机号登录后将自动注册</p>
    </div>

    <div class="form">
      <div class="form-item">
        <input  class="inp" placeholder="请输入手机号码" type="text" v-model="phone">
      </div>
      <div class="form-item" v-if="base64">
        <input  class="inp" placeholder="请输入图形验证码" type="text" v-model="picCode">
        <img :src="base64" alt="" @click="getCaptcha">
      </div>
      <div class="form-item">
        <input  v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text" >
        <button @click="getMsgCode">{{ totalSecond === second ?'获取验证码':second+'秒后重新获取' }}</button>
      </div>
    </div>

    <div class="login-btn" @click="login">登录</div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCaptchaImage, sendSmsCaptcha, smsLogin } from '@/api/login'

const router = useRouter()

const phone = ref('')
const msgCode = ref('')

const picCode = ref('')
const base64 = ref('')
const key = ref('')
const md5 = ref('')

const totalSecond = ref(60)
const second = ref(60)
let timer = null

const validatePhone = () => {
  if (!phone.value) {
    showToast('请输入手机号')
    return false
  }
  if (!/^1[3-9]\d{9}$/.test(phone.value)) {
    showToast('手机号格式不正确')
    return false
  }
  return true
}

const validatePicCode = () => {
  if (!picCode.value) {
    showToast('请输入图形验证码')
    return false
  }
  if (picCode.value.length !== 4) {
    showToast('图形验证码为4位字符')
    return false
  }
  return true
}

const validateSmsCode = () => {
  if (!msgCode.value) {
    showToast('请输入短信验证码')
    return false
  }
  if (!/^\d{6}$/.test(msgCode.value)) {
    showToast('短信验证码为6位数字')
    return false
  }
  return true
}


//页面加载后获取验证码
const getCaptcha = async () => {
  const res = await getCaptchaImage()    
  key.value = res.data.key
  base64.value = res.data.base64
  md5.value = res.data.md5
}
//获取短信验证码
const getMsgCode = async () => {
  if (!validatePhone()) {
    return
  }
  if (!validatePicCode()) {
    return
  }
  //发送短信验证码
  const res = await sendSmsCaptcha(picCode.value, base64.value, phone.value)
  showToast('验证码已发送，请查收')
  if (!timer && second.value === totalSecond.value) {
    timer = setInterval(() => {
      second.value--
      if (second.value <= 0) {
        second.value = totalSecond.value
        clearInterval(timer)
        timer = null
      }
    }, 1000)
   
  }
}
const login = async () => {
  if (!validatePhone()) {
    return
  }
  if (!validateSmsCode()) {
    return
  }
  if (!validatePicCode()) {
    return
  }
  //登录
  const res = await smsLogin(phone.value,msgCode.value)
  if (res.status === 200) {
     showToast('登录成功')
     router.push('/home')
  }
 
}

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})

getCaptcha()
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>