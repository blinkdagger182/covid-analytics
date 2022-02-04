import { Component, OnInit , ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';
import { Location } from '@angular/common'
import { SharePointService } from 'src/app/services/share-point.service';
// Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit{

  // @ViewChild('barCanvas') private barCanvas: ElementRef;
  // @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  // @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  @ViewChild('lineCanvas', {static: true}) private lineCanvas: ElementRef;

  constructor(private router: Router, public sharepoint:SharePointService, private location: Location) {Chart.register(...registerables)}
  data:any
  barChart: any;
  lineChart:any
  bars: any;
  colorArray: any;

  ngOnInit(){
    // this.readJson();
    this.sharepoint.dataByState('2022-01-31').subscribe(result=>{
      console.log(result)
    })
    
    //  this.barChartMethod()
    this.linechart()

    // this.barChart = new Chart(this.barCanvas.nativeElement, {
    //   type: "bar",
    //   data: {
    //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //     datasets: [
    //       {
    //         label: "# of Votes",
    //         data: [12, 19, 3, 5, 2, 3],
    //         backgroundColor: [
    //           "rgba(255, 99, 132, 0.2)",
    //           "rgba(54, 162, 235, 0.2)",
    //           "rgba(255, 206, 86, 0.2)",
    //           "rgba(75, 192, 192, 0.2)",
    //           "rgba(153, 102, 255, 0.2)",
    //           "rgba(255, 159, 64, 0.2)"
    //         ],
    //         borderColor: [
    //           "rgba(255,99,132,1)",
    //           "rgba(54, 162, 235, 1)",
    //           "rgba(255, 206, 86, 1)",
    //           "rgba(75, 192, 192, 1)",
    //           "rgba(153, 102, 255, 1)",
    //           "rgba(255, 159, 64, 1)"
    //         ],
    //         borderWidth: 1
    //       }
    //     ]
    //   },
    //   options: {
    //     scales: {
    //       // yAxes: [
    //       //   {
    //       //     ticks: {
    //       //       beginAtZero: true
    //       //     }
    //       //   }
    //       // ]
    //     }
    //   }
    // });
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
// createBarChart() {
//   this.bars = new Chart(this.barChart.nativeElement, {
//     type: 'bar',
//     data: {
//       labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
//       datasets: [{
//         label: 'Viewers in millions',
//         data: [2.5, 3.8, 5, 6.9, 6.9, 7.5, 10, 17],
//         backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
//         borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: true
//           }
//         }]
//       }
//     }
//   });
// }
goBack(){
  this.location.back()
}
}
