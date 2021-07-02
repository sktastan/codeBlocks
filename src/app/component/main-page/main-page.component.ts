import { Component, 
        OnInit, 
        ViewContainerRef, 
        ComponentFactoryResolver, 
        ViewChild, 
        ElementRef, 
        AfterViewInit } from '@angular/core';
import { BlocksComponent } from '../blocks/blocks.component';
// import { Data } from '@angular/router';

// import {drag, dragover, drop} from '../blocks/blocks.component';

export var data = new Array(); 

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements AfterViewInit {

  @ViewChild('idDisplayXY') displayXY!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  //--------------------------------------------------------//
	//  constructor           
	//--------------------------------------------------------//
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  //--------------------------------------------------------//
	//  ngOnInit           
	//--------------------------------------------------------//
  ngOnInit(): void { }

  //--------------------------------------------------------//
	//  ngAfterViewInit           
	//--------------------------------------------------------//
  ngAfterViewInit(){     
    this.localStorageInit(); 
    this.removeFirstBlock();
    this.initAllBlocks();   
  }

  //--------------------------------------------------------//
	//  Generate random id                     
	//--------------------------------------------------------//
	randomID(prefix, maxNum) {
		var randomId = prefix + Math.floor(Math.random() * maxNum);
		return randomId;
	}

  //--------------------------------------------------------//
	// 	localStorageInit	                     
	//--------------------------------------------------------//
  localStorageInit() {
  if (!localStorage.getItem('localStorageData')) {
    // data.push(JSON.parse(JSON.stringify('localStorageData', data)));        
    localStorage.setItem('localStorageData', JSON.stringify(data));   
  } else { 
    data = JSON.parse(localStorage.getItem('localStorageData') || '{}');
  }
  console.log(data); 
  } 

  //--------------------------------------------------------//
	//  initAllBlocks           
	//--------------------------------------------------------//
  initAllBlocks(){
    for (let i = 0; i < data.length; i++) {      
      const factory = this.componentFactoryResolver.resolveComponentFactory(BlocksComponent);
      const ref = this.viewContainerRef.createComponent(factory);
      ref.changeDetectorRef.detectChanges();

      ref.instance.blocksData = data[i];
      ref.instance.getNewClassName = ref.instance.blocksData.blockClassName;
      ref.instance.classBlock.nativeElement.setAttribute('id', data[i].blockId);

      ref.instance.classBlock.nativeElement.style.left = ref.instance.blocksData.x + 'px';
      ref.instance.classBlock.nativeElement.style.top = ref.instance.blocksData.y + 'px';
    }
  }

  //--------------------------------------------------------//
	//  removeFirstBlock           
	//--------------------------------------------------------//
  removeFirstBlock(){
    let mainpageEl = document.body.getElementsByClassName('main-page');
    let firstAppBlock = mainpageEl[0].getElementsByTagName('app-blocks'); 
    //console.log({firstAppBlock});
    mainpageEl[0].removeChild(firstAppBlock[0]); 
  }

  //--------------------------------------------------------//
	//  pageMouseMove           
	//--------------------------------------------------------//
  pageMouseMove(event: any){
    this.displayXY.nativeElement.innerHTML = 'x: '+ event.clientX + ' y: '+ event.clientY ;    
  }

  //--------------------------------------------------------//
	//  addClassBlockOnClick             
	//--------------------------------------------------------//
  addClassBlockOnClick() {    
    const factory = this.componentFactoryResolver.resolveComponentFactory(BlocksComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges(); 

    let randomid = this.randomID('block_', 99999);
    ref.instance.blocksData.blockId = randomid;
    ref.instance.classBlock.nativeElement.setAttribute('id', randomid); 

    data.push(JSON.parse(JSON.stringify(ref.instance.blocksData)));
    // console.log(data);

    // let refIns = ref.instance;    
    // console.log({refIns}); 
  }

  //--------------------------------------------------------//
	//  saveAllData              
	//--------------------------------------------------------//
  saveAllData(){
    localStorage.setItem('localStorageData', JSON.stringify(data)); 
  } 
}
