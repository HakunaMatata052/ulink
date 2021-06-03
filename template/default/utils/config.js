class Config {
    constructor(porps) {
        this.sAppId = "ULINK-XAJQ-213018" // Ulink 活动的 AppId
        this.wxAppId = 'wx26aef61f4dbc2f48' //小程序appid
        this.assertsUrl = 'https://game.gtimg.cn/images/x3g/act/5740/a20210514yg/' // 静态资源地址
        this.routeUrl = 'https://ulink.game.qq.com/app/4473/ab9a9cb526e8ab23/index.php' // 后台请求地址
        this.iActId = '5740'// 活动号
        this.game = 'x3g' // 业务名称
        // #ifdef H5
        this.share = {
            iActId: this.iActId, // 活动号
            title: '', // 分享标题
            desc: '',  // 分享内容简介
            link: location.protocol + '//' + location.host + location.pathname,  // 分享链接
            imgUrl: this.assertsUrl + 'share.png', // 分享后朋友看到的图标，大小不能超过6K，极限情况需要压缩至1K
            isArk: true,
            arkImgUrl: "", // ark消息的图片链接
            buttons: [{ "text": "按钮1", "url": "xxx" }, { "text": "按钮2", "url": "xxx" }] // 自定义按钮文案及跳转链接，最多2个按钮

        }
        // #endif
    }
}
export default new Config()