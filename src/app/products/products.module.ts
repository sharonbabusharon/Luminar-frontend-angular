import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';





@NgModule({
  declarations: [
    ProductsComponent,
    AllProductsComponent,
    WishlistComponent,
    ViewproductsComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPayPalModule 
  ]
})
export class ProductsModule { }
