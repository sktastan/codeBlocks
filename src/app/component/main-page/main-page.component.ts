import { Component, 
        OnInit, 
        ViewContainerRef, 
        ComponentFactoryResolver, 
        ViewChild, 
        ElementRef, 
        AfterViewInit } from '@angular/core';
import { BlocksComponent } from '../blocks/blocks.component';
// import { Data } from '@angular/router';


// let X = 0;
// let Y = 0;

export var data = new Array(); 

function localStorageInit() {
  if (!localStorage.getItem('localStorageData')) {
    // data.push(JSON.parse(JSON.stringify('localStorageData', data)));
    //data.push(JSON.parse(JSON.stringify('localStorageData')));
    localStorage.setItem('localStorageData', JSON.stringify(data));   
  } else { 
    data = JSON.parse(localStorage.getItem('localStorageData') || '{}');
  }
  console.log(data); 
} 

	//--------------------------------------------------------//
	// 					Generate random id                     
	//--------------------------------------------------------//
	function randomID(prefix, maxNum) {

		var randomId = prefix + Math.floor(Math.random() * maxNum);
		return randomId;

	}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements AfterViewInit {

  @ViewChild('idDisplayXY') displayXY!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {}

  ngAfterViewInit(){
    localStorageInit(); 

    for (let i = 0; i < data.length; i++) {      
      const factory = this.componentFactoryResolver.resolveComponentFactory(BlocksComponent);
      const ref = this.viewContainerRef.createComponent(factory);
      ref.changeDetectorRef.detectChanges();

      ref.instance.blocksData = data[i];
      ref.instance.getNewClassName = ref.instance.blocksData.blockClassName;
      ref.instance.classBlock.nativeElement.setAttribute('id', data[i].blockId);
    }
  }

  pageMouseMove(event: any): void{
    this.displayXY.nativeElement.innerHTML = 'x: '+ event.clientX + ' y: '+ event.clientY ;    
  }

  addClassBlockOnClick() {
    
    const factory = this.componentFactoryResolver.resolveComponentFactory(BlocksComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges(); 

    let randomid = randomID('block_', 99999);
    ref.instance.blocksData.blockId = randomid;
    ref.instance.classBlock.nativeElement.setAttribute('id', randomid); 

    data.push(JSON.parse(JSON.stringify(ref.instance.blocksData)));
    console.log(data);

    let refIns = ref.instance;    
    console.log({refIns}); 
  }

  saveAllData(){
    localStorage.setItem('localStorageData', JSON.stringify(data)); 
  } 

}
