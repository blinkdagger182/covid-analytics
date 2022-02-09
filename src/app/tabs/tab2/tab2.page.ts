import { Component , OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController , IonDatetime , AlertController, ToastController } from '@ionic/angular';
import { SharePointService } from 'src/app/services/share-point.service';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { HttpClient } from '@angular/common/http';
// import from './../../../../..states.json'
// let format = require("date-fns/format");
const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  @ViewChild('timePicker')
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
  constructor( private navCtrl: NavController, public http: HttpClient, public toastController: ToastController, private router:Router, public alertController: AlertController, public sharepoint:SharePointService,  ) {}
  @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
 
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
  startDate:any;
  endDate:any;
  featuredStartDate:any;
  featuredEndDate:any;
  featuredState:any;
  dataLoading:any;

  sortedListOfStates:any
  sortedByCases:any;
  sortedByState:any;
  // johorCases:any;
  // kedahCases:any;
  // kelantanCases:any;
  // melakaCases:any;
  // negeriSembilanCases:any;
  // pahangCases:any;
  // penangCases:any;
  // perakCases:any;
  // perlisCases:any;
  // selangorCases:any;
  // terengganuCases:any;
  // sabahCases:any;
  // sarawakCases:any;
  // wpKualaLumpurCases:any;
  // wpLabuanCases:any;
  // wpPutrajayaCases:any;

  states:any
  // person = [{firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"}]
  
  async ngOnInit(){
    this.selectOptionState=false
    this.startDate=0;
    this.endDate=0
    this.sortedByState=false
    this.sortedByCases=false
    await this.readJson();
    console.log("this.states", this.states)
    console.log("this.states[0]", this.states[0])
    console.log(typeof this.states)
    // console.log(typeof this)

    // console.log(this.person.firstName)
}
chartsMoreDetail(id){
  // this.router.navigate(['/charts', id])
  // this.navCtrl.navigateForward(['/charts', id])
  this.router.navigate(['/charts', { id: id, startDate:this.startDate, endDate:this.endDate}]);
  console.log("id", id)
}

async readJson(){
  fetch('./assets/states.json').then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
    this.states=data.states;
    console.log("this.states", this.states)
    console.log("this.states", this.states.states)
    // for (let i:any; i<this.states.length; i++)
    // console.log("this.states", this.states[i])
  }).catch(err => {
    // Do something for an error here
  });
  return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    })
}

// async readJson(){
//   this.http.get('./assets/states.json').subscribe(data => {
//     //console.log(data);
//     this.states = data
//  });
// }
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

async getCovidStatsByDatesAndState(startDate:any, endDate:any, state:any){
  // this.sharepoint.dataByDatesAndState(startDate, endDate, state).subscribe(result=>{
this.sharepoint.dataByDatesAndState(startDate, endDate, state).then((result)=>{
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
      if(this.covidByState[i].state=='johor'){
        this.states[0].cases+=this.covidByState[i].cases.new
        console.log("this.johorCases", this.states[0].cases)
        // console.log("this.johorCases", this.johorCases)
      }
      else if(this.covidByState[i].state=='kedah'){
        this.states[1].cases+=this.covidByState[i].cases.new
      }
      else if(this.covidByState[i].state=='kelantan'){
        this.states[2].cases+=this.covidByState[i].cases.new
      }
      else if(this.covidByState[i].state=='melaka'){
        this.states[3].cases+=this.covidByState[i].cases.new
      }
      else if(this.covidByState[i].state=='negeri_sembilan'){
        this.states[4].cases+=this.covidByState[i].cases.new
      }
      else if(this.covidByState[i].state=='pahang'){
        this.states[5].cases+=this.covidByState[i].cases.new
      }
      else if(this.covidByState[i].state=='pulau_pinang'){
        this.states[6].cases+=this.covidByState[i].cases.new
      }
      else if(this.covidByState[i].state=='perak'){
        this.states[7].cases+=this.covidByState[i].cases.new
      }
      else if(this.covidByState[i].state=='perlis'){
        this.states[8].cases+=this.covidByState[i].cases.new
      }
      else if(this.covidByState[i].state=='selangor'){
        this.states[9].cases+=this.covidByState[i].cases.new
      }
      else if(this.covidByState[i].state=='terengganu'){
        this.states[10].cases+=this.covidByState[i].cases.new
      }
      else if(this.covidByState[i].state=='sabah'){
        this.states[11].cases+=this.covidByState[i].cases.new
      }
      else if(this.covidByState[i].state=='sarawak'){
        this.states[12].cases+=this.covidByState[i].cases.new
      }
      else if(this.covidByState[i].state=='w.p._kuala_lumpur'){
        this.states[13].cases+=this.covidByState[i].cases.new
      }
      else if(this.covidByState[i].state=='w.p._labuan'){
        this.states[14].cases+=this.covidByState[i].cases.new
      }
      else if(this.covidByState[i].state=='w.p._putrajaya'){
        this.states[15].cases+=this.covidByState[i].cases.new
      }
    }}
    else {
      // this.presentAlert()
    }
    // this.johorCases=this.states[0].cases
    // this.kedahCases=this.states[1].cases
    // this.kelantanCases=this.states[2].cases
    // this.melakaCases=this.states[3].cases
    // this.negeriSembilanCases=this.states[4].cases
    // this.pahangCases=this.states[5].cases
    // this.penangCases=this.states[6].cases
    // this.perakCases=this.states[7].cases
    // this.perlisCases=this.states[8].cases
    // this.selangorCases=this.states[9].cases
    // this.terengganuCases=this.states[10].cases
    // this.sabahCases=this.states[11].cases
    // this.sarawakCases=this.states[12].cases
    // this.wpKualaLumpurCases=this.states[13].cases
    // this.wpLabuanCases=this.states[14].cases
    // this.wpPutrajayaCases=this.states[15].cases
    console.log(this.featuredTotal)
    this.stateLoading=false
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
        console.log("resolved")
        this.dataLoading=false;
      }, 5000);
    })
  })
}

async selectState(state:any){
  this.stateLoading=true
  console.log(state)
  this.selectedState=state
  this.featuredState=this.capitalizeFirstLetter(state)
  // this.selectOptionState=true
  // await this.getCovidStatsByState(state)
  // console.log(this.featuredTotal)
}
capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
selectStartDate(date:any){
  console.log(date)
  this.startDate=0;
  this.startDate=date.slice(0,10);;
  console.log("startDate", this.startDate)
  this.featuredStartDate=moment(this.startDate).format('MMMM Do YYYY')
}

selectEndDate(date:any){
  console.log(date)
  // console.log(dateValue)
  this.endDate=0;
  this.endDate=date.slice(0,10);
  console.log("endDate", this.endDate)
  this.featuredEndDate=moment(this.endDate).format('MMMM Do YYYY')
}

async pressSearchButton(){
  // if (!this.selectedState ){
  //   if (this.startDate == 0 || this.endDate == 0){
  //     if (this.startDate && this.endDate == 0){
  //       await this.presentSelectEndDateToast()
  //     }
  //     else if (this.startDate == 0 && this.endDate){
  //       await this.presentSelectEndDateToast()
  //     }
  //     else {
  //       this.startDate='2020-01-25';
  //       this.endDate='2021-12-15';
  //       this.featuredStartDate=moment(this.startDate).format('MMMM Do YYYY')
  //       this.featuredEndDate=moment(this.endDate).format('MMMM Do YYYY')
  //       this.
  //     }
  //   }
  //   // await this.presentStateToast()
  // }
  // if (this.startDate == 0 || this.endDate == 0){
  //   await this.presentDateToast()
  //   if (!this.selectedState){
  //     await this.presentStateToast()
  //   }
  //   else if (this.startDate && this.endDate == 0){
  //     await this.presentSelectEndDateToast()
  //   }
  //   else if (this.startDate == 0 && this.endDate){
  //     await this.presentSelectEndDateToast()
  //   }
  //   else {
  //     this.startDate='2020-01-25';
  //     this.endDate='2021-12-15';
  //     this.featuredStartDate=moment(this.startDate).format('MMMM Do YYYY')
  //     this.featuredEndDate=moment(this.endDate).format('MMMM Do YYYY')
  //   }
  // }
  if (this.startDate>this.endDate){
    await this.presentEndDateToast()
  }
  else if (this.startDate && this.endDate) {
    if (!this.selectedState){
      this.selectedState=''
    }
    await this.readJson();
    console.log("this.states", this.states)
    console.log("state", this.selectState)
    console.log("endDate", this.startDate)
    console.log("endDate", this.endDate)
    await this.getCovidStatsByDatesAndState(this.startDate, this.endDate, this.selectedState)
    this.selectOptionState=true
    console.log(this.featuredTotal)
  }
  else if (this.startDate==0 && this.endDate==0 && !this.selectedState){
    this.selectedState=''
    this.featuredState='Malaysia'
    this.startDate='2020-01-25';
    this.endDate='2021-12-15';
    this.featuredStartDate=moment(this.startDate).format('MMMM Do YYYY')
    this.featuredEndDate=moment(this.endDate).format('MMMM Do YYYY')
    this.selectOptionState=true
    this.dataLoading=true;
    await this.readJson();
    console.log("this.states", this.states)
    await this.getCovidStatsByDatesAndState(this.startDate, this.endDate, this.selectedState)
  }
}

//ALERT FUNCTIONS
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

// TOAST FUNCTIONS
  async presentStateToast() {
    const toast = await this.toastController.create({
      message: 'Please select one state',
      duration: 2000
    });
    toast.present();
  }
  async presentDateToast() {
    const toast = await this.toastController.create({
      message: 'Check selected dates',
      duration: 2000
    });
    toast.present();
  }
  async presentEndDateToast() {
    const toast = await this.toastController.create({
      message: 'End date cannot be before start date',
      duration: 2000
    });
    toast.present();
  }
  async presentSelectstartDateToast() {
    const toast = await this.toastController.create({
      message: 'Please select start dates',
      duration: 2000
    });
    toast.present();
  }
  async presentSelectEndDateToast() {
    const toast = await this.toastController.create({
      message: 'Please select end dates',
      duration: 2000
    });
    toast.present();
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

  sortByCases(){
    if(this.sortedByCases==true){
      this.sortedByCases=false
      this.sortedListOfStates=this.states.sort((a, b) => {
        return a.cases - b.cases;
    });
    console.log("this.sorted", this.sortedListOfStates)
    console.log("this.states", this.states)
    }
    else if (this.sortedByCases==false){
      this.sortedByCases=true
      this.sortedListOfStates=this.states.sort((a, b) => {
          return b.cases - a.cases;
      });
    
    }
      
  }
}
