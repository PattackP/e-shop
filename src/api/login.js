import request from '@/utils/request'

export const getCaptchaImage = () => {
    return request.get('/captcha/image')
}

export const sendSmsCaptcha = (captchaCode, captchaKey, mobile) => {
    return request.post('captcha/sendSmsCaptcha', {
        form: {
            captchaCode,
            captchaKey,
            mobile
        }
    })
}

export const smsLogin = (mobile, smsCode) => {
    return request.post('/passport/login', {
        form: {
            mobile,
            smsCode,
            isParty: false,
            partyData: {}
        }
    })
}
