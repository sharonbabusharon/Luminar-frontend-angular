import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit{

  viewProduct:any={}

  constructor(private api:ApiService,private viewActivatedRoute:ActivatedRoute){}
  productId:String=''
  ngOnInit(): void {
    this.viewActivatedRoute.params.subscribe((data:any)=>{
        console.log(data.id);
        this.productId=data.id
    })
    this.api.viewProduct(this.productId).subscribe((result:any)=>{
      console.log(result);
      this.viewProduct=result
    })
  }

  addToWishlist(){
    const {id,title,price,image}=this.viewProduct
    this.api.addToWishlist(id,title,price,image).subscribe((result:any)=>{
        alert(result)
    },(result:any)=>{
      alert(result.error)
    })
  }

  
  addToCart(product:any){


    Object.assign(product,{quantity:1})
    console.log(product);

    this.api.addToCart(product).subscribe((result:any)=>{
      alert(result)
    },(result:any)=>{
      console.log(result.error);
      
    })
  }


}
