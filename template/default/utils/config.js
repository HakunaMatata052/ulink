class Config {
    constructor(porps) {
        this.sAppId = "ULINK-XAJQ-213018" // Ulink 活动的 AppId
        this.wxAppId = 'wx6c821e89098e6e49' //小程序appid
        this.assertsUrl = 'https://game.gtimg.cn/images/lmjx/act/5946/a20210611scgj/' // 静态资源地址
        this.routeUrl = 'https://ulink.game.qq.com/app/4639/94783d67bf70e5e2/index.php' // 后台请求地址
        this.iActId = '5946'// 活动号
        this.game = 'lmjx' // 业务名称
        // #ifdef H5
        this.share = {
            iActId: this.iActId, // 活动号
            title: '救救我！解锁这块地图就能获得更多物资了！', // 分享标题
            desc: '生存告急！救救我！领取物资大礼包，一起活下去！',  // 分享内容简介
            link: location.protocol + '//' + location.host + location.pathname,  // 分享链接
            imgUrl: this.assertsUrl + 'share.png', // 分享后朋友看到的图标，大小不能超过6K，极限情况需要压缩至1K
            isArk: false,
            // arkImgUrl: this.assertsUrl + 'ark-share.jpg', // ark消息的图片链接
            // buttons: [{ "text": "立即参与", "url": "" }] // 自定义按钮文案及跳转链接，最多2个按钮
        }
        // #endif
    }
}
export default new Config()