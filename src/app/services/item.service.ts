import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Item } from '../models/item';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemList: AngularFireList<any>;
  selectedItem: Item = new Item();
  constructor(public firebase: AngularFireDatabase) { }

  getItem() {
    return this.itemList = this.firebase.list('item');
  }

  insertItem(item: Item) {
    this.itemList.push({
      name: item.name,
      category: item.category,
      location: item.location,
      price: item.price
    });
  }

  updateItem(item: Item) {
    this.itemList.update(item.$key, {
      name: item.name,
      category: item.category,
      location: item.location,
      price: item.price
    });
  }


  deleteItem($key: string) {
    this.itemList.remove($key);
  }
}
