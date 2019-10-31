import { Component, OnInit } from '@angular/core';
import { BusketService } from './busket.service';
import { ShipInterface } from '../ship/interface/ship.interface';

@Component({
  selector: 'app-busket',
  templateUrl: './busket.component.html',
  styleUrls: ['./busket.component.scss']
})
/**
 * Busket component, that shows what user select to move item to busket
 */
export class BusketComponent implements OnInit {
  public busketItems: ShipInterface[] = [];
  constructor(private basketService: BusketService) {}

  ngOnInit() {
    this.basketService.getListOfBusket();
    this.basketService.items.subscribe(data => {
      this.busketItems = data;
    });
  }

}
