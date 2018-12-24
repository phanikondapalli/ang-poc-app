import { Component, OnInit } from '@angular/core';
import { RequisitionLine } from '../../requisition-line.model';
import { Subscription } from 'rxjs';
import { RequisitionsService } from '../../requisitions.service';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/components/common/api';

@Component({
  selector: 'app-requisitionlines',
  templateUrl: './requisitionlines.component.html',
  styleUrls: ['./requisitionlines.component.css'],
  providers: [RequisitionsService]
})
export class RequisitionlinesComponent implements OnInit {

  cols: any[];
  requisitionNo:String;
  requisitionLines: RequisitionLine[] = new Array();
  subscription: Subscription;
  totalRequisitionLinesCount: number;
  paginationCount: number = 10;
  loading: boolean;
  enableAddBtn:boolean=false;
  itemsToAdd:String[]= new Array();

  constructor(private _requisitionsService: RequisitionsService, private route:ActivatedRoute) {

    this.route.params.subscribe(
      params => {
                this.requisitionNo = params['id'];
                }
    );
    
    this.route.queryParams.subscribe(
    queryParams => {      
      this.totalRequisitionLinesCount = queryParams['lines']?queryParams['lines']:0;
      }  
    );

   }

  ngOnInit() {
    this.cols = [
      { field: 'reqLineNo', header: 'Line No' },
      { field: 'itemPicURL', header: '' },
      { field: 'vendorItemNo', header: 'Vendor Item No' },
      { field: 'description', header: 'Item Description' },
      { field: 'issUOM', header: 'UOM' },
      { field: 'itemTypeDesc', header: 'Item Type' }
    ];
    //this.subscription = this._requisitionsService.getOrderGuides().subscribe();
    this.loading = true;
    console.log('Requisition lines component initiated.');

  }

  //Function call to fetch orderguide lines by page number
  lazyLoadRequisitionLines(event: LazyLoadEvent) {
    console.log(event);    
    this.loading = true;    
      let page: number = (event.first / this.paginationCount) + 1;
      this._requisitionsService.getRequisitionLines(page,this.requisitionNo)
        .subscribe(_requisitions => {
          this.requisitionLines = _requisitions;
          if(event.sortField!=null){
            this.sortRequisitionLines(event.sortOrder);
          }
          this.loading = false;});
        
  }

  sortRequisitionLines(sortOrder:number){    
    this.requisitionLines.sort(function (a, b) {

      if (+a.id < +b.id) {
        return -1;
      }
      if (+a.id > +b.id) {
        return 1;
      }          
      return 0;
    });

    if(sortOrder==-1){
      this.requisitionLines.reverse();
    }
    
  }

  selectItemForAdd(event:any){
    //console.log(event)
    if(event.target.checked){
    this.itemsToAdd.push(event.target.id);
    }
    else{
      let pos:number = this.itemsToAdd.indexOf(event.target.id);
      if(pos!= -1)
      this.itemsToAdd.splice(pos,1);
    }
    this.itemsToAdd.length>0?this.enableAddBtn = true:this.enableAddBtn = false;
    console.log('btn enabled '+this.enableAddBtn)        
}
  
}
