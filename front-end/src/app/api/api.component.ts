import { Component, OnInit } from '@angular/core';
import {Data,ApiService} from './api.service'

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss'],
  providers:[ApiService]
})
export class ApiComponent implements OnInit {
  data:Data[];
  error:any;
  editData: Data;

  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    this.showData();
  }

  // get
  showData():void {
    this.apiService.getData()
      .subscribe(
        data => (this.data = data), // success path
        error => this.error = error // error path
      );
  }

  // post
  // createnew(name: string): void {
  //   this.editData = undefined;
  //   name = name.trim();
  //   if (!name) {
  //     return;
  //   }
  //   const newData: Data = { name } as Data;
  //   this.apiService
  //     .addData(newData)
  //     .subscribe(data => this.data.push(data));
  // }

  // delete
  delete(data:Data): void {
    this.data = this.data.filter(h => h !== data);
    this.apiService
      .deleteData(data.id)
      .subscribe();
  }

  // enter update status
  edit(data: Data) {
    this.editData = data;
  }

  // put
  update() {
    if (this.editData) {
      this.apiService
        .updateData(this.editData)
        .subscribe(datas => {
        const ix = datas ? this.data.findIndex(h => h.id === datas.id) : -1;
        if (ix > -1) {
          this.data[ix] = datas;
        }
      });
      this.editData = undefined;
    }
  }

}
