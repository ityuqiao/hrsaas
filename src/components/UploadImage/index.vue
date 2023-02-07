<template>
  <div class="ImageContainer">
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="Preview"
      :on-remove="handleRemove"
      :limit="1"
      :file-list="FileList"
      :class="{ disabled: isShow }"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i slot="default" class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="dialogVisible" width="500px">
      <img :src="dialogImageUrl" alt="" width="100%">
    </el-dialog>
    <el-progress v-if="showProgress" :percentage="percent" style="width: 180px;" />
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKID8CNQJ1WpyxoSo3AmPr6eZQ9j6JL0Scfb',
  SecretKey: 'rY7UggcNi0BgAVkrz2wY4UlqnfiaIuJe'
})

export default {
  data() {
    return {
      percent: 0,
      showProgress: false,
      FileList: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    isShow() {
      return this.FileList.length === 1
    }
  },
  methods: {
    handleRemove(file, fileList) {
      this.FileList = fileList
    },
    Preview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.showProgress = true
      return true
    },
    upload(params) {
      if (params.file) {
        cos.putObject(
          {
            Bucket: 'yuqiao-1316729166',
            Region: 'ap-guangzhou',
            Key: params.file.name,
            StorageClass: 'STANDARD',
            Body: params.file,
            onProgress: (progressData) => {
              this.percent = progressData.percent * 100
            }
          },
          (err, data) => {
            console.log(data)
            if (data.statusCode === 200) {
              const obj = {}
              obj.url = 'http://' + data.Location
              obj.upload = true
              this.FileList.push(obj)
              // console.log(this.FileList)
              setTimeout(() => {
                this.showProgress = false
                this.percent = 0
              }, 1000)
            } else {
              console.log(err)
            }
          }
        )
      }
    }
  }
}
</script>

<style scpoed lang="scss">
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
.disabled .el-upload--picture-card {
	display: none;
}
</style>
