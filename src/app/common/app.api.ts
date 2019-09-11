import { Component, OnInit } from '@angular/core';
/**
 * 接口配置文件
 * baseurl
 * urlList
 */
export class apiList implements OnInit {
  baseurl: any = '';
  urlList: any = {};
  constructor() {
    this.baseurl = 'http://localhost:3000';
    this.urlList = {
      'userLogin': {
        path: '/api/user/login',
        params: {
          email: '',
          userPwd: ''
        }
      },
      'selectDiary': {
        path: '/api/diary/selectDiary',
        params: {
          pno: Number,
          pageSize: Number,
          userId: Number,
        }
      },
      'selectMail': {
        path: '/api/user/selectMail',
        params: {
          email: ''
        }
      },
      'userReg': {
        path: '/api/user/reg',
        params: {
          email: '',
          userPwd: ''
        }
      },
      'diaryDetails': {
        path: '/api/diary/diaryDetails',
        params: {
          dId: '',
          userId: ''
        }
      },
      'writeDiary': {
        path: '/api/diary/writeDiary',
        params: {
          dContent: "", 
          dTitle: new Date().toLocaleDateString() + "日记", //日记标题
          dTag: [], //日记标签
          privacy: "0",
          userId: ''
        }
      },
      'totalDinfo':{
        path:'/api/diary/totalDinfo',
        params: {
          userId: ''
        }
      },
      'pushAdvice':{
        path:'/api/advice/pushAdvice',
        params:{
          adContent:''
        }
      },
      'updateUser':{
        path:'/api/user/updateUser',
        params:{
          userName: '',
          sex:'',
          birthday:'',
          signs:'',
          userId:''
        }
      }
    }
  }
  ngOnInit() { }
}