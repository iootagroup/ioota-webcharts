import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LiveComponent } from './charts/live/live.component';
import { HistoryComponent } from './charts/history/history.component';

const routes: Routes = [
  {path: 'charts/live' , component: LiveComponent},
  {path: 'charts/history' , component: HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
