<template>
  <div class="app-container">
    <div style="font-size: 19PX; font-weight: 600; margin-bottom: 20px; margin-left: 20px;">
      <!--      判断路由里面有无数据和id判断出是添加页面还是修改页面-->
      <div v-if="this.$route.params && this.$route.params.id">修改心理医师信息</div>
      <div v-else>添加心理医师</div>
    </div>

    <el-form label-width="120px" :rules="rules" :model="list">
      <el-form-item label="心理医师头像" prop="avatar">
        <!--        头像缩略图-->
        <pan-thumb :image="list.avatar"/>
        <!--        文件上传按钮-->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像</el-button>
        <!--
        v-show:是否显示上传组件
        ：key ：类似于id，如果一个页面上传多个图片控件，可以作区分
        ：url ：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success: 上传成功后的回调
        -->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :url="BASE_API+'/ossService/fileOss/avatar'"
          field="file"
          @close="close"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item>
      <el-form-item label="身份证" prop="identityCard">
        <el-input v-if="this.$route.params && this.$route.params.id" v-model="list.identityCard" disabled/>
        <el-input v-else v-model="list.identityCard" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="list.name" />
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="list.intro">
        </el-input>
      </el-form-item>
      <el-form-item label="心理医师资历介绍" prop="career">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="list.career">
        </el-input>
      </el-form-item>
      <el-form-item label="头衔" prop="level">
        <el-select v-model="list.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            value使用动态绑定的值，心理医师头衔由1 2代替
          -->
          <el-option :value="0" label="高级心理医师" />
          <el-option :value="1" label="首席心理医师" />
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-select v-model="list.sort" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            value使用动态绑定的值，心理医师头衔由1 2代替
          -->
          <el-option :value="0" label="青铜vip" />
          <el-option :value="1" label="白银vip" />
        </el-select>
      </el-form-item>
      <el-form-item label="电话号码" prop="phoneNumber">
        <el-input v-model="list.phoneNumber" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="list.email" />
      </el-form-item>


      <!-- 心理医师证书-->
      <el-form-item label="心理医师证书">
        <el-upload
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader"
          :action="BASE_API+'/ossService/fileOss/avatar'"
        >
          <img v-if="list.certificate" :src="list.certificate" alt="">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <span style="margin-left: 8.7%;font-size: 20px; font-weight: 400;">*点击图片框修改证书*</span>
      <br><br><br>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" plain="true" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  // 引入调用teacher.js文件
  import psychologistApi from '@/api/Edu/psychologist/psychologist.js'
  // 引入上传头像的功能组件
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'

  export default {
    components: { ImageCropper, PanThumb }, // 组件的声明
    data() {
      const checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        setTimeout(() => {
          if (mailReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的邮箱格式'))
          }
        }, 100)
      };
      const validatePhoneNumber = (rule, value, callback) => {
        if (/^1[34578]\d{9}$/.test(value) === false) {
          callback(new Error("手机号格式错误"));
        } else {
          callback();
        }
      };
      return {
        list: {
          intro: '',
          name: '',
          sort: 0,
          phoneNumber: '',
          email: '',
          avatar: '',
          career: '',
          level: 0,
          identityCard: '',
          certificate: ''
        }, // v-model双向绑定
        imagecropperShow: false, // 上传弹框组件是否显示
        imagecropperKey: 0, // 上传组件唯一标识
        BASE_API: process.env.VUE_APP_BASE_API, // 获取dev.env.js里面地址
        saveBtnDisabled: false, // 保存按钮是否禁用
        rules: {
          // 要以数组形式展示
          name: [
            { required: true, message: "姓名不能为空", trigger: "blur"}
          ],
          identityCard: [
            { required: true, message: "身份证不能为空", trigger: "blur"}
          ],
          email: [
            {
              required: true,
              trigger: "blur",
              validator: checkEmail
            }
          ],
          phoneNumber: [
            {
              required: true,
              message: "请输入手机号码",
              trigger: "blur"
            },
            {
              validator: validatePhoneNumber,
              trigger: "blur"
            }
          ],
        }
      }
    },
    watch: { // vue的监听
      $route(to, from) { // 路由变化方式，路由一发生变化 就执行方法
        this.init()
      }
    },
    created() { // 页面渲染前执行
      this.init()
    },
    methods: {
      //关闭上传弹框的方法
      close(){
        this.imagecropperShow=false;
        //初始化上传组件
        this.imagecropperKey=this.imagecropperKey+1
      },
      //上传成功方法
      cropSuccess(data){
        this.imagecropperShow=false;
        //上传之后接口返回图片地址
        this.list.avatar=data.url;
        this.imagecropperKey=this.imagecropperKey+1
      },
      // 文件上传成功
      handleAvatarSuccess(response) {
        if (response.success) {
          this.list.certificate = response.data.url;
          // 强制重新渲染
          this.$forceUpdate()
        } else {
          this.$message.error('上传失败! （非20000）')
        }
      },

      // 文件上传失败（http）
      handleAvatarError() {
        this.$message.error('上传失败! （http失败）')
      },

      // 上传校验
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt3M = file.size / 1024 / 1024 < 3;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt3M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt3M
      },

      init() {
        // 判断路径有id值  修改操作
        if (this.$route.params && this.$route.params.id) {
          const id = this.$route.params.id;
          this.getInfo(id)
        } else { // 判断路径没有id值  添加操作
          // 清空表单即清空心理医师
          this.list = {
              intro: '',
              name: '',
              sort: 0,
              phoneNumber: '',
              email: '',
              avatar: '',
              career: '',
              level: 0,
              identityCard: '',
              certificate: ''
          }// v-model双向绑定
        }
      },
      // 根据心理医师id查到心理医师信息 回显操作
      getInfo(id) {
        psychologistApi.getInfo(id)
          .then(response => {
            this.list = response.data.psychologist
          })
          .catch((response) => {
            this.$message({
              type: 'error',
              message: '获取数据失败'
            })
          })
      },

      // 保存按钮调用的方法，调用前判断是修改还是添加心理医师
      saveOrUpdate() {
        // 判断修改或添加 list是否有id
        if (!this.list.id) {
          // 添加
          this.addList()
        } else {
          // 修改
          this.updateList()
        }
      },
      // 添加心理医师的方法
      addList() {
        psychologistApi.addPsychologist(this.list)
          .then(response => { // 添加成功
            // 提示成功
            this.$message({
              type: 'success',
              message: '添加成功！ 😄'
            });
            // 回到心理医师列表页面
            // vue路由跳转
            this.$router.push({
              path: '/system/psychologistList'
            })
          })
      },
    // 修改心理医师的方法
    updateList() {
      psychologistApi.updatePsychologist(this.list)
        .then(response => { // 修改成功
          // 提示成功
          this.$message({
            type: 'success',
            message: '修改成功！ 🧙‍♂️'
          });
          // 回到心理医师列表页面
          // vue路由跳转
          this.$router.push({
            path: '/system/psychologistList'
          })
        })
    },
  }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader img {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
