import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './shared/components/main-page/main-page.component';
import { StartGameComponent } from './shared/components/start-game/start-game.component';
import { MainGameComponent } from './shared/components/main-game/main-game.component';
import { OneQuestionComponent } from './shared/components/one-question/one-question.component';
import { OneCoastComponent } from './shared/components/one-coast/one-coast.component';
import { LoginComponent } from './shared/components/admin/login/login.component';
import { MainAdminPageComponent } from './shared/components/admin/main-admin-page/main-admin-page.component';
import { NewQuestionComponent } from './shared/components/admin/new-question/new-question.component';
import { OneUserComponent } from './shared/components/admin/one-user/one-user.component';
import { LaterPageComponent } from './shared/components/later-page/later-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    StartGameComponent,
    MainGameComponent,
    OneQuestionComponent,
    OneCoastComponent,
    LoginComponent,
    MainAdminPageComponent,
    NewQuestionComponent,
    OneUserComponent,
    LaterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
