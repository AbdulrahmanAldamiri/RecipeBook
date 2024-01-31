import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSerivce } from './auth/auth.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService:AuthSerivce,private loggingService:LoggingService){}
    ngOnInit(): void {
      this.authService.autoLogin();
      this.loggingService.printLog('Hello bro app component ngOnInit');
    }
}
