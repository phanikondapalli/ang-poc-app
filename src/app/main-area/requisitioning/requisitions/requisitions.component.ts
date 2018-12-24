import { Component, OnInit } from '@angular/core';
import { OrderGuidesService } from '../order-guides.service';
import { Requisition } from '../requisition.model';
import { Subscription } from 'rxjs';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { RequisitionsService } from '../requisitions.service';

@Component({
  selector: 'app-requisitions',
  templateUrl: './requisitions.component.html',
  styleUrls: ['./requisitions.component.css'],
  providers: [RequisitionsService,ConfirmationService]
})
export class RequisitionsComponent implements OnInit {
  cols: any[];
  requisitions: Requisition[];
  subscription: Subscription;
  totalRequisitionsCount: number;
  paginationCount: number = 15;
  loading: boolean;
  displayEditDialog:boolean = false;
  requisitionBeingEdited:number;
  constructor(private _requisitionsService: RequisitionsService, private confirmationService:ConfirmationService) { }

  ngOnInit() {  
    this.cols = [
      { field: 'requisitionNo', header: 'Requisition No' },
      { field: 'reqDescription', header: 'Description' },
      { field: 'totalLines', header: 'Total Lines' },
      { field: 'punchoutOrderYN', header: 'Punchout' }
    ];
    //this.subscription = this._orderGuidesService.getOrderGuides().subscribe();
    this.loading = true;
    console.log('Requisitions component initiated.');

  }

  //Unused Fuction call
  getOrderGuides(page: number) {

    this._requisitionsService.getRequisitions(page)
      .subscribe(_requisitions => this.requisitions = _requisitions);
      setTimeout(
        () => { this.loading = false; });
  }

  //editOrderGuideDialog(index:number){
    editRequisitionDialog(){
    this.displayEditDialog = true;
    //this.requisitionBeingEdited = index;    
  }

  lazyLoadRequisitions(event: LazyLoadEvent) {
    console.log(event);    
    this.loading = true;
    if (Object.keys(event.filters).length === 0) {
      let page: number = (event.first / this.paginationCount) + 1;
      this._requisitionsService.getRequisitions(page)
        .subscribe(_orderGuides => {
          this.requisitions = _orderGuides;
          if(event.sortField!=null){
            this.sortOrderGuides(event.sortOrder);
          }
          this.loading = false;});
    }    
  }

  sortOrderGuides(sortOrder:number){    
    this.requisitions.sort(function (a, b) {

      if (+a.id < +b.id) {
        return -1;
      }
      if (+a.id > +b.id) {
        return 1;
      }          
      return 0;
    });

    if(sortOrder==-1){
      this.requisitions.reverse();
    }
    
  }

  confirm(requisitionNo:String) {
    this.confirmationService.confirm({
        message: 'Are you sure you want delete requisition '+requisitionNo+ '?',
        accept: () => {
            console.log('delete requisition:'+requisitionNo);
        }
    });
    
  }
}
