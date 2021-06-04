<script>
import init from './utils/init'
export default {
  onLaunch: function () {
    console.log('App Launch')
    init().then(err => {
      // 已登陆userInfo已储存在Vuex中
    }).catch(err => {
      ulink.LoginManager.openLink()
    })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
/*每个页面公共css */
</style>
