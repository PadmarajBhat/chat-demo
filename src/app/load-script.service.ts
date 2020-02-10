import { Injectable } from '@angular/core';
import { error } from 'util';
export declare var google: any;
const myScripts = [
  { name: 'googleCharts', src: 'https://www.gstatic.com/charts/loader.js' }
];

@Injectable({
  providedIn: 'root'
})
export class LoadScriptService {

  private scripts: any = {};
  isScriptLoaded = false;
  google: any;

  constructor() {
    myScripts.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
    //this.loadScript('googleCharts').then(() => {
    //  console.log("Google Chart Script got attached to body !!!");
    //  try {
    //    google.charts.load('current', { 'packages': ['corechart'] }).then(() => {
    //      this.loaded = true;
    //      this.google = google;
    //      console.log("Google Chart packages loaded !!!");
    //    });
        
    //  } catch{
    //    console.log("could not load the google package !!!!");
    //  }
      
    //}); 
  }

  returnGoogleVar() {
    
    return this.google;
  }

  // load a single or multiple scripts
  load(...scripts: string[]) {
    const promises: any[] = [];
    // push the returned promise of each loadScript call 
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    // return promise.all that resolves when all promises are resolved
    return Promise.all(promises);
  }

  // load the script
  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      } else {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        // cross browser handling of onLoaded event
        
        script.onload = () => {

          console.log("Google Chart Script got attached to body !!!", google);
          this.scripts[name].loaded = true;
          try {
            google.charts.load('current', { 'packages': ['corechart'] }).then(() => {
              this.isScriptLoaded = true;
              console.log("Google Chart packages loaded !!!", google);
              resolve({ script: name, loaded: true, status: 'Loaded' });
            });
          } catch{
            reject();
          }
        }
       
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        // finally append the script tag in the DOM
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

}
