import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    checkPermission(key) {
      if (this.userInfo.roles.points) {
        return this.userInfo.roles.points.some(item => item === key)
      }
      return false
    }
  }
}
