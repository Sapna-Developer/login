import {NgModule} from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import {
  MatButtonModule, 
  MatCardModule, 
  MatDatepickerModule, 
  MatDialogModule, 
  MatIconModule, 
  MatInputModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatMenuModule,
  MatCheckboxModule,  
  MatAutocompleteModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatSortModule,
  MatGridListModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatTabsModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTabsModule
  ],
  exports: [
    FlexLayoutModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTreeModule,
    MatTabsModule
  ],
  declarations: []
})
export class SharedModule {

}
