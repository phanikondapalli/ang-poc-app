import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { OrderGuidesService } from '../order-guides.service'
import { OrderGuide } from '../order-guide.model'
import { Subscription } from 'rxjs/Subscription';
import { LazyLoadEvent, ConfirmationService, MenuItem, Message } from '../../../../../node_modules/primeng/components/common/api'
import { OrderGuideLine } from '../order-guide-line.model';
import { AvailableItemsComponent } from './available-items/available-items.component';
import { OrderGuideDetailsComponent } from './order-guide-details/order-guide-details.component';

//import { ORDERGUIDES } from '../mock-order-guides'

@Component({
  selector: 'app-orderguides',
  templateUrl: './orderguides.component.html',
  styleUrls: ['./orderguides.component.css'],
  providers: [OrderGuidesService,ConfirmationService],  
  encapsulation: ViewEncapsulation.None
})
export class OrderguidesComponent implements OnInit {

  cols: any[];
  oglCols:any[];
  orderGuides: OrderGuide[];
  filteredOGs: OrderGuide[];
  newOrderGuide: OrderGuide = new OrderGuide();  
  newOGLines:OrderGuideLine[];
  newOGLinesCount:number;
  subscription: Subscription;
  totalOrderGuidesCount: number;
  paginationCount: number = 15;
  pageRange: number[] = new Array<number>(2);
  loading: boolean;
  items: MenuItem[];    
  activeIndex: number;
  resetOG:boolean = false;
  displayDialog:boolean = false;
  displayEditDialog:boolean = false;
  displayDetailsDialog:boolean = false;
  orderGuideBeingEdited:number;
  msgs: Message[] = [];
  ogAction:string = "create";
  @ViewChild(OrderGuideDetailsComponent)
  private detailComponent:OrderGuideDetailsComponent;

  constructor(private _orderGuidesService: OrderGuidesService, private confirmationService:ConfirmationService) {
  }

  ngOnInit() {    
    //this.getOrderGuides(1);
    this.cols = [
      { field: 'orderGuide', header: 'OrderGuide' },
      { field: 'org', header: 'Organization' },
      { field: 'dept', header: 'Department' },      
      { field: 'orderGuideDesc', header: 'Description' },
      { field: 'totalLines', header: 'Total Lines' },
      { field: 'allowBackordYN', header: 'Allow Backorder' }
    ];
    //this.subscription = this._orderGuidesService.getOrderGuides().subscribe();
    this.loading = true;
    this.activeIndex = 0;
    this.getOrderGuides();
    this.items = [{
      label: 'Create Header',
      command: (event: any) => {
          this.activeIndex = 0;
      }      
  },
  {
      label: 'AddLines',
      command: (event: any) => {
        console.log(event);
          this.activeIndex = 1;
      }
  },
  {
      label: 'Submit',
      command: (event: any) => {
        console.log(event);
          this.activeIndex = 2;
      }
  }
];    
  }

  getOrderGuides() {
    this.loading = true;
    this._orderGuidesService.getOrderGuides()
      .subscribe(_orderGuides => {
        this.orderGuides = _orderGuides;        
        this.filteredOGs = this.orderGuides;
        this.totalOrderGuidesCount = this.orderGuides.length;
        this.loading = false;
      });      
  }

  createOrderGuidesDialog(){
    this.displayDialog = true;
  }

  getOrderGuideLines() {    
    this.loading = true;
    this.oglCols = [
      { field: 'itemNo', header: 'Item No' },
      { field: 'itemPicURL', header: '' },
      { field: 'mfrItemNo', header: 'Mfr Item No' },
      { field: 'vendorItemNo', header: 'Vendor Item No' },
      { field: 'itemDesc', header: 'Item Description' },
      { field: 'uomdesc', header: 'UOM' },
      { field: 'parLevelQty', header: 'Par Qty' },      
      { field: 'estUnitCost', header: 'Unit Price' }
    ];

    this._orderGuidesService.getAllOrderGuideLines(this.newOrderGuide.orderGuide)
      .subscribe(_orderGuideLines => {         
        this.newOGLines = _orderGuideLines;
        this.newOGLinesCount = (this.newOGLines.length>0)?this.newOGLines[0].recordCount:0;
      });
      this.loading = false;
  }

  hideDialog(){
    this.displayDialog = false;
  }

  editOrderGuideDialog(index:number){
    this.displayEditDialog = true;
    this.orderGuideBeingEdited = index;    
  }

  showLinesAndDetails(index:number){
    this.displayDetailsDialog = true;
    this.orderGuideBeingEdited = index;    
  }

  filterRecs(event){
    this.filteredOGs = event.filteredValue;
  }

  resetNewOG(event){    
    this.activeIndex = 0;
    this.resetOG = true;    
  }

  updateIndex(index:number){    
    this.activeIndex=index;   
    if(this.detailComponent) 
    this.newOrderGuide = this.detailComponent.ordGuide;
  }

  updateAction(newAction:string){

    this.ogAction = newAction;

  }  

  /*lazyLoadOrderGuides(event: LazyLoadEvent) {    
    this.loading = true;
    console.log(event);
    if (Object.keys(event.filters).length === 0) {
      let page: number = (event.first / this.paginationCount) + 1;      
      this._orderGuidesService.getOrderGuides()
        .subscribe(_orderGuides => {
          this.orderGuides = _orderGuides;
          this.totalOrderGuidesCount = this.orderGuides[0].recordCount;

          if(event.sortField!=null){
            this.sortOrderGuides(event.sortOrder,event.sortField);
          }
          this.loading = false;
          this.pageRange[0]=event.first+1;
          this.pageRange[1]=(this.paginationCount>this.orderGuides.length)?event.first+this.orderGuides.length:event.first+this.paginationCount;
        });
    }    
  }

  sortOrderGuides(sortOrder:number,sortField:String){      
    switch(sortField){
      case('id'):{
        console.log('id sort')
        this.orderGuides.sort(function (a, b) {
          if (a.orderGuide.toUpperCase < b.orderGuide.toUpperCase) {
            return -1;
          }
          if (a.orderGuide.toUpperCase > b.orderGuide.toUpperCase) {
            return 1;
          }          
          return 0;
        });
        break;
      }
      case('orderGuideDesc'):{
        console.log('desc sort')
        this.orderGuides.sort(function (a, b) {
          if (a.orderGuideDesc.toUpperCase < b.orderGuideDesc.toUpperCase) {
            return -1;
          }
          if (a.orderGuideDesc.toUpperCase > b.orderGuideDesc.toUpperCase) {
            return 1;
          }          
          return 0;
        });
        break;
      }
      case('totalLines'):{
        console.log('line sort')
        this.orderGuides.sort(function (a, b) {
          console.log(+a.totalLines+','+ +b.totalLines);
         return +a.totalLines - +b.totalLines
        });
        break;
      }
      case('allowBackordYN'):{
        this.orderGuides.sort(function (a, b) {
          return +a.allowBackordYN - +b.allowBackordYN
        });
        break;
      }
      default:{
        console.log('def sort')
        this.orderGuides.sort(function (a, b) {
          if (a.orderGuide.toUpperCase < b.orderGuide.toUpperCase) {
            return -1;
          }
          if (a.orderGuide.toUpperCase > b.orderGuide.toUpperCase) {
            return 1;
          }          
          return 0;
        });
        break;
      }
    }

    if(sortOrder==-1){
      this.orderGuides.reverse();
    }
    
  }
  */

  confirm(orderGuideNo:string,orderGuideRowId:string) {
    this.confirmationService.confirm({
        message: 'Are you sure you want delete order guide '+orderGuideNo+ '?',
        accept: () => {
          this._orderGuidesService.deleteOrderGuide(orderGuideRowId).subscribe(
            status => {
              if(status=='0'){
                this.msgs.push({severity:'success', summary:'Success', detail:'OrderGuide '+orderGuideNo+' deleted successfully '});                
                this.getOrderGuides();
              }
              else{
                this.msgs.push({severity:'error', summary:'Error', detail:status});
              }
            }
          );
        }
    });
}
    
  }
