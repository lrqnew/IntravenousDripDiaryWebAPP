import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var url = window.location.pathname;
    var pcurl = "http://localhost:8080" + url

    if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) == false || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent)) == false) {
      if (window.location.href.indexOf("?mobile") < 0) {
        try {
          if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) == false) {
            window.location.href = pcurl;
          }

        } catch (e) { }
      }
    }
  }

}
