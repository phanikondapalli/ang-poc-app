import { Component, OnInit, Input } from '@angular/core';
import { OrderGuidesService } from '../../order-guides.service'
import { OrderGuideLine } from '../../order-guide-line.model';
import { Subscription } from 'rxjs';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';
import { ActivatedRoute } from '@angular/router';
import { OrderGuideItem } from '../../order-guide-item';
import { OrderGuide } from '../../order-guide.model';

@Component({
  selector: 'app-orderguidelines',
  templateUrl: './orderguidelines.component.html',
  styleUrls: ['./orderguidelines.component.css'],
  providers: [OrderGuidesService,ConfirmationService,MessageService]
})
export class OrderguidelinesComponent implements OnInit {

  cols: any[];
  uoms: any[];
  orderGuideId:String;
  @Input('orderGuide') currentOrderGuide:OrderGuide = new OrderGuide();
  orderGuideLines: OrderGuideLine[] = new Array();  
  subscription: Subscription;
  totalOrderGuideLinesCount: number;
  paginationCount: number = 5;    
  loading: boolean;
  detailsTabSelected:boolean;
  displayEditLineDialog:boolean;
  orderLineBeingEdited:number;
  msgs: Message[] = [];
  
  constructor(private _orderGuidesService: OrderGuidesService, private route:ActivatedRoute, private confirmationService:ConfirmationService) { 
    this.route.params.subscribe(
      params => {
                //this.orderGuideId = params['id'];                
                }
    );
    
    /*this.route.queryParams.subscribe(
    queryParams => {      
      this.totalOrderGuideLinesCount = queryParams['lines']?queryParams['lines']:0;
      this.detailsTabSelected = queryParams['tab']?queryParams['tab']:false;
      }  
    );*/
  }

  ngOnInit() {    
    this.cols = [
      { field: 'itemNo', header: 'Item No' },
      { field: 'itemPicURL', header: '' },
      { field: 'mfrItemNo', header: 'Mfr Item No' },
      { field: 'vendorItemNo', header: 'Vendor Item No' },
      { field: 'itemDesc', header: 'Item Description' },
      { field: 'uomdesc', header: 'UOM' },
      { field: 'parLevelQty', header: 'Par Qty' },      
      { field: 'estUnitCost', header: 'Unit Price' }
    ];
    this.uoms=[
        {label: 'EA', value: 'EA'},
        {label: 'PK', value: 'PK'},
        {label: 'BX', value: 'BX'},
        {label: 'CS', value: 'CS'}
    ];
    //this.subscription = this._orderGuidesService.getOrderGuides().subscribe();
    this.loading = true;    
    console.log('order guide lines component initiated.');    
  }

  getOrderGuideLines(page: number, orderGuideId:String) {    
    this._orderGuidesService.getOrderGuideLines(page,orderGuideId)
      .subscribe(_orderGuideLines => {         
        this.orderGuideLines = _orderGuideLines;
        this.totalOrderGuideLinesCount = (this.orderGuideLines.length>0)?this.orderGuideLines[0].recordCount:0;
      });
      this.loading = false;
  }

  lazyLoadOrderGuideLines(event: LazyLoadEvent) {          
    this.loading = true;    
      let page: number = (event.first / this.paginationCount) + 1;      
      this._orderGuidesService.getOrderGuideLines(page,this.currentOrderGuide.orderGuide)
        .subscribe(_orderGuides => {
          this.orderGuideLines = _orderGuides;             
          this.totalOrderGuideLinesCount = (this.orderGuideLines.length>0)?this.orderGuideLines[0].recordCount:0;     
          if(event.sortField!=null){
            this.sortOrderGuideLines(event.sortOrder);
          }
          this.loading = false;
        });
          
  }

  sortOrderGuideLines(sortOrder:number){    
    this.orderGuideLines.sort(function (a, b) {

      if (+a.id < +b.id) {
        return -1;
      }
      if (+a.id > +b.id) {
        return 1;
      }          
      return 0;
    });

    if(sortOrder==-1){
      this.orderGuideLines.reverse();
    }
    
  }

  showEditLineDialog(index:number){
    this.displayEditLineDialog = true;
    this.orderLineBeingEdited = index;
  }
  //Adding lines to order guide is done. Close dialog and refresh lines.
  refresh(refreshLines:boolean){
    if(refreshLines){
    this.loading = true;
    setTimeout(() => this.getOrderGuideLines(1,this.currentOrderGuide.orderGuide), 1000);    
    }
  }

  //Delete Order guide line.
 confirm(orderGuideLineItemNo:string,orderGuideLineRowId:string) {
    this.confirmationService.confirm({
        message: 'Are you sure you want delete line '+orderGuideLineItemNo+ '?',
        accept: () => {
            
          this._orderGuidesService.deleteOrderGuideLine(orderGuideLineRowId).subscribe(
            status => {
              if(status=='0'){
                this.msgs.push({severity:'success', summary:'Success', detail:'OrderGuide line '+orderGuideLineItemNo+' deleted successfully '});                
                this.getOrderGuideLines(1,this.currentOrderGuide.orderGuide);
              }
              else{
                this.msgs.push({severity:'error', summary:'Error', detail:status});
              }
            }
          );
        }
    });
}

//Update Order guide line
editLine(event:any){  
  let orderGuideLine:OrderGuideLine = event.data;         
        let id:string=event.data.id;
        let bkpUOM:string = event.data.UOM;
        let bkpParQty:string = event.data.parLevelQty;
        this._orderGuidesService.editOrderGuideLine(orderGuideLine).subscribe(
          status => {
            //event.data.id = id;            
            this.refresh(true);
            if(status=='0'){
              this.msgs.push({severity:'success', summary:'Success', detail:'OrderGuide line '+orderGuideLine.id+' updated successfully '});                
              this.displayEditLineDialog = false;
              //this.getOrderGuideLines(1,this.orderGuideId);              
            }
            else{
              event.data.UOM=bkpUOM;
              event.data.parLevelQty = bkpParQty;
              this.msgs.push({severity:'error', summary:'Error', detail:status});
            }
          }
        );
}

}
