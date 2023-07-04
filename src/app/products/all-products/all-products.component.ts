import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allProducts:any=[]
  viewProduct:any={}

  constructor(private api:ApiService,private viewActivatedRoute:ActivatedRoute ){}

  ngOnInit(): void {
    this.api.getAllProducts().subscribe((result:any)=>{
      this.allProducts=result
      
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

  addToWishlist(){
    const {id,title,price,image}=this.viewProduct
    this.api.addToWishlist(id,title,price,image).subscribe((result:any)=>{
        alert(result)
    },(result:any)=>{
      alert(result.error)
    })
  }

  

}
