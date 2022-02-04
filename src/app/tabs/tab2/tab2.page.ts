import { Component , OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { SharePointService } from 'src/app/services/share-point.service';
// let format = require("date-fns/format");

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
 
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
  constructor( private router:Router, public sharepoint:SharePointService,  ) {}
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  dateValue = '';
  dateValue2 = '';
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
  stateLoading:any;
  selectedState:any;
  selectOptionState:any;

  ngOnInit(){
    this.selectOptionState=false
  

}
confirm() {
  // this.datetime.nativeEl.confirm();
  console.log(this.datetime)
  // console.log(date)
  // this.getCovidStatsByDate('2020-01-25', '2020-01-25')
  // console.log(this.days);
  // console.log(this.inputId)
  // this.router.navigate(['charts'])
}
reset() {
  // this.datetime.nativeEl.reset();
}
chartsMoreDetail(){
  this.router.navigate(['charts'])
}

formatDate(value: string) {
  // return format(parseISO(value), 'MMM dd yyyy');
}
async getCovidStatsByState(state){
  this.sharepoint.dataByState(state).subscribe(result=>{
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
    
    console.log(result)
    console.log(result)
    console.log("this.covidByState", this.covidByState)
    for (let i:any=0; i<=this.covidByState.length; i++){
      this.featuredTotal=this.featuredTotal+this.covidByState[i].sum
      this.featuredTotalNew=this.featuredTotalNew+this.covidByState[i].cases.new
      this.featuredTotalImport=this.featuredTotalImport+this.covidByState[i].cases.import
      this.featuredTotalRecovered=this.featuredTotalRecovered+this.covidByState[i].cases.recovered
      this.featuredTotalActive=this.featuredTotalActive+this.covidByState[i].cases.active
      this.featuredTotalCluster=this.featuredTotalCluster+this.covidByState[i].cases.cluster
      this.featuredTotalUnvax=this.featuredTotalUnvax+this.covidByState[i].cases.unvax
      this.featuredTotalPVax=this.featuredTotalPVax+this.covidByState[i].cases.pvax
      this.featuredTotalFVax=this.featuredTotalFVax+this.covidByState[i].cases.fvax
      this.featuredTotalBoost=this.featuredTotalBoost+this.covidByState[i].cases.boost
      this.featuredTotalChild=this.featuredTotalChild+this.covidByState[i].cases.child
      this.featuredTotalAdolescent=this.featuredTotalAdolescent+this.covidByState[i].cases.adolescent
      this.featuredTotalAdult=this.featuredTotalAdult+this.covidByState[i].cases.adult
      this.featuredTotalElderly=this.featuredTotalElderly+this.covidByState[i].cases.elderly
      this.featuredTotal0_4=this.featuredTotal0_4+this.covidByState[i].cases.cases_0_4
      this.featuredTotal5_11=this.featuredTotal5_11+this.covidByState[i].cases.cases_5_11
      this.featuredTotal12_17=this.featuredTotal12_17+this.covidByState[i].cases.cases_12_17
      this.featuredTotal18_29=this.featuredTotal18_29+this.covidByState[i].cases.cases_18_29
      this.featuredTotal30_39=this.featuredTotal30_39+this.covidByState[i].cases.cases_30_39
      this.featuredTotal40_49=this.featuredTotal40_49+this.covidByState[i].cases.cases_40_49
      this.featuredTotal50_59=this.featuredTotal50_59+this.covidByState[i].cases.cases_50_59
      this.featuredTotal60_69=this.featuredTotal60_69+this.covidByState[i].cases.cases_60_69
      this.featuredTotal70_79=this.featuredTotal70_79+this.covidByState[i].cases.cases_70_79
      this.featuredTotal80=this.featuredTotal80+this.covidByState[i].cases.cases_80
    }}
    else {
      // this.presentAlert()
    }
    console.log(this.featuredTotal)
    this.stateLoading=false
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    })
  })
}

getCovidStatsByDate(startDate:any, endDate:any){
  this.sharepoint.dataByDates(startDate, endDate).subscribe(result=>{
    if (result!=null){
      this.covidByDates=result
      this.featuredTotal=0;
      console.log(result)
      console.log("this.covidByState", this.covidByState)
      for (let i:any=0; i<=this.covidByState.length; i++){
        this.featuredTotal=this.featuredTotal+this.covidByState[i].sum
        console.log("this.covidByState.sum", this.covidByState[i].sum)
        // this.featuredStats[i].publishedAt=moment(this.newsFeed.articles[i].publishedAt).format('MMM Do YY')
        // console.log(this.featuredTotal)
      }}
    else {
      // this.presentAlert()
    }
    
    console.log(this.featuredTotal)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 10000);
    })
  })
}

async selectState(state:any){
  this.stateLoading=true
  console.log(state)
  this.selectedState=state
  this.selectOptionState=true
  await this.getCovidStatsByState(state)
  console.log(this.featuredTotal)
  
}
selectDate(date:any){
  console.log(date)
}

}
