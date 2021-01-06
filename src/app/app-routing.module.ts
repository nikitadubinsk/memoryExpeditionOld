import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { MainGameComponent } from './shared/components/main-game/main-game.component';
import { LoginComponent } from './shared/components/admin/login/login.component';
import { NewQuestionComponent } from './shared/components/admin/new-question/new-question.component';
import { MainAdminPageComponent } from './shared/components/admin/main-admin-page/main-admin-page.component';
import { StartGameComponent } from './shared/components/start-game/start-game.component';


const routes: Routes = [
  {path: '', component: MainPageComponent, data: {animation: 'MainPage'}},
  {path: 'game', component: MainGameComponent, data: {animation: 'MainGamePage'}},
  {path: 'login', component: LoginComponent, data: {animation: 'LoginPage'}},
  {path: 'newQuestion', component: NewQuestionComponent},
  {path: 'admin', component: MainAdminPageComponent, data: {animation: 'AdminMainPage'}},
  {path: 'finish', component: StartGameComponent, data: {animation: 'StartGamePage'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
