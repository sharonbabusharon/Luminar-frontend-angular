import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
totalPrice:number=0
username:string=''
email:string=''
paymentStatus:boolean=false


showSuccess:boolean=false

showPaypal:boolean=false

public payPalConfig?: IPayPalConfig;

  constructor(private api:ApiService,private cartFb:FormBuilder){}
  addressDetails=this.cartFb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    email:['',[Validators.required,Validators.email]]
  })
  cartItems:any=[]
  ngOnInit(): void {
    this.initConfig();
    this.api.getCartItems().subscribe((result:any)=>{
      console.log(result);
      this.cartItems=result
      //call get cart total
      this.getCartTotal()
      
    },(result:any)=>{
      console.log(result.error);
      
    })
  
  }

  //to remove  cart item
  removeCartItem(id:any){
    alert("item removed from cart")
    this.api.removeCartItem(id).subscribe((result:any)=>{

    
     this.cartItems=result
      this.getCartTotal()
    },(result:any)=>{
      alert(result.error);
      
    })
  }
 
  getCartTotal(){
    let total=0
    this.cartItems.forEach((item:any)=>{
      total=total+item.price
      this.totalPrice=Math.ceil(total)
      console.log(total);
      // console.log(item.price)
    })
  }

  submitForm()
  {
    if(this.addressDetails.valid)
    {
      console.log(this.addressDetails);
      this.paymentStatus=true
      this.username=this.addressDetails.value.username||''
      this.email=this.addressDetails.value.email||''
      
    }else{
      alert("Please provide valid details")
    }
  }


  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

  makepayment(){
    this.showPaypal=true
  }

}
