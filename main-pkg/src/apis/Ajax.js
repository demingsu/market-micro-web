import axios from 'axios'

const Ajax = axios.create({
    baseURL: '/apis',
    timeout: 5000
})

Ajax.interceptors.request.use(config => {
    return config
})

export default req => {
    if (!req.url) return {code: 400, message: '请求地址不能为空'}
    return new Promise(resolve => {
        Ajax.request({
            url: req.url,
            method: req.method || 'GET',
            data: req.data || {},
            params: req.params || {}
        }).then(({data}) => {
            resolve(data)
        }).catch(e => {
            resolve(e)
        })
    })
}