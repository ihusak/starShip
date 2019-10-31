import { Injectable } from '@angular/core';
import { ShipInterface } from '../ship/interface/ship.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BusketService {
  public store: ShipInterface[] = [];
  public items: BehaviorSubject<ShipInterface[]> = new BehaviorSubject(null);
  /**
   * Add item to busket
   * @param item
   */
  public addItem(item: ShipInterface) {
    // add to store (detect if user already push item to busket)
    if (localStorage.getItem('busket')) {
      this.store = JSON.parse(localStorage.getItem('busket'));
    } else {
      this.store = [];
    }
    this.store.push(item);
    localStorage.setItem('busket', JSON.stringify(this.store));
    this.items.next(this.store);
  }
  /**
   * Get initial busket when load page
   */
  getListOfBusket() {
    // detect if user previously added ships to busket
    if (localStorage.getItem('busket')) {
      this.store = JSON.parse(localStorage.getItem('busket'));
      this.items.next(this.store);
    }
  }
}