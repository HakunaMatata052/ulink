import config from './config'
const Ulink = requirePlugin('ulink-mini-sdk')
export default function http(router, data, option) {
    option = {
        errAlert: true,
        resAlert: false,
        loading: true,
        methods: 'post',
        ...option
    };

    return new Promise((resolve, reject) => {
        // #ifdef H5
        let params = {
            route: router,
            game: config.game,
            iActId: config.iActId,
        }
        if (option.methods == 'get') {
            params = {
                ...params,
                ...option.params,
            }
        }
        ulink.http[option.methods]({
            // url: `/api`,
            url: config.routeUrl,
            params,
            formdata: data,
            isShowLoading: option.loading,
            success: (res) => {
                res.data = res.jData
                if (res.iRet == 0) {
                    if (option.resAlert) {
                        if (option.resAlert == 'alert') {
                            uni.showModal({
                                content: res.sMsg,
                                showCancel: false,
                            })
                        } else {
                            uni.showToast({
                                title: res.sMsg,
                                icon: 'none'
                            })
                        }
                    }
                    console.log(router, res.sULinkSerial, res.jData)
                    resolve(res)
                } else {
                    if (option.errAlert) {
                        if (option.errAlert == 'alert') {
                            uni.showModal({
                                content: res.sMsg,
                                showCancel: false,
                            })
                        } else {
                            uni.showToast({
                                title: res.sMsg,
                                icon: 'none'
                            })
                        }
                    }
                    console.log(router, res.sULinkSerial)
                    reject(res)
                }
            },
            error: (err) => {
                reject(err)
            }
        });
        // #endif
        // #ifdef MP-WEIXIN
        if (option.loading) {
            uni.showLoading({
                title: '加载中',
                mask: true,
            })
        }
        Ulink.http[option.methods](router, data)
            .then(res => {
                if (option.loading) {
                    uni.hideLoading()
                }
                if (option.resAlert) {
                    if (option.resAlert == 'alert') {
                        uni.showModal({
                            content: res.rawData.sMsg,
                            showCancel: false,
                        })
                    } else {
                        uni.showToast({
                            title: res.rawData.sMsg,
                            icon: 'none'
                        })
                    }
                }
                console.log(router + ' \n ' + res.rawData.sULinkSerial + ' \n ', res.rawData)
                // if (!app.cacheData) app.cacheData = {}
                // if (!app.cacheData[key]) app.cacheData[key] = {}
                // app.cacheData[key]['data'] = res
                // app.cacheData[key]['lock'] = false
                // console.log(app)
                resolve(res)
            })
            .catch(err => {
                if (option.loading) {
                    uni.hideLoading()
                }

                if (option.errAlert) {
                    if (option.errAlert == 'alert') {
                        uni.showModal({
                            content: err.sMsg,
                            showCancel: false,
                        })
                    } else {
                        uni.showToast({
                            title: err.sMsg,
                            icon: 'none'
                        })
                    }
                }
                if (__wxConfig && __wxConfig.envVersion == 'trial') {
                    uni.setClipboardData({
                        data: `路由：【${router}】\r\n错误码：【${err.iRet}】\r\n提示：【${err.sMsg}】\r\n流水号：【${err.sULinkSerial}】`,
                        success: (res) => {
                            uni.showModal({
                                title: '提示(仅在体验版提示)',
                                content: `路由：【${router}】\r\n错误码：【${err.iRet}】\r\n提示：【${err.sMsg}】\r\n流水号已复制，发给开发吧！😄`,
                                showCancel: false,
                            })
                        }
                    })
                }
                console.log(router + ' \n ' + err.sULinkSerial + ' \n ', err.jData)
                reject(err)
            })

        // #endif
    });
}