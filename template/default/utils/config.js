class Config {
    constructor(porps) {
        this.sAppId = "ULINK-XAJQ-213018" // Ulink 活动的 AppId
        this.wxAppId = 'wx6a44372faf576ca2' //小程序appid
        this.assertsUrl = 'https://game.gtimg.cn/images/lmjx/act/6088/a20210701fwe/' // 静态资源地址
        this.routeUrl = 'https://ulink.game.qq.com/app/4769/064db12fce91e5df/index.php' // 后台请求地址
        this.iActId = '6088'// 活动号
        this.game = 'lmjx' // 业务名称
        this.share = {
            iActId: this.iActId, // 活动号
            title: '稀有限定紫晶-ORIGIN-12皮肤抢先赢', // 分享标题
            desc: '收集明信片换紫晶-ORIGIN-12、生存高阶礼包等海量游戏福利',  // 分享内容简介
            // #ifdef H5
            link: location.protocol + '//' + location.host + location.pathname,  // 分享链接
            // #endif
            imgUrl: this.assertsUrl + 'share.png', // 分享后朋友看到的图标，大小不能超过6K，极限情况需要压缩至1K
            isArk: false,
            // arkImgUrl: this.assertsUrl + 'ark-share.jpg', // ark消息的图片链接
            // buttons: [{ "text": "立即参与", "url": "" }] // 自定义按钮文案及跳转链接，最多2个按钮
        }
    }
}
export default new Config()