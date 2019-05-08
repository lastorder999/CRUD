import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  itemList: Item[];
  constructor(public itemService: ItemService) { }

  ngOnInit() {
    return this.itemService.getItem().snapshotChanges().subscribe(item => {
      this.itemList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.itemList.push(x as Item);
      });
    });
  }

  onEdit(item: Item) {
    this.itemService.selectedItem = Object.assign({}, item);
  }

  onDelete($key: string) {
    this.itemService.deleteItem($key);
  }

}
