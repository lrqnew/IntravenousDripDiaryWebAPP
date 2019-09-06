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
    this.urlList =  {
      'userLogin': {
        path:'/api/user/login',
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
      'selectMail':{
        path:'/api/user/selectMail',
        params:{
          email:''
        }
      },
      'userReg':{
         path:'/api/user/reg',
         params:{
          email:'',
          userPwd:''
         }
      },
      'diaryDetails':{
        path:'/api/diary/diaryDetails',
        params:{
          dId:'',
          userId:''
        }
      }
    }
  }
  ngOnInit() {}
}