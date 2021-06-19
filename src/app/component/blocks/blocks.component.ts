import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import {data} from '../main-page/main-page.component';

let X = 0;
let Y = 0;
let selectedObject: any; 
var activeElemId = {id: 0};

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.sass']
})

export class BlocksComponent implements AfterViewInit {

  @ViewChild('idClassBlock') classBlock!: ElementRef;
  @ViewChild('idMoveSpot') moveSpot!: ElementRef;
  @ViewChild('iddeleteClassBlockButton') deleteClassBlockButton!: ElementRef;
  @ViewChild('idInputClassName') inputClassName!: ElementRef; 
  
  blocksData = {
    // blockId : dataCount,
    blockId : "block_0",
    blockClassName : "New Class"
  }

  // data = new Array();

  getNewClassName: string;

  constructor() { this.getNewClassName = this.blocksData.blockClassName; }

  ngOnInit(): void {    
    
  }

  ngAfterViewInit(){ 
    //this.localStorageInit(); 
  }   

  inputOnChange(event: any){ 
    // let ia = "onfocus => " + event.target.parentNode.id;
    activeElemId.id = event.target.parentNode.id; 
    console.log( activeElemId.id);

    // activeElemId.id = this.inputClassName.nativeElement.parentNode.id;
    for (let index = 0; index < data.length; index++) {
      const blkID = data[index].blockId;
      if(activeElemId.id == blkID){
        // console.log(activeElemId.id + " : " + blkID); 
        // console.log(data); 
        data[index].blockClassName = this.inputClassName.nativeElement.value;
      }      
    }  
  }
   
  moveSpotOnMouseOver(event: any){
    //this.moveSpot.nativeElement.parentNode.style.boxShadow = '#000 1px 1px 10px';
    // this.moveSpot.nativeElement.parentNode.style.border = '2px solid pink';
    event.target.parentNode.style.boxShadow = '#2C3E50 1px 1px 10px';
    // console.log('moveSpotOnMouseOver!');
  }

  moveSpotOnMouseLeave(event: any){
    event.target.parentNode.style.boxShadow = '#2C3E50 1px 1px 1px';
    // console.log('moveSpotOnMouseLeave!');
  }

  moveSpotOnMouseDown(event: any){
    event.preventDefault();
    selectedObject = event.target; 
    // this.moveSpot.nativeElement.parentNode.style.boxShadow = 'yellow 1px 1px 10px';
    this.clearBorderState(selectedObject);
    // this.moveSpot.nativeElement.parentNode.style.border = 'none';
    this.moveSpot.nativeElement.parentNode.style.border = '2px solid yellow';
    window.addEventListener('mousemove', this.moveSpotOnMouseMove, false);

    X = event.clientX - selectedObject.parentNode.offsetLeft;  
    Y = event.clientY - selectedObject.parentNode.offsetTop;

    activeElemId.id = selectedObject.parentNode.getAttribute('id');
    
    // console.log(activeElemId.id);
    // console.log({selectedObject});
    // console.log(event.target);
  }

  moveSpotOnMouseUp(event: any){
    window.removeEventListener('mousemove', this.moveSpotOnMouseMove, false);
  }

  moveSpotOnMouseMove(event: any){
    selectedObject.parentNode.style.left = (event.clientX - X) + 'px';
    selectedObject.parentNode.style.top =  (event.clientY - Y) + 'px';
    // console.log('moveSpotOnMouseMove!'); 
  }
  
  deleteClassBlockButtonOnClick(event: any){
    for (let index = 0; index < data.length; index++) {
        const blkID = data[index].blockId;
        // if(activeElemId.id == blkID){
        if(this.classBlock.nativeElement.id == blkID){
          console.log(activeElemId.id + " : " + blkID); 
          console.log(data); 
          
          data.splice(index, 1); 
          localStorage.setItem('localStorageData', JSON.stringify(data));

          let classBlockParent = this.classBlock.nativeElement.parentNode.parentNode;
          classBlockParent.removeChild(this.classBlock.nativeElement.parentNode);
        }      
      }    
  }

  clearBorderState(activeElem){
    // let length = activeElem.parentNode.parentNode.parentNode.children.length;
    // let par = activeElem.parentNode.parentNode.parentNode;
    
    // console.log({par})
    // for (let index = 0; index < length; index++) {
    //   activeElem.parentNode.children[index].style.border = 'none';      
    // }

    let allEl = this.classBlock.nativeElement.parentNode.parentNode.querySelectorAll('.class-block');
    // console.log({allEl});
    for (let index = 0; index < allEl.length; index++) { 
      allEl[index].style.border = '1px solid #2C3E50';
    }
    
  }

}
