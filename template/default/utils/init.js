
import config from './config'

function init() {
    // #ifdef H5
    return new Promise((resolve, reject) => {
        // ulink.LoginManager.init({
        //     qqLoginType: 'qc',     // 校验QQ登录方式，qc为QQ的互联登录，qq为QQ的PT登录
        //     appConfig: {
        //         "WxAppId": "wx95d337a88db689a5",  //指定微信服务号APPID
        //         "scope": "snsapi_userinfo",   //默认是 snsapi_base 静默授权，如果游戏无静默权限，就需要手动改成snsapi_userinfo
        //         "redirect_uri": location.protocol + '//' + location.host + location.pathname,  //微信登录中转页，一般设置为活动链接
        //         "avoidConflict": true, //是否校验指定微信服务号登录(1.0.19+版本支持)
        //     },
        //     oQQConnectParams: {
        //         appId: "1106947383",   // 指定APPID
        //         scope: "get_user_info",
        //         state: "STATE",
        //         redirect_uri: 'https://komori.qq.com/act/4634/a20201218yuyue/qqRedirect.html',  // 互联登录中转页，具体逻辑可参考https://ulink.qq.com/login/qq_redirect.html
        //         avoidConflict: true,   // 互联登录APPID防冲突
        //     },
        // })
        // checkLogin
        ulink.LoginManager.checkLogin(userInfo => {
            console.log("已登录~", userInfo)
            resolve()
        }, () => {
            if (ulink.isMobile()) {
                if (ulink.isQQApp()) {
                    ulink.LoginManager.login();
                    resolve()
                } else if (ulink.isWxApp()) {
                    var url = ulink.getQueryString('s_url')
                    var code = ulink.getQueryString('code')
                    if (code && url) {
                        ulink.setCookie('wxcode', code, 86400, location.host, "/")
                        location.href = url
                    } else {
                        ulink.LoginManager.loginByWx();
                    }
                    resolve()
                } else {
                    reject('mobile未登录')
                }
            } else {
                reject('pc未登录')
            }
        })
    })
    // #endif
    // #ifdef MP-WEIXIN
    const Ulink = requirePlugin('ulink-mini-sdk')
    return new Promise((resolve, reject) => {
        Ulink.init({
            sAppId: config.sAppId, // Ulink 活动的 AppId
            iActId: config.iActId, // Ulink 活动 Id
            // apiRoute: 'https://ulink.game.qq.com/app/2486/91378a794fb266d1', // Ulink 活动的 api 路由
            apiRoute: "https://ulink.game.qq.com/app/2666/3cb1199b5c04371c/index.php", //1.0.5
            sdkVersion: 2,
            game: config.game, // 游戏名
            wxAppId: config.wxAppId, // 微信小程序的 AppId
            wx, // wx对象必须传递
        })
        resolve(Ulink)
    })
    // #endif
}


export default init