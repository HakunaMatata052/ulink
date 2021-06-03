const Ulink = () => {
    return {
        CONSTS: {
            isIOS:ulink.detect().os.ios,
            isAndroid:ulink.detect().os.android,
            isWechat:ulink.isWxApp(),
            isQQ:ulink.isQQApp()
        },
        miniAPI:{
            alert:ulink.alert,
        },
    }
}
export default Ulink

