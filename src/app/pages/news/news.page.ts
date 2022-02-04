import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, ActivationStart } from '@angular/router';
import { NavController} from '@ionic/angular';
import { Location } from '@angular/common'

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  constructor(private router: Router, public navCtrl: NavController, private location: Location) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back()
  }
}
