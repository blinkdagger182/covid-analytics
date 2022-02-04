import { Component, OnInit , ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale , registerables} from 'chart.js';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';
import { SharePointService } from 'src/app/services/share-point.service';
import { IonInfiniteScroll , NavController, AlertController } from '@ionic/angular';
import { NewsPage } from 'src/app/pages/news/news.page';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
 
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  // @ViewChild('barCanvas') private barCanvas: ElementRef;
  // @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;

  @ViewChild('lineCanvas', {static: true}) private lineCanvas: ElementRef;

  constructor(public alertController: AlertController, private router: Router, public sharepoint:SharePointService, public navCtrl: NavController) { Chart.register(...registerables);}
  data:any
  barChart: any;
  lineChart:any;
  newsFeed:any;
  bars: any;
  today:any
  featuredNews:any;
  colorArray: any;
  newsLoading:boolean;
  covidByState;
  featuredStats:any;
  featuredTotal:any;


  ngOnInit(){
    this.newsLoading=true
    this.featuredStats=[]
    console.log(this.newsLoading)
      // this.barChartMethod()
      this.linechart()
      // this.barChartMethod()
      
      this.sharepoint.dateGlobal().subscribe(result=>{
        console.log(result)
      })
      this.getCovidStatsByState('s')
      this.sharepoint.newsCovidMalaysia().subscribe(result=>{
        
        console.log(result)
        this.featuredNews=[];
        this.newsFeed=result
        for (let i:any=0; i<=2; i++){
          this.featuredNews[i]=this.newsFeed.articles[i]
          this.featuredNews[i].publishedAt=moment(this.newsFeed.articles[i].publishedAt).format('MMM Do YY')
        }
        // this.featuredNews=this.newsFeed.articles[0]
        this.newsLoading=false
      console.log(this.featuredNews)
      })
      this.today = moment((new Date().toISOString().slice(0, 10))).format('MMM Do YY')
      // this.today=moment(this.today).format('lll');
      // console.log(moment((new Date().toISOString().slice(0, 10))).format('MMM Do YY'))    
      
  }


  readJson(){
    fetch('./assets/datacovid.json').then(response => {
      return response.json();
    }).then(data => {
      // Work with JSON data here
      console.log(data);
    }).catch(err => {
      // Do something for an error here
    });
  }

getCovidStatsByState(state){
  this.sharepoint.dataByState(state).subscribe(result=>{
    if (result!=null){
      this.covidByState=result
    this.featuredTotal=0;
    console.log(result)
    console.log(result)
    console.log("this.covidByState", this.covidByState)
    for (let i:any=0; i<=this.covidByState.length; i++){
      this.featuredTotal+=this.covidByState[i].sum
      console.log("this.covidByState.sum", this.covidByState[i].sum)
      // this.featuredStats[i].publishedAt=moment(this.newsFeed.articles[i].publishedAt).format('MMM Do YY')
      // console.log(this.featuredTotal)
    }}
    else {
      // this.presentAlert()
    }
    console.log(this.featuredTotal)
  })
}
async presentAlert() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Alert',
    // subHeader: 'Subtitle',
    message: 'Check your connection and try again.',
    buttons: ['OK']
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}

//CHARTS AND GRAPHS
public linechart() {
  this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: 'My First dataset',
                  fill: false,
                  // lineTension: 0.1,
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'rgba(75,192,192,1)',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: [65, 59, 80, 81, 56, 55, 40],
                  spanGaps: false,
              }
          ]
      }
  });
}
createBarChart() {
  this.bars = new Chart(this.barChart.nativeElement, {
    type: 'bar',
    data: {
      labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
      datasets: [{
        label: 'Viewers in millions',
        data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
        backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
        borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        // yAxes: [{
        //   ticks: {
        //     beginAtZero: true
        //   }
        // }]
      }
    }
  });
}

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.newsFeed.articles.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.newsLoading=true
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.newsLoading=false
    }, 500);
  }
  toNewsPage(news){
    this.router.navigate(['/news'])
  }
  // barChartMethod() {
  //   // Now we need to supply a Chart element reference with an object that defines the type of chart we want to use, and the type of data we want to display.
  //   this.barChart = new Chart(this.barCanvas.nativeElement, {
  //     type: 'bar',
  //     data: {
  //       labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
  //       datasets: [{
  //         label: '# of Votes',
  //         data: [200, 50, 30, 15, 20, 34],
  //         backgroundColor: [
  //           'rgba(255, 99, 132, 0.2)',
  //           'rgba(54, 162, 235, 0.2)',
  //           'rgba(255, 206, 86, 0.2)',
  //           'rgba(75, 192, 192, 0.2)',
  //           'rgba(153, 102, 255, 0.2)',
  //           'rgba(255, 159, 64, 0.2)'
  //         ],
  //         borderColor: [
  //           'rgba(255,99,132,1)',
  //           'rgba(54, 162, 235, 1)',
  //           'rgba(255, 206, 86, 1)',
  //           'rgba(75, 192, 192, 1)',
  //           'rgba(153, 102, 255, 1)',
  //           'rgba(255, 159, 64, 1)'
  //         ],
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         // yAxes: [{
  //         //   ticks: {
  //         //     beginAtZero: true
  //         //   }
  //         // }]
  //       }
  //     }
  //   });
  // }
}
