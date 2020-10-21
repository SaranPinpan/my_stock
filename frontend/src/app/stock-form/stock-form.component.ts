import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { NetworkService } from '../services/network.service';
import { Location } from '@angular/common' //added manually

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
  editMode = false;
  imageSrc: string | ArrayBuffer;
  file: File;

  @ViewChild("productForm") productForm: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private networkService: NetworkService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id) { //check edit or create
          this.editMode = true;
          this.feedNetwork(params.id);
        }
      }
    );
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   let value = {
    //     name:"Saran",
    //     age: 26
    //   }
    //   this.productForm.setValue(value);
    // });
  }

  feedNetwork(id: any) {
    this.networkService.getProductById(id).subscribe(
      result => {
        let { productId, name, image, price, stock } = { ...result };
        this.imageSrc = this.networkService.getImageNetwork(image);
        this.productForm.setValue({ productId, name, price, stock });
      },
      error => {
        alert('Network Failure');
      }
    );
  }

  async onSubmitForm(productForm: NgForm) {
    if (productForm.invalid) {
      return;
    }

    let product: Product = {
      ...productForm.value,  //spread value from ngForm
      image: this.file
    }

    if (this.editMode) {
      //edit
      this.networkService.editProduct(product).subscribe(
        result => {
          //todo
          this.location.back();
          alert('Edit Successfully');
        },
        error => {
          alert('Network Failure');
        }
      );
    } else {
      //create
      this.networkService.addProduct(product).subscribe(
        result => {
          //todo
          this.location.back();
          alert('Add Successfully');
        },
        error => {
          alert('Network Failure');
        }
      );
    }
  }

  onUploadImage(event) {
    const metaImage = event.target.files[0];
    if (metaImage) {
      this.file = metaImage; //this.file uses for upload image to the server
      const reader = new FileReader(); //preview image
      reader.readAsDataURL(metaImage);
      reader.onload = () => {
        this.imageSrc = reader.result;
      }
    }
  }

  onClickBack() {
    this.location.back();
  }

}
