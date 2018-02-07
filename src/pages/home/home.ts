import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import suncalc from "suncalc";

declare var google: any;

// npm install suncalc -save
//google map key: AIzaSyCbhy4QBpCChV-NrzQPLe0jhKwDKE6wStI

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  sunCalc = suncalc;
  // 49.246474, 28.479261
  lat: number = 49.246474;
  long: number = 28.479261;
  sunSet: string;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public platform: Platform) {

  }

  ionViewDidLoad() {
    let sunSet = this.sunCalc.getTimes(new Date(), this.lat, this.long);
    let minutes = sunSet.sunset.getMinutes();

    if (minutes < 10){
      minutes = '0' + minutes;
    }

    this.sunSet = sunSet.sunset.getHours()+' : '+minutes;

    console.log(this.sunSet);
    //-------------------------------------------------------

    let myCity = { lat: this.lat, lng: this.long }
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 12,
      center: myCity,
      mapTypeId: 'roadmap'
    });
    this.map.setCenter(myCity);

    this.addMarker(myCity, this.map)
  }

  addMarker(position, map){
    return new google.maps.Marker({
      position,
      map
    })

  }

}
