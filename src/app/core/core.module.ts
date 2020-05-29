import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuardsModule } from './guards/guards.module';
import { InterceptorModule } from './interceptor/interceptor.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [GuardsModule, InterceptorModule]
})
export class CoreModule {}
