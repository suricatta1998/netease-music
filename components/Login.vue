<template>
  <div>
    <vs-dialog v-model="active" overflow-hidden prevent-close>
      <template #header>
        <h4>登录网易云音乐</h4>
      </template>

      <div class="center con-form">
        <vs-input v-if="loginType === 'phone'" v-model="phone" shadow placeholder="手机号">
          <template #icon>
            <i class="bx bx-phone" />
          </template>
          <template v-if="validPhone" #message-success />
          <template v-if="!validPhone && phone !== ''" #message-danger>
            手机号格式不正确
          </template>
        </vs-input>

        <vs-input v-if="loginType === 'email'" v-model="email" shadow placeholder="163邮箱">
          <template #icon>
            <i class="bx bx-envelope" />
          </template>

          <template v-if="validEmail" #message-success />
          <template v-if="!validEmail && email !== ''" #message-danger>
            163邮箱格式不正确
          </template>
        </vs-input>

        <vs-input v-model="password" shadow type="password" placeholder="密码" @blur="validPassword()">
          <template #icon>
            <i class="bx bx-lock-open-alt" />
          </template>
          <template v-if="!isPasswordValid" #message-danger>
            密码不能为空
          </template>
        </vs-input>

        <vs-row justify="space-between" align="center">
          <div />
          <template v-if="loginType === 'phone'">
            <vs-button gradient dark @click="switchLoginType('email')">
              邮箱登录
            </vs-button>
          </template>
          <template v-if="loginType === 'email'">
            <vs-button gradient dark @click="switchLoginType('phone')">
              手机登录
            </vs-button>
          </template>
        </vs-row>
      </div>

      <template #footer>
        <vs-button :loading="loading" block gradient :disabled="!disabled" @click="submit">
          登录
        </vs-button>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    loginType: 'phone',
    email: '',
    phone: '',
    password: '',
    isPasswordValid: true,
    loading: false
  }),
  computed: {
    active: {
      get () {
        return this.$store.state.auth.dialog
      },
      set (newVal) {
        this.toggleLoginDialog(newVal)
      }
    },
    validPhone () {
      return /^[1]([3-9])[0-9]{9}$/.test(this.phone)
    },
    validEmail () {
      return /^[a-zA-Z]\w{5,17}@163.com/.test(this.email)
    },
    disabled () {
      return (this.validPhone || this.validEmail) && this.password !== ''
    }
  },
  methods: {
    ...mapActions('auth', ['toggleLoginDialog', 'setUser']),
    validPassword () {
      this.isPasswordValid = this.password !== ''
    },
    switchLoginType (loginType) {
      this.loginType = loginType
      this.email = ''
      this.phone = ''
      this.password = ''
    },
    submit () {
      this.loading = true
      this.$api.login({
        loginType: this.loginType,
        account: this.phone || this.email,
        password: this.password
      }).then((data) => {
        const userName = data.account.userName.slice(2)
        const uid = data.account.id
        const profile = data.profile
        Promise.all([
          this.$api.getUserAccount(),
          this.$api.getUserDetail({ uid }),
          this.$api.getUserSubcount(),
          this.$api.getUserLevel(),
          this.$api.getUserPlaylist({ uid })
        ]).then((data) => {
          const [account, detail, subcount, level, playlist] = data
          const user = { profile, account, detail, subcount, level, playlist }
          localStorage.setItem('user', JSON.stringify(user))
          this.setUser(user)
        })
        this.$toast.success('登录成功', `你好，${userName}`)
        this.toggleLoginDialog(false)
        this.loading = false
      }).catch((err) => {
        this.loading = false
        const msg = err.response.data.msg || '其它原因'
        this.$toast.danger('登录失败', msg)
      })
    }
  }
}
</script>

<style lang="sass">
.con-form

  .vs-input-content
    width: 100%
    margin: 10px 0

    .vs-input
      width: 100%
      border-radius: 10px
</style>
