import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  BASEURL='https://luminar-backend.onrender.com'

  getAllProducts(){
    return this.http.get(`${this.BASEURL}/products/all-products`)
  }

  viewProduct(id:any){

    return this.http.get(`${this.BASEURL}/products/view-product/${id}`)
  }

  //api  to add products to wish;list
  addToWishlist(id:any,title:any,price:any,image:any){
    const body={
      id,
      title,
      price,
      image

    }
    return this.http.post(`${this.BASEURL}/wishlist/add-to-wishlist`,body)
  }

  //api to get all wishlist items
  getWishlistItems(){
    return this.http.get(`${this.BASEURL}/wishlist/get-items`)
  }

  //api to remove a wishlist item
  removeWishlistItem(id:any){
    return this.http.delete(`${this.BASEURL}/wishlist/remove-wishlist-item/${id}`)
  }

  //api to add pr4oducts to cart
  addToCart(product:any){
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity,
      grandTotal:product.grandTotal
    }
    return this.http.post(`${this.BASEURL}/cart/add-to-cart`,body)
  }

  //api to get cart items
  getCartItems(){
    return this.http.get(`${this.BASEURL}/cart/get-cart`)
  }

  //to remove cart item
  removeCartItem(id:any){
    return this.http.delete(`${this.BASEURL}/cart/remove-cart-item/${id}`)
  }
}
