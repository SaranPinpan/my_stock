import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../models/product.model';
import { NetworkService } from '../services/network.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar'

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['productId', 'name', 'price', 'stock', 'action'];
  dataSource = new MatTableDataSource<Product>(); //new object

  isNoData = false

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private networkService: NetworkService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.feedNetwork();
  }

  feedNetwork() {
    this.networkService.getAllProducts().subscribe(
      result => {
        this.dataSource.data = result.map(product => {
          product.image = this.networkService.getImageNetwork(product.image);
          return product
        });

        // this.dataSource.data = result
      },
      error => {
        // alert('Network Failure');
        this.isNoData = true
        this.snackBar.open('Somthing went wrong!', 'Close', { duration: 1000, verticalPosition: 'top' })

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

  onClickEdit(productId: number) {
    this.router.navigate([`stock/form/${productId}`])
  }

  onClickDelete(productId: number) {
    // this.deleteProduct(productId);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct(productId);
      }
    })
  }

  deleteProduct(productId: number) {
    this.networkService.deleteProducts(productId).subscribe(
      result => {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.feedNetwork();
      },
      error => {
        alert('Delete Failed');
      }
    );
  }
}