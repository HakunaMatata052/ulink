class Config {
    constructor(porps) {
        this.sAppId = "ULINK-XAJQ-213018" // Ulink 活动的 AppId
        this.wxAppId = 'wx41d799abcae74f28' //小程序appid
        this.assertsUrl = 'https://game.gtimg.cn/images/lv/act/5837/a20210526ms/' // 静态资源地址
        this.routeUrl = 'https://ulink.game.qq.com/app/4546/083822c354d98d6a/index.php' // 后台请求地址
        this.iActId = '5837'// 活动号
        this.game = 'lv' // 业务名称
        // #ifdef H5
        this.share = {
            iActId: this.iActId, // 活动号
            title: '神仙卡面可以免费抽啦，快来帮我秒杀吧~', // 分享标题
            desc: '福利放送！0元秒杀20抽，仅此一次机会，还不快上车！',  // 分享内容简介
            link: location.protocol + '//' + location.host + location.pathname,  // 分享链接
            imgUrl: this.assertsUrl + 'share.png', // 分享后朋友看到的图标，大小不能超过6K，极限情况需要压缩至1K
            isArk: false,
            arkImgUrl: this.assertsUrl + 'ark-share.jpg', // ark消息的图片链接
            buttons: [{ "text": "立即参与", "url": "https://love.qq.com/act/5837/a20210526ms/index.html#/" }] // 自定义按钮文案及跳转链接，最多2个按钮
        }
        // #endif
    }
}
export default new Config()