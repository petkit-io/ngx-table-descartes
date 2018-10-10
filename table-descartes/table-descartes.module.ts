import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDescartesComponent } from './table-descartes.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TableDescartesComponent],
  exports: [TableDescartesComponent]
})
export class TableDescartesModule { }
