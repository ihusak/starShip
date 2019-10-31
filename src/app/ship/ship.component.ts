import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ShipService } from './ship.service';
import { ShipInterface } from './interface/ship.interface';
import { BehaviorSubject } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { BusketService } from '../busket/busket.service';

const TABLE_HEDERS: string[] = ['name', 'Manufacturer', 'crew', 'class'];

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
  encapsulation: ViewEncapsulation.None
})
/**
 * Main component of Ship magazine
 */
export class ShipComponent implements OnInit, OnDestroy {
  public ships: MatTableDataSource<ShipInterface> = new MatTableDataSource<ShipInterface>();
  public heders: string[] = TABLE_HEDERS;
  private page: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public initialPage: number = 0;
  public fullCount: number;
  public toggleSearchInput: boolean = false;
  constructor(
    private shipService: ShipService,
    private basketService: BusketService
    ) {}

  ngOnInit() {
    // subscriptions
    this.page.pipe(
      flatMap((page) => {
        return this.shipService.getListOfStartShips(page);
      })
    ).subscribe(data => {
      this.ships.data = data;
      this.fullCount = this.shipService.count;
    });
  }
  /**
   * Pagination function
   * @param event
   */
  public switchPages(event): void {
    this.page.next(event.pageIndex + 1);
  }
  /**
   * Filter for searching by Name
   * @param filterValue
   */
  public filterModel(filterValue: string): void {
    this.ships.filter = filterValue.trim().toLowerCase();
  }
  /**
   * Close searching by Name to default view
   */
  public closeFilter(): void {
    this.toggleSearchInput = !this.toggleSearchInput;
    this.ships.filter = '';
  }
  /**
   * Add Selected ship to busket
   * @param item
   */
  public addToBusket(item: ShipInterface): void {
    this.basketService.addItem(item);
  }
  // unsubscribe
  ngOnDestroy() {
    this.page.unsubscribe();
  }
}
