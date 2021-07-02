import { mapState, mapActions } from "vuex"
import config from '../utils/config'
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState(['isLogin', 'userInfo'])
    },
    onLoad() {
        // #ifdef H5
        ulink.share.init(config.share)
        // #endif
    },
    // 分享朋友圈
    onShareTimeline() {
        return {
            title: "一起点亮地图，获取生存物资吧~",
        };
    },
    onShareAppMessage() {
        let titleArry = [
            "救救我！解锁这块地图就能获得更多物资了！",
            "帮帮我！有了物资就能活下去！",
            "一起点亮地图，获取生存物资吧~",
        ]
        // 如果有用户昵称，可以加入用户昵称
        // if (this.userInfo.nickName) {
        //     titleArry.push(`【${this.userInfo.nickName}】`)
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
        go(url, type = 'navigateTo') {
            uni[type]({
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