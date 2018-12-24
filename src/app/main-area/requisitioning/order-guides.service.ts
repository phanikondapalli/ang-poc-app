import { Injectable } from '@angular/core';
//import { ORDERGUIDES } from './mock-order-guides'
import { HttpClient,HttpHeaders} from '@angular/common/http';
//import { Response } from '@angular/http';
import { OrderGuide } from './order-guide.model'
import 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { OrderGuideLine } from './order-guide-line.model';
import { OrderGuideItem } from './order-guide-item';
import {AppComponent} from "../../app.component";



@Injectable()
export class OrderGuidesService {

  constructor(private _http:HttpClient) { }
  
  //GET PAGINATED ORDER GUIDES REQUEST
  getOrderGuides():Observable<OrderGuide[]>{    
    //console.log('getting order guides page no: '+page);    
    
    //Hardcoded request
    let orderGuidesPayLoad:any = {"action": "GetData","tableName": "OrderGuide","viewName": "vOrderGuideValidDeptLst","OBMName": "MediClick.OBM.OrderGuideOBM, MediClick.ProClick, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null","useSystemDB": "False","useCtxAppSysDB": "False",
    "row": {"copiedFromID": "0","fields": {"DataProfile": "Admin"}    },
    "globalContext": {"fields": {"CID": "test01","UserID": "erplite","UserName": "erplite","AppCode": "EM","TabNav": "0","CAP": "15","MMISType": "1","PCSC": "1","TAM": "0","ICA": "0","UseEDS": "1","PWExp": "0","FG": "0","Org": "001","Dept": "1060","SupOrg": "001","AssetLoc": "Central","OrgDesc": "St Johns Main Hospital","DataProfile": "Admin"      }    }  };  
    
    //Set page number in request for pagination
    let jsonPayloadWithPagination:any = JSON.parse(JSON.stringify(orderGuidesPayLoad));
    //jsonPayloadWithPagination.row.fields.Page = page;
    orderGuidesPayLoad = JSON.stringify(jsonPayloadWithPagination);
    
    //ajax call
    return this._http.post(AppComponent.API_END_POINT.concat('/OrderGuide/list'),orderGuidesPayLoad,AppComponent.httpOptions)
    //return of(ORDERGUIDES);        
    .map(response =>  {                
        let orderGuides: OrderGuide[] = new Array();
        if(response['rows'] && Object.keys(response['rows'].row).length>0){          
        let orderGuideKeys:any[] = Object.keys(response['rows'].row);        
        for (let i=0;i<orderGuideKeys.length;i++){
          let rowId:any = orderGuideKeys[i];          
          //console.log(response['rows'].row[rowId].fields);
          orderGuides.push(<OrderGuide>response['rows'].row[rowId].fields);
        }        
      }
        //Set record count in first object
        orderGuides[0].recordCount = response['rows'].recordCount;
        return orderGuides;
      }
    );
  }

  //GET PAGINATED ORDER GUIDES LINES REQUEST
  getOrderGuideLines(page:number,orderGuideId:String):Observable<OrderGuideLine[]>{

    console.log('getting order guide lines page no: '+page);    
    
    //Hardcoded request
    let orderGuideLinesPayLoad:any = {"action": "GetData","tableName": "OrderGuideLine","viewName": "vOrderGuideLineLst",
    "OBMName": "MediClick.OBM.OrderGuideLineOBM, MediClick.ProClick, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
    "useSystemDB": "False","useCtxAppSysDB": "False",
    "row": {"copiedFromID": "0","fields": {"Page": "1","PageSize": "5","orderGuide": ""      }    },
    "globalContext": {"fields": {"CID": "test01","UserID": "erplite","UserName": "erplite","AppCode": "EM",
    "TabNav": "0","CAP": "15","MMISType": "1","PCSC": "1","TAM": "0","ICA": "0","UseEDS": "1","PWExp": "0",
    "FG": "0","Org": "001","Dept": "1060","SupOrg": "001","AssetLoc": "Central","OrgDesc": "St Johns Main Hospital",
    "DataProfile": "Admin"      }    }  };  
    
    //Set page number in request for pagination
    let jsonPayloadWithPagination:any = JSON.parse(JSON.stringify(orderGuideLinesPayLoad));
    jsonPayloadWithPagination.row.fields.Page = page;
    jsonPayloadWithPagination.row.fields.orderGuide = orderGuideId;
    orderGuideLinesPayLoad = JSON.stringify(jsonPayloadWithPagination);
    
    //ajax call
    return this._http.post(AppComponent.API_END_POINT.concat('/OrderGuide/lines'),orderGuideLinesPayLoad,AppComponent.httpOptions)
    //return of(ORDERGUIDES);        
    .map(response =>  {                        
        let orderGuideLines: OrderGuideLine[] = new Array();
        let orderGuideKeys:any[] = Object.keys(response['rows'].row);        
        for (let i=0;i<orderGuideKeys.length;i++){
          let rowId:any = orderGuideKeys[i];          
          //console.log(response['rows'].row[rowId].fields);
          if(response['rows'].row[rowId].fields)
          orderGuideLines.push(<OrderGuideLine>response['rows'].row[rowId].fields);
        }       
        
        //Set record count in first object
        if(orderGuideLines.length>0)
        orderGuideLines[0].recordCount = response['rows'].recordCount;

        return orderGuideLines;
      }
    );

  }

  //GET ALL OG LINES
  getAllOrderGuideLines(orderGuideId:String):Observable<OrderGuideLine[]>{
    
    //Hardcoded request
    let orderGuideLinesPayLoad:any = {"action": "GetData","tableName": "OrderGuideLine","viewName": "vOrderGuideLineLst",
    "OBMName": "MediClick.OBM.OrderGuideLineOBM, MediClick.ProClick, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
    "useSystemDB": "False","useCtxAppSysDB": "False",
    "row": {"copiedFromID": "0","fields": {"orderGuide": ""      }    },
    "globalContext": {"fields": {"CID": "test01","UserID": "erplite","UserName": "erplite","AppCode": "EM",
    "TabNav": "0","CAP": "15","MMISType": "1","PCSC": "1","TAM": "0","ICA": "0","UseEDS": "1","PWExp": "0",
    "FG": "0","Org": "001","Dept": "1060","SupOrg": "001","AssetLoc": "Central","OrgDesc": "St Johns Main Hospital",
    "DataProfile": "Admin"      }    }  };  
    
    //Set page number in request for pagination
    let jsonPayloadWithPagination:any = JSON.parse(JSON.stringify(orderGuideLinesPayLoad));
    jsonPayloadWithPagination.row.fields.orderGuide = orderGuideId;
    orderGuideLinesPayLoad = JSON.stringify(jsonPayloadWithPagination);
    
    //ajax call
    return this._http.post(AppComponent.API_END_POINT.concat('/OrderGuide/lines'),orderGuideLinesPayLoad,AppComponent.httpOptions)
    //return of(ORDERGUIDES);        
    .map(response =>  {                        
        let orderGuideLines: OrderGuideLine[] = new Array();
        let orderGuideKeys:any[] = Object.keys(response['rows'].row);        
        for (let i=0;i<orderGuideKeys.length;i++){
          let rowId:any = orderGuideKeys[i];          
          //console.log(response['rows'].row[rowId].fields);
          if(response['rows'].row[rowId].fields)
          orderGuideLines.push(<OrderGuideLine>response['rows'].row[rowId].fields);
        }       
        
        //Set record count in first object
        if(orderGuideLines.length>0)
        orderGuideLines[0].recordCount = response['rows'].recordCount;

        return orderGuideLines;
      }
    );

  }

  //GET AVAILABLE ITEMS TO ADD TO ORDER GUIDE
  getAvailableItemsForOrderGuide():Observable<OrderGuideItem[]>{

    //console.log('getting available items page no: '+page);    
          
    //ajax call
    return this._http.get(AppComponent.API_END_POINT.concat('/OrderGuide/availableitems/dept/1060/pagenum/1/count/500'),AppComponent.httpOptions)
    //return of(ORDERGUIDES);        
    .map(response =>  {                
        let availableItems: OrderGuideItem[] = new Array();
        let itemKeys:any[] = Object.keys(response['rows'].row);
        for (let i=0;i<itemKeys.length;i++){
          let rowId:any = itemKeys[i];          
          //console.log(response['rows'].row[rowId].fields);
          availableItems.push(<OrderGuideItem>response['rows'].row[rowId].fields);
        } 
        //Set record count in first object
        availableItems[0].recordCount = response['rows'].recordCount;       
        return availableItems;
      }
    );
  }

  addSelectedItemsToOrderGuide(orderGuideId:string,item:string):Observable<string>{

     //Hardcoded request
     let orderGuideAddItemPayLoad:any =  {"action": "ADD","tableName": "OrderGuideLine","viewName": "vOrderGuideLineEdt",
     "OBMName": "MediClick.OBM.OrderGuideLineOBM, MediClick.ProClick, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
     "useSystemDB": "False","useCtxAppSysDB": "False","confirmation": "OK","Requester": "Edits.OrderGuideLineEdit","ePHI": "0",
     "globalContext": {  "fields": {    "CID": "Test01",    "Org": "001",    "OrgDesc": "St Johns Main Hospital",    
     "AssetLoc": "Central",    "SupOrg": "001 ",    "Dept": "1060",    "UserID": "erplite",    "AppCode": "EM",    
     "TabNav": "0",    "CAP": "15",    "MMISType": "1",    "PCSC": "1",    "TAM": "0",    "ICA": "0",    "UseEDS": "1",  
     "PWExp": "0",    "FG": "0"  }},"row": {  "ID": "0",  "mode": "new",  "copiedFromID": "0",  "tableID": "OGL",  
     "fields": {    "ID": "0",    "Org": "001",    "Dept": "",    "OrderGuide": "",         "LineNum": "",  
       "SupplyingOrg": "001",    "SupplyingAssetLoc": "",    "ItemNo": "","UnitOfMeasure": ""        }}
      };
     
      let itemObj = JSON.parse(item);
      console.log(itemObj.itemNo);
     //Set item properties
     let jsonPayloadWithItemInfo:any = JSON.parse(JSON.stringify(orderGuideAddItemPayLoad));
     jsonPayloadWithItemInfo.row.fields = itemObj;
     jsonPayloadWithItemInfo.row.fields.OrderGuide = orderGuideId;
     jsonPayloadWithItemInfo.row.fields.id='0';
     jsonPayloadWithItemInfo.row.fields.timeStamp='';
       console.log('Adding lines to OG: '+orderGuideId)                   
       //jsonPayloadWithItemInfo.row.fields.Dept = "8135";//itemObj.dept;
       //jsonPayloadWithItemInfo.row.fields.SupplyingAssetLoc = "Main";//itemObj.supplyingAssetLoc;      
       orderGuideAddItemPayLoad = JSON.stringify(jsonPayloadWithItemInfo); 
       //ajax call       
       return this._http.post(AppComponent.API_END_POINT.concat('/OrderGuide/addline'),orderGuideAddItemPayLoad,AppComponent.httpOptions)        
       .map(response =>  {                           
           if(response['returnCode']=='0'){
             console.log('item:'+itemObj.itemNo+' added to OrderGuide: '+orderGuideId+'succesfully')
             return '0';
           }
           else{
            console.log('Error! item:'+itemObj.itemNo+' was not added to OrderGuide: '+orderGuideId)
            return response['errMsgs'][0];            
           }
           
         }
       );

  }

  editOrderGuide(orderGuide:OrderGuide):Observable<string>{
    //Hardcoded request
    let editOrderGuidePayLoad:any =  {"action": "UPDATE","tableName": "OrderGuide","viewName": "vOrderGuideEdt",
    "OBMName": "MediClick.OBM.OrderGuideOBM, MediClick.ProClick, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
    "useSystemDB": "False","useCtxAppSysDB": "False","confirmation": "OK","AuditReason": "","Requester": "Edits.OrderGuideEdt","ePHI": "0",
    "globalContext": { "fields": {"CID": "Test01","Org": "001","OrgDesc": "St Johns Main Hospital","AssetLoc": "Central",
    "SupOrg": "001","Dept": "1060","UserID": "erplite","AppCode": "EM","TabNav": "0","SubAppCode": [],"CAP": "15","MMISType": "1","Top": [],"PCSC": "1","TAM": "0","ICA": "0",
    "UseEDS": "1","PWExp": "0","FG": "0"}},    
    "row": {   "ID": "0",   "mode": "edit",   "copiedFromID": "0",   "tableID": "OGE",    
    "fields": {}}
    }
    
    //Set item properties
    let jsonPayload:any = JSON.parse(JSON.stringify(editOrderGuidePayLoad));
    jsonPayload.row.ID = orderGuide.id;
    jsonPayload.row.fields = orderGuide; 
    jsonPayload.row.fields.ChrgOrgOvrd='';
    jsonPayload.row.fields.ChrgDeptOvrd='';
    delete jsonPayload.row.fields.recordCount;            
    editOrderGuidePayLoad = JSON.stringify(jsonPayload);
      //ajax call       
    console.log(editOrderGuidePayLoad);  
      return this._http.post(AppComponent.API_END_POINT.concat('/OrderGuide/createOrderGuide'),editOrderGuidePayLoad,AppComponent.httpOptions)        
      .map(response =>  {                           
          if(response['returnCode']=='0'){
            //console.log('item:'+itemNo+' added to OrderGuide: '+orderGuideId+'succesfully')
            return '0';
          }
          else{
           //console.log('Error! item:'+itemNo+' was not added to OrderGuide: '+orderGuideId)           
           return response['errMsgs'][0];
          }
          
        }
      );

 }

 editOrderGuideLine(orderGuideLine:OrderGuideLine):Observable<string>{   
   //Hardcoded request
   let editOrderGuideLinePayLoad:any =  {"action": "UPDATE","tableName": "OrderGuideLine","viewName": "vOrderGuideLineLst",
   "OBMName": "MediClick.OBM.OrderGuideLineOBM, MediClick.ProClick, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
   "useSystemDB": "False","useCtxAppSysDB": "False","confirmation": "","AuditReason": "",
   "ePHI": "0",
   "globalContext": {   "sessID": "21834",   "hID": "55562",   "fields": {      "CID": "Test01","Org": "001",      
   "OrgDesc": "St Johns Main Hospital","AssetLoc": "Central","SupOrg": "001","Dept": "1060",      
   "UserID": "erplite","AppCode": "EM","TabNav": "0","SubAppCode": [],"CAP": "15","MMISType": "1",
   "Top": [],"PCSC": "1","TAM": "0","ICA": "0","UseEDS": "1","PWExp": "0","FG": "0",
   "SessionID": "21834"   }},"row": {   "ID": "",   "mode": "edit",   "copiedFromID": "0",   "tableID": "OGL",   "fields": {   }}
  }
   
   //Set item properties
   let jsonPayload:any = JSON.parse(JSON.stringify(editOrderGuideLinePayLoad));
   jsonPayload.row.ID = orderGuideLine.id;
   jsonPayload.row.fields = orderGuideLine;
   jsonPayload.row.fields.id = '';
   console.log('Saving order guide line'+orderGuideLine.id);              
   editOrderGuideLinePayLoad = JSON.stringify(jsonPayload);   
    //ajax call          
     return this._http.post(AppComponent.API_END_POINT.concat('/OrderGuide/editline'),editOrderGuideLinePayLoad,AppComponent.httpOptions)        
     .map(response =>  {                                  
         if(response['returnCode']=='0'){           
           //console.log('item:'+itemNo+' added to OrderGuide: '+orderGuideId+'succesfully')
          return '0';
         }
         else{
          //console.log('Error! item:'+itemNo+' was not added to OrderGuide: '+orderGuideId)
          return response['errMsgs'][0];
         }
         
       }
     );

}

deleteOrderGuide(orderGuideRowId:string):Observable<string>{
     return this._http.delete(AppComponent.API_END_POINT.concat('/OrderGuide/'+orderGuideRowId),AppComponent.httpOptions)        
     .map(response =>  {                           
         if(response['returnCode']=='0'){
           //console.log('item:'+itemNo+' added to OrderGuide: '+orderGuideId+'succesfully')
           return '0';
         }
         else{
          //console.log('Error! item:'+itemNo+' was not added to OrderGuide: '+orderGuideId)
          return response['errMsgs'][0];
         }
         
       }
     );

}

deleteOrderGuideLine(orderGuideLineRowId:string):Observable<string>{
  return this._http.delete(AppComponent.API_END_POINT.concat('/OrderGuide/line/'+orderGuideLineRowId),AppComponent.httpOptions)        
  .map(response =>  {                           
      if(response['returnCode']=='0'){
        //console.log('item:'+itemNo+' added to OrderGuide: '+orderGuideId+'succesfully')
        return '0';
      }
      else{
       //console.log('Error! item:'+itemNo+' was not added to OrderGuide: '+orderGuideId)
       return response['errMsgs'][0];
      }
      
    }
  );

}

createOrderGuide(orderGuide:OrderGuide):Observable<OrderGuide>{  
      //Hardcoded request
      let orderGuideCreatePayLoad:any =  {"action": "ADD","tableName": "OrderGuide","viewName": "vOrderGuideEdt",
     "OBMName": "MediClick.OBM.OrderGuideOBM, MediClick.ProClick, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
     "useSystemDB": "False","useCtxAppSysDB": "False","confirmation": "","AuditReason":"", "Requester": "Edits.OrderGuideEdtTrn","ePHI": "0",
     "globalContext": {  "fields": {    "CID": "Test01",    "Org": "001",    "OrgDesc": "St Johns Main Hospital",    
     "AssetLoc": "Central",    "SupOrg": "001 ",    "Dept": "1060",    "UserID": "erplite",    "AppCode": "EM",    
     "TabNav": "0",    "CAP": "15",    "MMISType": "1",    "PCSC": "1",    "TAM": "0",    "ICA": "0",    "UseEDS": "1",  
     "PWExp": "0",    "FG": "0"  }},"row": {  "ID": "0",  "mode": "new",  "copiedFromID": "0",  "tableID": "OGE"}
      };     

    //Set item properties
    let jsonPayload:any = JSON.parse(JSON.stringify(orderGuideCreatePayLoad));    
    jsonPayload.row.fields = orderGuide; 
    jsonPayload.row.fields.ChargeToDept='1060';
    jsonPayload.row.fields.ChargeToOrg='001'
    jsonPayload.row.fields.id="0";
    delete jsonPayload.row.fields.recordCount;            
    delete jsonPayload.row.fields.errMsg;
    orderGuideCreatePayLoad = JSON.stringify(jsonPayload);
    //console.log(orderGuideCreatePayLoad);        
      //ajax call       
       return this._http.post(AppComponent.API_END_POINT.concat('/OrderGuide/createOrderGuide'),orderGuideCreatePayLoad,AppComponent.httpOptions)        
       .map(response =>  {                           
           if(response['returnCode']=='0'){
             console.log('Order guide created succesfully');             
             return <OrderGuide>response['row'].fields;
           }
           else{
            console.log('Error creating order guide!');
            orderGuide.errMsg = response['errMsgs'][0];
            return orderGuide;
           }
           
         }
       );
      }

}
