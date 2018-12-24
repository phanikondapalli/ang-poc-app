import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { RequisitionLine } from './requisition-line.model';
import { Requisition } from './requisition.model';
import {AppComponent} from "../../app.component";

@Injectable()
export class RequisitionsService {

  constructor(private _http:HttpClient) { }

  getRequisitions(page:number):Observable<Requisition[]>{    
    console.log('getting requisitions...');    
    
    //Hardcoded request
    let requisitionsPayLoad:any = {"action": "GetData","tableName": "Requisition",
    "viewName": "vRequisitionLst","OBMName": "MediClick.OBM.RequisitionOBM, MediClick.ProClick,Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
    "useSystemDB": "False","useCtxAppSysDB": "False","confirmation": "","AuditReason": "",
    "row": {"mode": "","copiedFromID": "0","fields": {"Page": "1","PageSize": "15","Org": "001","Dept": "1060"}   },
    "globalContext": {"fields": {"CID": "test01","UserID": "erplite","UserName": "erplite","AppCode": "EM",
    "TabNav": "0","CAP": "15","MMISType": "1","PCSC": "1","TAM": "0","ICA": "0","UseEDS": "1","PWExp": "0","FG": "0",
    "Org": "001","Dept": "1060","SupOrg": "001","AssetLoc": "Central","OrgDesc": "St Johns Main Hospital","DataProfile": "Admin"}}};  
    
    //Set page number in request for pagination
    let jsonPayloadWithPagination:any = JSON.parse(JSON.stringify(requisitionsPayLoad));
    jsonPayloadWithPagination.row.fields.Page = page;
    requisitionsPayLoad = JSON.stringify(jsonPayloadWithPagination);
    
    //ajax call
    return this._http.post(AppComponent.API_END_POINT.concat('/Requisition/'),requisitionsPayLoad,AppComponent.httpOptions)
    //return of(RequisitionS);  
    .map(response =>  { 
  let requisitions: Requisition[] = new Array();
  if(response['rows'] && Object.keys(response['rows'].row).length>0){
  let requisitionKeys:any[] = Object.keys(response['rows'].row);
  for (let i=0;i<requisitionKeys.length;i++){
 let rowId:any = requisitionKeys[i]; 
 //console.log(response['rows'].row[rowId].fields);
 requisitions.push(<Requisition>response['rows'].row[rowId].fields);
  }  
}
  return requisitions;
}
    );
  }

  getRequisitionLines(page:number,requisitionId:String):Observable<RequisitionLine[]>{

    console.log('getting order guides...');    
    
    //Hardcoded request
    let requisitionLinesPayLoad:any ={"action": "GetData","tableName": "RequisitionLine","viewName": "vReqLineIssStatusLst",
    "OBMName": "MediClick.OBM.RequisitionLineOBM, MediClick.ProClick, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null",
    "useSystemDB": "False","useCtxAppSysDB": "False","confirmation": "","AuditReason": "","row": {"mode": "",
    "copiedFromID": "0","fields": {"Page": "1","PageSize": "10","Dept": "1060","RequisitionNo": ""}},
    "globalContext": {"fields": {"CID": "test01","UserID": "erplite","UserName": "erplite","AppCode": "EM","TabNav": "0",
    "CAP": "15","MMISType": "1","PCSC": "1","TAM": "0","ICA": "0","UseEDS": "1","PWExp": "0","FG": "0","Org": "001",
    "Dept": "1060", "SupOrg": "001", "AssetLoc": "Central", "OrgDesc": "St Johns Main Hospital", "DataProfile": "Admin"} }};
    
    //Set page number in request for pagination
    let jsonPayloadWithPagination:any = JSON.parse(JSON.stringify(requisitionLinesPayLoad));
    jsonPayloadWithPagination.row.fields.Page = page;
    jsonPayloadWithPagination.row.fields.RequisitionNo = requisitionId;
    requisitionLinesPayLoad = JSON.stringify(jsonPayloadWithPagination);
    
    //ajax call
    return this._http.post(AppComponent.API_END_POINT.concat('/Requisition/lines'),requisitionLinesPayLoad,AppComponent.httpOptions)    
    .map(response =>  { 
  let requisitionLines: RequisitionLine[] = new Array();
  let requisitionKeys:any[] = Object.keys(response['rows'].row);
  for (let i=0;i<requisitionKeys.length;i++){
 let rowId:any = requisitionKeys[i]; 
 //console.log(response['rows'].row[rowId].fields);
 requisitionLines.push(<RequisitionLine>response['rows'].row[rowId].fields);
  }  
  return requisitionLines;
}
    );

  }

//Edit Requisition
editRequisition(requisition:Requisition):Observable<boolean>{
  /*
      //Hardcoded request
      let orderGuideAddItemPayLoad:any =  
      
      //Set item properties
      let jsonPayloadWithItemInfo:any = JSON.parse(JSON.stringify(orderGuideAddItemPayLoad));
      jsonPayloadWithItemInfo.row.fields.OrderGuide = orderGuideId;
        console.log('Adding lines to OG: '+orderGuideId)            
        jsonPayloadWithItemInfo.row.ID = rowId;
        jsonPayloadWithItemInfo.row.fields.ItemNo = itemNo; 
        orderGuideAddItemPayLoad = JSON.stringify(jsonPayloadWithItemInfo);          
        //ajax call       
        */
        return this._http.post(AppComponent.API_END_POINT.concat('/Requisition/'),"PAY_LOAD",AppComponent.httpOptions)        
        .map(response =>  {                           
            if(response['returnCode']=='0'){
              //console.log('success')
              return true;
            }
            else{
             //console.log('Error!')
             return false;
            }
            
          }
        );
  
   }

//Edit Requisition Line
editRequisitionLine(requisition:Requisition):Observable<boolean>{
  /*
      //Hardcoded request
      let orderGuideAddItemPayLoad:any =  
      
      //Set item properties
      let jsonPayloadWithItemInfo:any = JSON.parse(JSON.stringify(orderGuideAddItemPayLoad));
      jsonPayloadWithItemInfo.row.fields.OrderGuide = orderGuideId;
        console.log('Adding lines to OG: '+orderGuideId)            
        jsonPayloadWithItemInfo.row.ID = rowId;
        jsonPayloadWithItemInfo.row.fields.ItemNo = itemNo; 
        orderGuideAddItemPayLoad = JSON.stringify(jsonPayloadWithItemInfo);          
        //ajax call       
        */
        return this._http.post(AppComponent.API_END_POINT.concat('/Requisition/'),"PAY_LOAD",AppComponent.httpOptions)        
        .map(response =>  {                           
            if(response['returnCode']=='0'){
              //console.log('success')
              return true;
            }
            else{
             //console.log('Error!')
             return false;
            }
            
          }
        );
  
   }
//Add Requisition Line
addRequisitionLine(requisition:Requisition):Observable<boolean>{
  /*
      //Hardcoded request
      let orderGuideAddItemPayLoad:any =  
      
      //Set item properties
      let jsonPayloadWithItemInfo:any = JSON.parse(JSON.stringify(orderGuideAddItemPayLoad));
      jsonPayloadWithItemInfo.row.fields.OrderGuide = orderGuideId;
        console.log('Adding lines to OG: '+orderGuideId)            
        jsonPayloadWithItemInfo.row.ID = rowId;
        jsonPayloadWithItemInfo.row.fields.ItemNo = itemNo; 
        orderGuideAddItemPayLoad = JSON.stringify(jsonPayloadWithItemInfo);          
        //ajax call       
        */
        return this._http.post(AppComponent.API_END_POINT.concat('/Requisition/'),"PAY_LOAD",AppComponent.httpOptions)        
        .map(response =>  {                           
            if(response['returnCode']=='0'){
              //console.log('success')
              return true;
            }
            else{
             //console.log('Error!')
             return false;
            }
            
          }
        );
  
   }
//Delete Requisition Line
deleteRequisition(requisition:Requisition):Observable<boolean>{
  /*
      //Hardcoded request
      let orderGuideAddItemPayLoad:any =  
      
      //Set item properties
      let jsonPayloadWithItemInfo:any = JSON.parse(JSON.stringify(orderGuideAddItemPayLoad));
      jsonPayloadWithItemInfo.row.fields.OrderGuide = orderGuideId;
        console.log('Adding lines to OG: '+orderGuideId)            
        jsonPayloadWithItemInfo.row.ID = rowId;
        jsonPayloadWithItemInfo.row.fields.ItemNo = itemNo; 
        orderGuideAddItemPayLoad = JSON.stringify(jsonPayloadWithItemInfo);          
        //ajax call       
        */
        return this._http.post(AppComponent.API_END_POINT.concat('/Requisition/'),"PAY_LOAD",AppComponent.httpOptions)        
        .map(response =>  {                           
            if(response['returnCode']=='0'){
              //console.log('success')
              return true;
            }
            else{
             //console.log('Error!')
             return false;
            }
            
          }
        );
  
   }
//Delete Requisition Line
deleteRequisitionLine(requisition:Requisition):Observable<boolean>{
  /*
      //Hardcoded request
      let orderGuideAddItemPayLoad:any =  
      
      //Set item properties
      let jsonPayloadWithItemInfo:any = JSON.parse(JSON.stringify(orderGuideAddItemPayLoad));
      jsonPayloadWithItemInfo.row.fields.OrderGuide = orderGuideId;
        console.log('Adding lines to OG: '+orderGuideId)            
        jsonPayloadWithItemInfo.row.ID = rowId;
        jsonPayloadWithItemInfo.row.fields.ItemNo = itemNo; 
        orderGuideAddItemPayLoad = JSON.stringify(jsonPayloadWithItemInfo);          
        //ajax call       
        */
        return this._http.post(AppComponent.API_END_POINT.concat('/Requisition/'),"PAY_LOAD",AppComponent.httpOptions)        
        .map(response =>  {                           
            if(response['returnCode']=='0'){
              //console.log('success')
              return true;
            }
            else{
             //console.log('Error!')
             return false;
            }
            
          }
        );
  
   }

}
