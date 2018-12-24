import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderGuideItem } from '../../order-guide-item';
import { Message, LazyLoadEvent } from 'primeng/components/common/api';
import { OrderGuidesService } from '../../order-guides.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-available-items',
  templateUrl: './available-items.component.html',
  styleUrls: ['./available-items.component.css'],
  providers:[OrderGuidesService,MessageService]
})
export class AvailableItemsComponent implements OnInit {

  availableItems:OrderGuideItem[];
  availableItemsCols:any[];
  filteredOGs: OrderGuideItem[];
  enableAddBtn:string='d-none';
  itemsToAdd:Map<string,string>= new Map();  
  msgs: Message[] = [];
  loading: boolean;
  itemPaginationCount:number = 5;
  totalAvailableItemsCount:number;
  _orderGuideId:string;
  //pageRange: number[] = new Array<number>(2);

  //@Input('orderGuideId') orderGuideId:string; 
  @Input() 
  set orderGuideId(ogId:string){
    this._orderGuideId = ogId;    
    console.log('working with OG:'+this._orderGuideId);    
  }

  @Output('refresh')refreshItems = new EventEmitter<boolean>();
  constructor(private _orderGuidesService: OrderGuidesService) { }

  ngOnInit() {

    this.loading = true;
    this.getAvailableItems();
    this.availableItemsCols=[
      { field: 'itemNo', header: 'Item No' },
      { field: 'itemDesc', header: 'Item Description' },
      { field: 'itemTypeDesc', header: 'Item Type' },
      { field: 'unitOfMeasure', header: 'UOM' },
      { field: 'onHandQty', header: 'On Hand Qty' },
      { field: 'estUnitCost', header: 'Unit Price' },
      { field: 'mfrName', header: 'Manufacturer' },
      { field: 'latexFreeYN', header: 'Latex Free' }
    ];
    
  }

  filterRecs(event){
    this.filteredOGs = event.filteredValue;
  }

  AddItemsToOrderGuide(){
    for(let item of Array.from(this.itemsToAdd.entries())){
    this._orderGuidesService.addSelectedItemsToOrderGuide(this._orderGuideId,item[1]).subscribe(
      status => {
        if(status === '0'){
          this.msgs.push({severity:'success', summary:'Success', detail:'Item: '+JSON.parse(item[1]).itemNo+' successfully added to order guide: '+this._orderGuideId});          
        }
        else{
          this.msgs.push({severity:'error', summary:'Error', detail:status});          
        }
        //setTimeout(1500);
      }
    );
  }
  this.clearSelectedItems();
  this.refreshItems.emit(true);     
}

//Function call to get available lines to add to the orderGuide
//getAvailableItems(event:LazyLoadEvent){
  getAvailableItems(){  
  this.loading = true;
  //let page: number = (event.first/this.itemPaginationCount) + 1;
  //console.log('page number is '+page);
  this._orderGuidesService.getAvailableItemsForOrderGuide()
    .subscribe(_items => {
      this.availableItems = _items;     
      this.filteredOGs = this.availableItems;     
      this.loading = false;
      this.totalAvailableItemsCount = this.availableItems[0].recordCount;
      //this.pageRange[0]=event.first+1;
      //this.pageRange[1]=(this.availableItems.length<this.itemPaginationCount)?event.first+this.availableItems.length:event.first+this.itemPaginationCount;          
    }
    );
}

selectItemForAdd(event:any){
    //console.log(event.target.dataset);
    if(event.target.checked){
    this.itemsToAdd.set(event.target.id,event.target.dataset.item);        
    }
    else{
      //let pos:number = this.itemsToAdd.has(event.target.id);
      if(this.itemsToAdd.has(event.target.id))
      this.itemsToAdd.delete(event.target.id);
    }
    this.itemsToAdd.size>0?this.enableAddBtn = '':this.enableAddBtn = 'd-none';      
}

clearSelectedItems(){
  this.itemsToAdd.clear();
  this.enableAddBtn = 'd-none';
}

}
