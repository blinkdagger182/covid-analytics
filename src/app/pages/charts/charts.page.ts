import { Component, OnInit , ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { RouterOutlet, Router, ActivationStart, ActivatedRoute  } from '@angular/router';
import { Location } from '@angular/common'
import { NavController } from '@ionic/angular';
import { SharePointService } from 'src/app/services/share-point.service';
// Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.page.html',
  styleUrls: ['./charts.page.scss'],
})
export class ChartsPage implements OnInit{

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef;
  // @ViewChild('lineCanvas') private lineCanvas: ElementRef;
  // @ViewChild('lineCanvas', {static: true}) private lineCanvas: ElementRef;
  


  constructor(private navCtrl: NavController, private route: ActivatedRoute, private router: Router, public sharepoint:SharePointService, private location: Location) {
    Chart.register(...registerables)
  }
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
  covidByDates;
  featuredStats:any;
  featuredTotal:any;
  id:any;
  sub:any;
  featuredTotalNew:any;
  featuredTotalImport:any;
  featuredTotalRecovered:any;
  featuredTotalActive:any;
  featuredTotalCluster:any;
  featuredTotalUnvax:any;
  featuredTotalPVax:any;
  featuredTotalFVax:any;
  featuredTotalBoost:any;
  featuredTotalChild:any;
  featuredTotalAdolescent:any;
  featuredTotalAdult:any;
  featuredTotalElderly:any;
  featuredTotal0_4:any;
  featuredTotal5_11:any;
  featuredTotal12_17:any;
  featuredTotal18_29:any;
  featuredTotal30_39:any;
  featuredTotal40_49:any;
  featuredTotal50_59:any;
  featuredTotal60_69:any;
  featuredTotal70_79:any;
  featuredTotal80:any;

  xlabels:any;

  stateLoading:any;
  selectedState:any;
  selectOptionState:any;
  startDate:any;
  endDate:any;
  featuredStartDate:any;
  featuredEndDate:any;
  featuredState:any;
  dataLoading:any;

  sortedListOfStates:any
  sortedByCases:any;
  sortedByState:any;

  ngOnInit(){
    // this.readJson();
    // this.sharepoint.dataByState('2022-01-31').subscribe(result=>{
    //   console.log(result)
    // })
    this.dataLoading=true;
    let id = this.route.snapshot.paramMap.get('id')
    this.startDate = this.route.snapshot.paramMap.get('startDate')
    this.endDate = this.route.snapshot.paramMap.get('endDate')
    console.log(id)
    if (id==''){}
    this.selectedState=''
    if (id=='Johor')
    this.selectedState='johor'
    else if (id=='Kedah')
    this.selectedState='kedah'
    else if (id=='Kelantan')
    this.selectedState='kelantan'
    else if (id=='Malacca')
    this.selectedState='melaka'
    else if (id=='Negeri Sembilan')
    this.selectedState='negeri_sembilan'
    else if (id=='Pahang')
    this.selectedState='pahang'
    else if (id=='Pulau Pinang')
    this.selectedState='pulau_pinang'
    else if (id=='Perak')
    this.selectedState='perak'
    else if (id=='Perlis')
    this.selectedState='perlis'
    else if (id=='Selangor')
    this.selectedState='selangor'
    else if (id=='Terengganu')
    this.selectedState='terengganu'
    else if (id=='W.P. Kuala Lumpur')
    this.selectedState='w.p._kuala_lumpur'
    else if (id=='W.P. Putrajaya')
    this.selectedState='"w.p_labuan'
    else if (id=='W.P. Putrajaya')
    this.selectedState='w.p_putrajaya'
    console.log("chartSelectedState", this.selectedState)
    // this.getCovidStatsByDatesAndState(this.startDate, this.endDate, this.selectedState)
    // console.log("featuredTotalNew", this.featuredTotalNew)
    this.barChartCard()
    // this.linechart()
  }
  async barChartCard(){
    await this.getCovidStatsByDatesAndState(this.startDate, this.endDate, this.selectedState)
    console.log("chartdataa", this.featuredTotalBoost)
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["New", "Import", "Rec.", "Active", "Cluster", "Unvacc.", "P.Vacc.", "F.Vacc.", "Boosted:"],
        datasets: [
          {
            label: "Types of Cases",
            data: [
              this.featuredTotalNew, this.featuredTotalImport, this.featuredTotalRecovered, this.featuredTotalActive,
               this.featuredTotalCluster, this.featuredTotalUnvax, this.featuredTotalPVax,  this.featuredTotalFVax, this.featuredTotalBoost
             ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    });
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

goBack(){
  this.location.back()
}

async getCovidStatsByDatesAndState(startDate:any, endDate:any, state:any){
  await this.sharepoint.dataByDatesAndState(startDate, endDate, state).then((result)=>{
    if (result!=null){
      this.covidByState=result
      this.featuredTotal=0;
      this.featuredTotalNew=0;
      this.featuredTotalImport=0
      this.featuredTotalRecovered=0
      this.featuredTotalActive=0
      this.featuredTotalCluster=0
      this.featuredTotalUnvax=0
      this.featuredTotalPVax=0
      this.featuredTotalFVax=0
      this.featuredTotalBoost=0
      this.featuredTotalChild=0
      this.featuredTotalAdolescent=0
      this.featuredTotalAdult=0
      this.featuredTotalElderly=0
      this.featuredTotal0_4=0
      this.featuredTotal5_11=0
      this.featuredTotal12_17=0
      this.featuredTotal18_29=0
      this.featuredTotal30_39=0
      this.featuredTotal40_49=0
      this.featuredTotal50_59=0
      this.featuredTotal60_69=0
      this.featuredTotal70_79=0
      this.featuredTotal80=0
      this.featuredTotal=this.covidByState[this.covidByState.length-1].cases.active
      console.log(this.covidByState)
      console.log("this.covidByState", this.covidByState)
      for (let i:any=0; i<=this.covidByState.length; i++){
        // this.featuredTotal=this.featuredTotal+this.covidByState[i].cases.new
        this.featuredTotalNew+=this.covidByState[i].cases.new
        this.featuredTotalActive+=this.covidByState[i].cases.active
        this.featuredTotalImport+=this.covidByState[i].cases.import
        this.featuredTotalRecovered+=this.covidByState[i].cases.recovered
        this.featuredTotalCluster+=this.covidByState[i].cases.cluster
        this.featuredTotalUnvax+=this.covidByState[i].cases.unvax
        this.featuredTotalPVax+=this.covidByState[i].cases.pvax
        this.featuredTotalFVax+=this.covidByState[i].cases.fvax
        this.featuredTotalBoost+=this.covidByState[i].cases.boost
        this.featuredTotalChild+=this.covidByState[i].cases.child
        this.featuredTotalAdolescent+=this.covidByState[i].cases.adolescent
        this.featuredTotalAdult+=this.covidByState[i].cases.adult
        this.featuredTotalElderly+=this.covidByState[i].cases.elderly
        this.featuredTotal0_4+=this.covidByState[i].cases.cases_0_4
        this.featuredTotal5_11+=this.covidByState[i].cases.cases_5_11
        this.featuredTotal12_17+=this.covidByState[i].cases.cases_12_17
        this.featuredTotal18_29+=this.covidByState[i].cases.cases_18_29
        this.featuredTotal30_39+=this.covidByState[i].cases.cases_30_39
        this.featuredTotal40_49+=this.covidByState[i].cases.cases_40_49
        this.featuredTotal50_59+=this.covidByState[i].cases.cases_50_59
        this.featuredTotal60_69+=this.covidByState[i].cases.cases_60_69
        this.featuredTotal70_79+=this.covidByState[i].cases.cases_70_79
        this.featuredTotal80+=this.covidByState[i].cases.cases_80
        if (i=this.covidByState.length){
          console.log("data after loading",this.covidByState)
          console.log("dataLoading",this.dataLoading)
          this.dataLoading=false
        }
      }
      
    }
  })
}
}
