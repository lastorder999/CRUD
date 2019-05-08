import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Item } from '../models/item';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemList: AngularFireList<any>;
  selectedItem: Item = new Item();

  constructor(private firebase: AngularFireDatabase) {
    // this.itemList = firebase.list('/upload', ref => ref.orderByChild('timestamp')).snapshotChanges().map(result => {
    //   return result.reverse();
    // })
   }

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

  // task: AngularFireUploadTask;
  // percentage: Observable<number>;
  // snapshot: Observable<any>;
  // downloadURL: Observable<string>;

  // startUpload(event: FileList) {
  //   const file = event.item(0);
  //   if(file.type.split('/')[0] !== 'image'){
  //     console.error('unsupported file type :(')
  //     return;
  //   }
  //   const path = `upload/${new Date().getTime()}_${file.name}`;
  //   this.task = this.storage.upload(path, file);
  //   this.percentage = this.task.percentageChanges();
  //   this.snapshot = this.task.snapshotChanges();

  //   this.snapshot.pipe(finalize(() => this.downloadURL = this.storage.ref(path).getDownloadURL())).subscribe();
  //   console.log(`${this.downloadURL}`);
  // }
}
