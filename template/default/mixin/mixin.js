import { mapState, mapMutations, mapActions } from "vuex"
import config from '../utils/config'
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState(['isLogin', 'userInfo'])
    },
    async onLoad() {
        // #ifdef H5
        ulink.share.init(config.share)
        // #endif
        await this.AppInit()
            .catch(err => {
                if (err=='wx') {
                    uni.showToast({
                        title: '请在手Q内打开',
                        icon: 'none'
                    })
                } else {
                    ulink.LoginManager.openLink()
                }
            })
    },
    onShareAppMessage() {
        let titleArry = [
            "神仙卡面可以免费抽啦，快来帮我秒杀吧~",
        ]
        // 如果有用户昵称，可以加入用户昵称
        // if (this.userInfo.nickName) {
        //     titleArry.push(`【${this.userInfo.nickName}】邀请or叫你一起加入爱消除小站！`)
        // }
        const titleIndex = Math.floor(Math.random() * (titleArry.length - 0) + 0)
        const title = titleArry[titleIndex]
        return {
            title,
            path: `/pages/index/index`,
            imageUrl: config.assertsUrl + 'miniapp-share.jpg',
        }
    },
    methods: {
        ...mapActions(['AppInit']),
        // 全局跳转
        go(url) {
            uni.navigateTo({
                url,
                complete: function (done) {
                },
                fail: function (err) {
                    uni.redirectTo({
                        url
                    })
                },
                success: function (ok) {
                },
            })
        },
        // 点击流
        PTTSendClick(name, text) {
            // #ifdef H5
            PTTSendClick('btn', name, text)
            // #endif
        },
    }
}