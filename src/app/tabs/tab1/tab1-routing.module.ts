import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
// import { NewsPage } from './../../pages/news.page';
import { NewsPage } from 'src/app/pages/news/news.page';
import { ChartsPage } from 'src/app/pages/charts/charts.page';
const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: '/news',
    component: NewsPage,
  },
  {
    path: '/chart',
    component: ChartsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
