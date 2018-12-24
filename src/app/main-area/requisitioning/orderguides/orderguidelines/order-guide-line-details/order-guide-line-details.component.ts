import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OrderGuideLine } from '../../../order-guide-line.model';
import { Message } from 'primeng/components/common/api';
import { OrderGuidesService } from '../../../order-guides.service';

@Component({
  selector: 'app-order-guide-line-details',
  templateUrl: './order-guide-line-details.component.html',
  styleUrls: ['./order-guide-line-details.component.css'],
  providers:[OrderGuidesService]
})
export class OrderGuideLineDetailsComponent implements OnInit {

  constructor(private _orderGuidesService:OrderGuidesService) { }

  @Input('orderGuideLine') line:OrderGuideLine
  @Output('refresh')closeDialogAndRefreshItems = new EventEmitter<boolean>();
  msgs: Message[] = [];

  ngOnInit() {
  }

  //Update Order guide line

updateLine() {
  this._orderGuidesService.editOrderGuideLine(this.line).subscribe(
    status => {
      if(status=='0'){
        this.msgs.push({severity:'success', summary:'Success', detail:'OrderGuide line '+this.line.id+' updated successfully '});                
        this.closeDialogAndRefreshItems.emit(true);
      }
      else{
        this.msgs.push({severity:'error', summary:'Error', detail:status});
      }
    }
  );
}

}
