import { Routes } from '@angular/router'
import { EventListComponent } from './app/article-list/event-list.component';
import { EventDetailsComponent } from './app/article-details/event-details.component';
import { CreateEventComponent } from './app/create-article/create-event.component';
import { LoginComponent } from './app/login/login.component';
import { RegistrationComponent } from './app/registration/registration.component';
import { NotFoundComponent } from './app/not-found/not-found.component';
import { ArticleRouteGardService } from './app/services/article-route-gard.service';
import { UpdateUserComponent } from './app/update-user/update-user.component';
import { ModifyArticleComponent }from './app/modify-article/modify-article.component';
import { UpdateUserProfileComponent } from './app/update-user-profile/update-user-profile.component';
import { ShoppingCartComponent} from './app/shopping-cart/shopping-cart.component';
import { OrderComponent } from './app/order/order.component';



export const appRoutes:Routes = [
    {path:'events/new', component: CreateEventComponent},
    {path: 'events', component: EventListComponent},
    {path: 'event/:id', component: EventDetailsComponent, canActivate: [ArticleRouteGardService]},
    // , canActivate: [ArticleRouteGardService]},
    {path:'login', component: LoginComponent},
    {path:'updateUser', component: UpdateUserComponent},
    {path:'updateArticle', component: ModifyArticleComponent},
    {path:'userProfile', component: UpdateUserProfileComponent},
    {path:'registration', component: RegistrationComponent},
    {path:'shoppingCart', component: ShoppingCartComponent},
    {path:'order', component: OrderComponent},
    {path: '404', component: NotFoundComponent},
    {path: '', redirectTo:'/events', pathMatch: 'full'},
    {path: '**', redirectTo:'/404', pathMatch: 'full'}
]