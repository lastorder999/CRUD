import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(public itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItem();
    this.resetForm();
  }

  onSubmit(itemForm: NgForm) {
    if (itemForm.value.$key == null) {
      this.itemService.insertItem(itemForm.value);
    } else {
      this.itemService.updateItem(itemForm.value);
    }
    this.resetForm();
  }

  resetForm(itemForm?: NgForm) {
    if (itemForm != null) {
      itemForm.reset();
      this.itemService.selectedItem = new Item();
    }
  }

}
