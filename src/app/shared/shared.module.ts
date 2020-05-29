import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesModule } from './services/services.module';
import { PipesModule } from './pipes/pipes.module';
import { ModelsModule } from './models/models.module';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    ServicesModule,
    PipesModule,
    ModelsModule,
    ComponentsModule,
    DirectivesModule
  ]
})
export class SharedModule {}
