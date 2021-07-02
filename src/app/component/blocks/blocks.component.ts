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
    blockId : "block_0",
    blockClassName : "New Class",
    x : 0,
    y : 0
  }

  getNewClassName: string = " ";

  //--------------------------------------------------------//
	//  constructor          
	//--------------------------------------------------------//
  // constructor() { }

  //--------------------------------------------------------//
	//  ngOnInit         
	//--------------------------------------------------------//
  ngOnInit(): void { }

  //--------------------------------------------------------//
	//  ngAfterViewInit         
	//--------------------------------------------------------//
  ngAfterViewInit(){ 
    this.getNewClassName = this.blocksData.blockClassName; 
  }   

  //--------------------------------------------------------//
	//  inputOnChange          
	//--------------------------------------------------------//
  inputOnChange(event: any){ 
    activeElemId.id = event.target.parentNode.parentNode.id; 
    console.log( activeElemId.id);
    for (let index = 0; index < data.length; index++) {
      const blkID = data[index].blockId;
      if(activeElemId.id == blkID){
        data[index].blockClassName = this.inputClassName.nativeElement.value;
      }      
    }  
  }
  
  //--------------------------------------------------------//
	//  moveSpotOnMouseOver             
	//--------------------------------------------------------//
  moveSpotOnMouseOver(event: any){
    //this.moveSpot.nativeElement.parentNode.style.boxShadow = '#000 1px 1px 10px';
    // this.moveSpot.nativeElement.parentNode.style.border = '2px solid pink';

    // event.target.parentNode.style.border = '1px solid red';
    // event.target.parentNode.style.boxShadow = '#2C3E50 1px 1px 1px';
    
    // console.log('moveSpotOnMouseOver!');
  }

  //--------------------------------------------------------//
	//  moveSpotOnMouseLeave                 
	//--------------------------------------------------------//
  moveSpotOnMouseLeave(event: any){
    // event.target.parentNode.style.border = '1px solid #2C3E50';
    // event.target.parentNode.style.boxShadow = '#2C3E50 1px 1px 10px';
    // console.log('moveSpotOnMouseLeave!');
  }

  //--------------------------------------------------------//
	//  moveSpotOnMouseDown				                  
	//--------------------------------------------------------//
  moveSpotOnMouseDown(event: any){
    event.preventDefault();
    selectedObject = event.target; 
    this.clearAllBorderState();
    this.clearAllZIndexState();
    
    this.moveSpot.nativeElement.parentNode.style.border = '2px solid #afef22';
    this.moveSpot.nativeElement.parentNode.style.zIndex = 10000;
    window.addEventListener('mousemove', this.moveSpotOnMouseMove, false);

    // this.setCssStyle('border', '10px solid pink');

    X = event.clientX - selectedObject.parentNode.offsetLeft;  
    Y = event.clientY - selectedObject.parentNode.offsetTop;

    activeElemId.id = selectedObject.parentNode.getAttribute('id');
  }

  //--------------------------------------------------------//
	// 	moveSpotOnMouseUp				                  
	//--------------------------------------------------------//
  moveSpotOnMouseUp(event: any){ 
    
    // this.blocksData.x = (event.clientX - X);
    // this.blocksData.y = (event.clientY - Y);

    console.log('x position : ' +   (event.clientX - X), 'y position : ' +  (event.clientY - Y)); 
    window.removeEventListener('mousemove', this.moveSpotOnMouseMove, false);

    for (let index = 0; index < data.length; index++) {
      const blkID = data[index].blockId;
      if(this.classBlock.nativeElement.id == blkID){
        data[index].x = (event.clientX - X);
        data[index].y = (event.clientY - Y);
      }      
    }    
  }

  //--------------------------------------------------------//
	// 	moveSpotOnMouseMove				                  
	//--------------------------------------------------------//
  moveSpotOnMouseMove(event: any){
    selectedObject.parentNode.style.left = (event.clientX - X) + 'px';
    selectedObject.parentNode.style.top =  (event.clientY - Y) + 'px';
    // console.log('moveSpotOnMouseMove!');  (event.clientX - X)
  }
  
  //--------------------------------------------------------//
	//  deleteClassBlockButtonOnClick				                  
	//--------------------------------------------------------//
  deleteClassBlockButtonOnClick(event: any){
    for (let index = 0; index < data.length; index++) {
        const blkID = data[index].blockId;
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

  //--------------------------------------------------------//
	//  clearAllBorderState					                  
	//--------------------------------------------------------//
  clearAllBorderState(){
    let allEl = this.classBlock.nativeElement.parentNode.parentNode.querySelectorAll('.class-block');
    for (let index = 0; index < allEl.length; index++) { 
      allEl[index].style.border = '2px solid #2C3E50';
      // allEl[index].style.border = '4px solid #CA2C68';
      // allEl[index].style.zIndex = 0;
    }    
  }

  //--------------------------------------------------------//
	// 	clearAllZIndexState				                  
	//--------------------------------------------------------//
  clearAllZIndexState(){
    let allEl = this.classBlock.nativeElement.parentNode.parentNode.querySelectorAll('.class-block');
    for (let index = 0; index < allEl.length; index++) { 
      allEl[index].style.zIndex = 0;
    }   
  }

  //--------------------------------------------------------//
	// 	setCssStyle				                  
	//--------------------------------------------------------//
  setCssStyle(style, value){
    // let allEl = this.classBlock.nativeElement.parentNode.parentNode.querySelectorAll('.class-block');
    // for (let index = 0; index < allEl.length; index++) { 
    //   allEl[index].setAttribute('style', style + ':' + value);
    // }   

    this.classBlock.nativeElement.setAttribute('style', style + ':' + value);

  }

  // --------------------------------------------------------- //
  // Drag start function
  // --------------------------------------------------------- //
  drag(ev) { 

    ev.dataTransfer.setData("text/plain", ev.target.id);

    var img = new Image();
    img.src = '../assets/add_icon.png';
    ev.dataTransfer.setDragImage(img, 0, 0);
 
  }
 
  // --------------------------------------------------------- //
  // Drag over function
  // --------------------------------------------------------- //
  dragover(ev) {

     ev.preventDefault();

    // if (ev.preventDefault) {
    //     ev.preventDefault(); // Necessary. Allows us to drop.
    // }

    // ev.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    // return false;
  
  }

  // --------------------------------------------------------- //
  // Drag end function
  // --------------------------------------------------------- //
  drop(ev) {  
    ev.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    var data = ev.dataTransfer.getData("text"); 
    console.log('active => ' + data);  
    // var child = ev.target.appendChild(document.getElementById(data));
    var child = ev.target.parentNode.parentNode.appendChild(document.getElementById(data));
    console.log( ev.target.offsetLeft );
    child.style.top =  (ev.target.parentNode.offsetTop +  ev.target.parentNode.offsetHeight + 15 ) + 'px';
    child.style.left =  (ev.target.parentNode.offsetLeft - 2) + 'px';
    // child.style.background = '#DF2C68'
    // console.log('active element => ' + child.id);    

    // dyna.activeElement = dyna.findActiveElement(child.id);
    // //console.log(dyna.activeElement.id);

    // dyna.activeElement.parent = ev.target.id;

    // dyna.setElementList();
    // dyna.updateStyle();

    // console.log('parent of ac.tive element => ' + dyna.activeElement.parent);

  }

  magnet(){ }

}
