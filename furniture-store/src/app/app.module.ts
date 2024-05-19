import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FurnitureListComponent } from './furniture-list/furniture-list.component';
import { FurnitureDetailComponent } from './furniture-detail/furniture-detail.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { environment } from '../environments/environment';

const firebaseConfig = {
  projectId: "furniturestoretmate",
  appId: "1:720907215838:web:8154319e858f04a71df34f",
  storageBucket: "furniturestoretmate.appspot.com",
  apiKey: "AIzaSyAwxjxjgH0KkgqROJz0tP3q7WXYGaAm9kA",
  authDomain: "furniturestoretmate.firebaseapp.com",
  messagingSenderId: "720907215838"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FurnitureListComponent,
    FurnitureDetailComponent,
    SlideshowComponent,
    UserProfileComponent,
    LoginComponent,
    RegisterComponent,
    ShoppingCartComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
