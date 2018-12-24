import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderGuide } from '../../order-guide.model';
import { OrderGuidesService } from '../../order-guides.service';
import { Message } from 'primeng/components/common/api';

const editAction:string = "EDIT";
const createAction:string = "CREATE";

@Component({
  selector: 'app-order-guide-details',
  templateUrl: './order-guide-details.component.html',
  styleUrls: ['./order-guide-details.component.css'],
  providers:[OrderGuidesService]
})
export class OrderGuideDetailsComponent implements OnInit {

  @Input('orderGuide') ordGuide:OrderGuide;  
  @Input('action') action:string;    
  @Output('refresh') closeDialogAndRefreshItems = new EventEmitter<boolean>();
  @Output('activeIndex') index = new EventEmitter<number>();
  msgs: Message[] = [];
  ogRowID:string;
  constructor(private _orderGuideService:OrderGuidesService) { }

  ngOnInit() {
    console.log('order guide details component initiated.')
    //Initialize org & dept values for new orderguide    
    //In real application this value would come from local storage.
    if(this.action && this.action.toUpperCase() === createAction){
      this.ordGuide.org="001"; 
      this.ordGuide.dept="1060";
      this.ordGuide.orgDesc="St Johns Main Hospital";
      this.ordGuide.deptDesc="1100130ATED PARTIES"; 
    }
    /*if(this.ordGuide)
    console.log(JSON.stringify(this.ordGuide));*/
  }

  updateAction(newAction:string){
    this.action = newAction;
  }

  @Input() 
  set reset(reset:boolean){
    if(reset)
    this.ordGuide = new OrderGuide();    
  }
  saveOrderGuideDetails(){    
    if(this.action.toUpperCase() === editAction){
        console.log('edit..'+JSON.stringify(this.ordGuide));
        this._orderGuideService.editOrderGuide(this.ordGuide).subscribe(
          status => {
            if(status==='0'){
              this.msgs.push({severity:'success', summary:'Success', detail:'OrderGuide '+this.ordGuide.orderGuide+' updated successfully '});
              this.index.emit(1);
            }
            else{
              this.msgs.push({severity:'error', summary:'Error', detail:status});
            }
          }
        );       
    }
    else if(this.action.toUpperCase() === createAction){
      console.log('create..')      
      this._orderGuideService.createOrderGuide(this.ordGuide).subscribe(
        newOrderGuide => {
          if(newOrderGuide.id>"0"){
            this.ordGuide = <OrderGuide>newOrderGuide;            
            this.ogRowID = newOrderGuide.id;            
            this.msgs.push({severity:'success', summary:'Success', detail:'OrderGuide '+this.ordGuide.orderGuide+' created successfully '});
            setTimeout(() => this.index.emit(1), 500);            
          }
          else{
            this.msgs.push({severity:'error', summary:'Error', detail:this.ordGuide.errMsg});
          }
          this.ordGuide.id=this.ogRowID;
        }        
      );       
    }
  }

}
