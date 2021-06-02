<template>
  <!-- #ifdef MP-WEIXIN或MP-QQ -->
  <ulink-role-selector
    id="roleSelector"
    @success="handleSuccess"
    @close="handleClose"
    :options="roleSelectorOptions"
  >
  </ulink-role-selector>
  <!-- #endif -->
</template>

<script>
import config from '../utils/config';
export default {
  porps: {
    roleSelectorOptions: Object
  },
  data() {
    return {
      options: {
        "sAppId": "ULINK-XAJQ-213018",  //腾讯优联APPID
        "iActId": config.iActId,   //活动ID
        "sSign": res.sSign,  //签名
        "game": iActId.game,  //游戏id
        "acctype": res.acctype,//登录类型
        "timestamp": res.timestamp, //时间戳
        "sCode": res.sCode,  //第三方渠道加密串
        "tips": {  // 自定义文案，1.0.13+版本支持
          "noGetRole": "未查询到角色",   // “未查询到角色”的提示文案
          "searchLater": "请稍后查询",     // “请稍后查询”的提示文案
        },
        custom: false,	// 自定义皮肤必须指定为true
        UISettings: {   // 以下属性必须指定，且不能为空
          dialog: ulink.$('#pop12'), // RoleSelector弹框
          channelSelect: ulink.$('#channelContentId'), // 渠道下拉框
          systemSelect: ulink.$('#systemContentId'),  // 系统下拉框
          areaSelect: ulink.$('#areaContentId'),	// 大区下拉框
          serverSelect: ulink.$('#serverContentId'),	// 服务器下拉框
          roleSelect: ulink.$('#roleContentId'),	// 角色下拉框
          roleSelectParent: ulink.$('#ulinkRoleSelectParent'), // 角色下拉框父节点
          errorMsgPanel: ulink.$('#ulinkErrorMessage'), // 错误信息展示面板
          confirmButton: ulink.$('#ulinkConfirmBtn'), // 确定按钮
          cancelButton: ulink.$('#ulinkCancelBtn'), // 取消按钮
          closeButton: ulink.$('#ulinkCloseBtn'), // 关闭按钮
        }
      }
    }
  },
  methods: {
    handleInit() {
      // #ifdef H5
      const roleselector = new ulink.RoleSelector({
          ...this.options,
      })
      // #endif

      // #ifdef MP-WEIXIN或MP-QQ
      this.selectComponent('#roleSelector').init();
      // #endif
    },
    handleClose(event) {
      this.$emit('handleClose', event)
    }
  }
}
</script>
