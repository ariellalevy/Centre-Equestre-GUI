import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // animation
import { MatButtonModule } from '@angular/material/button';  // button
import { MatCardModule } from '@angular/material/card'; // card
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelLoginComponent } from './panel-login/panel-login.component';
import { PanelGeneralComponent } from './panel-general/panel-general.component';
import { DialogRetrievePassword } from './panel-login/panel-login.component'
import { DialogConnexion } from './panel-login/panel-login.component';
import { PanelAcceuilComponent } from './panel-acceuil/panel-acceuil.component';
import { UserInfoComponent } from './user-info/user-info.component'
import { DialogModificationMdp } from './user-info/user-info.component';
import { PanelCreateComponent } from './panel-create/panel-create.component'
import {MatStepperModule} from '@angular/material/stepper';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { PanelListeComponent } from './panel-liste/panel-liste.component'

@NgModule({
  declarations: [
    AppComponent,
    PanelLoginComponent,
    PanelGeneralComponent,
    DialogRetrievePassword,
    DialogConnexion,
    PanelAcceuilComponent,
    UserInfoComponent,
    DialogModificationMdp,
    PanelCreateComponent,
    PanelListeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatIconModule, FormsModule, ReactiveFormsModule,
    MatDialogModule, MatToolbarModule, MatSidenavModule, MatListModule, MatTabsModule, MatGridListModule, MatMenuModule, MatStepperModule,
    MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatPaginatorModule
  ],
  providers: [AppService, MatNativeDateModule],
  entryComponents: [PanelLoginComponent, DialogRetrievePassword],
  bootstrap: [AppComponent]
})
export class AppModule { }
