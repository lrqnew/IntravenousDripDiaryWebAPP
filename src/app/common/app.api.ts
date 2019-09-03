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
      'getUser': {
        path: '/getUser',
        params: {
          id: ''
        }
      }
    }
  }
  ngOnInit() {}
}