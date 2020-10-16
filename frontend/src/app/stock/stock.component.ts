import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../models/product.model';
import { NetworkService } from '../services/network.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['productId', 'name', 'price', 'stock', 'action'];
  dataSource = new MatTableDataSource<Product>(); //new object

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private networkService: NetworkService) {

  }

  ngOnInit(): void {
    this.feedNetwork();
  }

  feedNetwork() {
    this.networkService.getAllProducts().subscribe(
      result => {
        this.dataSource.data = result;
      },
      error => {
        alert('Network Failure');
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}