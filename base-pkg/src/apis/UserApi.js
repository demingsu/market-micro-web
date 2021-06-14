import Ajax from './Ajax'

/**
 * 用户登录接口
 * @param {Object} data 登录请求数据
 * @returns Promise<any>
 */
const loginApi = data => {
    return Ajax({
        url: '/user/login',
        data,
        method: 'POST'
    })
}

export {
    loginApi
}