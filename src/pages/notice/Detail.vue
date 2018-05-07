<template>
    <div class="notice_main">
        <div class="notice_main_header">
            <router-link target="_blank" class="notice_con_title" to="/notice">公告中心 &nbsp;></router-link>
            <span> 公告详情</span>
        </div>
        <div class="notice_main_title">{{NoticeDetail.notice_title}}</div>
        <div class="notice_main_desc">{{NoticeDetail.notice_desc}}</div>
        <div class="notice_time">
            <div class="notice_time_left">{{NoticeDetail.notice_time}}</div>
            <div class="notice_time_right">{{NoticeDetail.notice_reading}}</div>
        </div>
        <div class="notice_con">{{NoticeDetail.notice_content}}</div>
    </div>
</template>
<script>
import { api } from '@/static/api'
export default {
    name:'Notice',
    data() {
       return {
         NoticeDetail: {},
         id: '',
       };
    },
    created(){
        this.GetNoticeDetail(this.$route.query.id)
    },
    methods: {

        // 获取公告
        GetNoticeDetail(id){
            var data = {id:id}
            api.GetNoticeDetail(data).then(res => {
                if(res.error_code == 1000){
                    this.NoticeDetail = res.data
                }else{
                    this.$message(res.error_desc)
                }
            }).catch(err => {

            })
        }
    },
}
</script>
<style>
    .notice_main{width:1200px;height:auto;min-height:200px;margin:0px auto;margin-top:40px;background:#191f27;overflow:hidden;}
    .notice_main_header{width:100%;height:50px;display:block;position:relative;padding:0px 50px;}
    .notice_main_header:after{width:1100px;height:1px;content:' ';display:block;background:#202234;position:absolute;bottom:0;left:50px;}
    .notice_main_header a{height:50px;line-height:50px;color:#455266;font-size:14px;display:block;float:left;}
    .notice_main_header span{color:white;display:block;line-height:50px;height:50px;float:left;font-size:14px;margin-left:5px;}
    .notice_main_title{padding:0px 50px;width:100%;margin-top:20px;height:24px;line-height:24px;font-size:20px;color:white;text-align:left;}
    .notice_main_desc{padding:0px 50px;width:100%;height:70px;margin-top:15px;line-height:22px;font-size:14px;color:#767a7f;}
    .notice_time{padding:0px 50px;width:100%;height:45px;padding-top:10px;}
    .notice_time_left{color:#85898e;width:180px;height:20px;line-height:20px;background:url('~@/assets/img/notice1.png') no-repeat left;float:left;font-size:13px;padding-left:22px;}
    .notice_time_right{color:#85898e;width:200px;height:20px;line-height:20px;float:left;background:url('~@/assets/img/notice2.png') no-repeat left;font-size:13px;padding-left:22px;}
    .notice_con{padding:40px 50px;background:#1c232c;width:100%;height:auto;min-height:150px;line-height:22px;font-size:14px;color:white;}
</style>
