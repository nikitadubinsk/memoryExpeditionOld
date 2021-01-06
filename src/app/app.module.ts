import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CategoryPipe } from './shared/pipes/category.pipe';

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
    CategoryPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
