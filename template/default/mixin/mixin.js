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
            title: config.share.title,
        };
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
        setData: function (obj, callback) {
            let that = this;
            const handleData = (tepData, tepKey, afterKey) => {
                tepKey = tepKey.split('.');
                tepKey.forEach(item => {
                    if (tepData[item] === null || tepData[item] === undefined) {
                        let reg = /^[0-9]+$/;
                        tepData[item] = reg.test(afterKey) ? [] : {};
                        tepData = tepData[item];
                    } else {
                        tepData = tepData[item];
                    }
                });
                return tepData;
            };
            const isFn = function (value) {
                return typeof value == 'function' || false;
            };
            Object.keys(obj).forEach(function (key) {
                let val = obj[key];
                key = key.replace(/\]/g, '').replace(/\[/g, '.');
                let front, after;
                let index_after = key.lastIndexOf('.');
                if (index_after != -1) {
                    after = key.slice(index_after + 1);
                    front = handleData(that, key.slice(0, index_after), after);
                } else {
                    after = key;
                    front = that;
                }
                if (front.$data && front.$data[after] === undefined) {
                    Object.defineProperty(front, after, {
                        get() {
                            return front.$data[after];
                        },
                        set(newValue) {
                            front.$data[after] = newValue;
                            that.$forceUpdate();
                        },
                        enumerable: true,
                        configurable: true
                    });
                    front[after] = val;
                } else {
                    that.$set(front, after, val);
                }
            });
            // this.$forceUpdate();
            isFn(callback) && this.$nextTick(callback);
        }
    }
}