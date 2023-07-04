import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  allWishlistItems:any=[]
  constructor(private api:ApiService){}
  ngOnInit(): void {

this.api.getWishlistItems().subscribe((result:any)=>{
  console.log(result);
  this.allWishlistItems=result
  
},(result:any)=>{
  console.log(result.error)
})
    
  }

  removeWishlistItem(id:any){
    this.api.removeWishlistItem(id).subscribe((result:any)=>{
      console.log(result);
      this.allWishlistItems=result
      
    },(result:any)=>{
      (result.error)
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
