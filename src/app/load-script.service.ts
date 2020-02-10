import { Injectable } from '@angular/core';

const myScripts = [
  { name: 'googleMaps', src: 'https://www.gstatic.com/charts/loader.js' }
];

@Injectable({
  providedIn: 'root'
})
export class LoadScriptService {

  private scripts: any = {};
  loaded = false;

  constructor() {
    myScripts.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
    this.loadScript('googleMaps').then(() => { console.log("I am loaded in the service"); this.loaded = true; }); 
    //setTimeout(function () { this.loaded = true; }, 100);
  //console.log("I am loaded in the service"); this.loaded = true; 
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
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' });
          };
        
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        // finally append the script tag in the DOM
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

}
