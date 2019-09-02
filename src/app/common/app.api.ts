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
    this.baseurl = 'http://127.0.0.1';
    this.urlList =  {
      'login': {
        path: '/login',
        params: {
          username: '',
          password: ''
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