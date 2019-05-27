import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatToolbar } from '@angular/material/toolbar';
import { MatInputModule, MatNativeDateModule, MatDatepickerModule, MAT_DATE_LOCALE} from '@angular/material';
import { MatDialogModule, MatSortModule, MatPaginatorModule } from "@angular/material";
import { MatTableModule }  from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EventListComponent } from './article-list/event-list.component';
import { EventItemComponent } from './article-item/event-item.component';
import { EventDetailsComponent } from './article-details/event-details.component';
import { appRoutes } from '../routes';
import { CreateEventComponent } from './create-article/create-event.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpdateUserComponent } from './update-user/update-user.component';

import { RegistrationService}  from './services/registration.service'
import { ArticleService } from './services/article.service';
import { AuthService } from './services/auth.service';
import { ArticleRouteGardService } from './services/article-route-gard.service'
import { TokenService } from './services/token.service';
import { AdminService } from './services/admin.service';
import { UserService } from './services/user.service';
import { DeleteUserModalComponent } from './modals/delete-user-modal-component/delete-user-modal.component';
import { UpdateUserModalComponent } from './modals/update-user-modal/update-user-modal.component';
import { ModifyArticleComponent } from './modify-article/modify-article.component';
import { DeleteArticleModalComponent } from './modals/delete-article-modal/delete-article-modal.component';
import { UpdateArticleModalComponent } from './modals/update-article-modal/update-article-modal.component';
import { UpdateUserProfileComponent } from './update-user-profile/update-user-profile.component';
import { DeleteAddressModalComponent } from './modals/delete-address-modal/delete-address-modal.component';
import { AddAddressModalComponent } from './modals/add-address-modal/add-address-modal.component';
import { UpdateAddressModalComponent } from './modals/update-address-modal/update-address-modal.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderComponent } from './order/order.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MatToolbar,
    EventListComponent,
    EventItemComponent,
    EventDetailsComponent,
    CreateEventComponent,
    LoginComponent,
    RegistrationComponent,
    NotFoundComponent,
    UpdateUserComponent,
    DeleteUserModalComponent,
    UpdateUserModalComponent,
    ModifyArticleComponent,
    DeleteArticleModalComponent,
    UpdateArticleModalComponent,
    UpdateUserProfileComponent,
    DeleteAddressModalComponent,
    AddAddressModalComponent,
    UpdateAddressModalComponent,
    ShoppingCartComponent,
    OrderComponent,
    
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSlideToggleModule,
    ToastrModule.forRoot()
  ],
  providers: [
    ArticleService,
    RegistrationService,
    AuthService,
    ArticleRouteGardService,
    TokenService,
    AdminService,
    UserService,
    
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'} // used for datepicker date format
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteUserModalComponent, UpdateUserModalComponent,
              DeleteArticleModalComponent, UpdateArticleModalComponent, 
              DeleteAddressModalComponent, AddAddressModalComponent,
              UpdateAddressModalComponent]
})
export class AppModule {

  
 }
