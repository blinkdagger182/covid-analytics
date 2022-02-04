import { Injectable } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharePointService {

  constructor(public http: HttpClient) { }
  HTTP_API_ENDPOINT: string = 'https://4992-202-188-48-242.ngrok.io';


//   dataByCity(city:any){
//     let url:string = '';
//     url = this.HTTP_API_ENDPOINT + 'by/city' 
//     this.films = this.httpClient.get('https://swapi.co/api/films');

//     // let parameter:any = {};
//     // parameter.id = city;
//     // console.log('url: ' + url);

//     //   let header = new Headers();
//     //   header.append('Content-Type', 'application/json');
//     //   return this.http.post(url, JSON.stringify(parameter) ,{headers: header})
//     //     .map(res => res.json()).catch(error => Observable.throw(error)).timeout(30000);
//     this.url.subscribe(data => {
//       console.log('my data: ', data);
//   }
// }

dataByState(state:any){
  return this.http.get( this.HTTP_API_ENDPOINT + '/api/by/state?name='+ state)
}

dataByDates(startDate:any, endDate:any){
  return this.http.get( this.HTTP_API_ENDPOINT + '/api/by//api/by/date?startDate='+ startDate + '&endDate=' + endDate +'&inclusive=true%2Cfalse?name=')
}

dataByDatesAndState(startDate:any, endDate:any, state:any){
  return this.http.get( this.HTTP_API_ENDPOINT + '/api/by//api/by/date?startDate='+ startDate + '&endDate=' + endDate + '&state='+ state +'&inclusive=true%2Cfalse?name=')
}

dateGlobal(){
  return this.http.get('http://localhost:3030/api/by/state?name=')
}


newsCovidMalaysia(){
  return this.http.get('https://newsapi.org/v2/top-headlines?country=my&category=health&apiKey=b0c59eca41564e54a2e0151f6f04cd5c')
}
}


