import request from '@/utils/request'

export const getCaptchaImage = () => {
    return request.get('/captcha/image')
}

export const sendSmsCaptcha = (captchaCode, captchaKey, mobile) => {
    return request.post('captcha/sendSmsCaptcha', {
        captchaCode,
        captchaKey,
        mobile
    })
}