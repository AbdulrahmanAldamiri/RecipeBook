import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthSerivce } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {
  isLoginMode:boolean=true;
  isLoading=false;
  error:string=null;
  @ViewChild(PlaceholderDirective,{static:false}) alertHost:PlaceholderDirective;
  constructor(private authService:AuthSerivce,private router:Router,private componentFactoryResolver:ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading=true;
    let authObs:Observable<AuthResponseData>;

    if(this.isLoginMode){
      authObs=this.authService.login(email,password);
    } else {
      authObs=this.authService.signUp(email,password);
    }
    authObs.subscribe(responseData=>{
      console.log(responseData)
      this.isLoading=false;
      this.router.navigate(['/recipes']);
    },errorMessage=>{
      this.error=errorMessage;
      this.isLoading=false;
      this.showErrorAlert(errorMessage);
    });
    form.reset();
  }

  onHandleError(){
    this.error=null;
  }

  private closeSub:Subscription;

  private showErrorAlert(message:string){
    const alertComponentFactory=this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); // clears all angular components that have been already rendered
    const compRef=hostViewContainerRef.createComponent(alertComponentFactory);
    compRef.instance.message=message;
    this.closeSub=compRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

}
