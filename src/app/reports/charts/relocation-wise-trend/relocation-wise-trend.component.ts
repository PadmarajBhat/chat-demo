import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from '../data-loader.service';

@Component({
  selector: 'app-relocation-wise-trend',
  templateUrl: './relocation-wise-trend.component.html',
  styleUrls: ['./relocation-wise-trend.component.css']
})
export class RelocationWiseTrendComponent implements OnInit {

  constructor(private dl: DataLoaderService) { }

  ngOnInit() {
  }

}
