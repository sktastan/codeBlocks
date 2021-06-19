import { Component, 
        OnInit, 
        ViewContainerRef, 
        ComponentFactoryResolver, 
        ViewChild, 
        ElementRef, 
        AfterViewInit } from '@angular/core';
import { BlocksComponent } from '../blocks/blocks.component';
import { Data } from '@angular/router';


// let X = 0;
// let Y = 0;

export var data = new Array(); 

// let newBlock; 
let dataCount = 0;
// export var data = new Array();

// export var data = [{}]; 
// export let data: Array<Object>;

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

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements AfterViewInit {

  @ViewChild('idDisplayXY') displayXY!: ElementRef;
  @ViewChild('container', { read: ViewContainerRef }) viewContainerRef!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    localStorageInit();
  }

  pageMouseMove(event: any): void{
    this.displayXY.nativeElement.innerHTML = 'x: '+ event.clientX + ' y: '+ event.clientY ;    
  }

  addClassBlockOnClick() {
    
    const factory = this.componentFactoryResolver.resolveComponentFactory(BlocksComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges(); 
    ref.instance.blocksData.blockId = "block_" + dataCount; 
    ref.instance.classBlock.nativeElement.setAttribute('id', "block_" + dataCount);    

    data.push(JSON.parse(JSON.stringify(ref.instance.blocksData)));
    console.log(data);

    dataCount++;

    let refIns = ref.instance;    
    console.log({refIns});

    // newBlock = new BlocksComponent(); 
    // newBlock.blocksData.blockId = "block_" + dataCount; dataCount++;  

    // data.push(JSON.parse(JSON.stringify(classData)));  
    // localStorage.setItem('localStorageData', JSON.stringify(data));  
    
    // newBlock.data.push(JSON.parse(JSON.stringify(newBlock.blocksData))); 
    // console.log(newBlock.data);  
  }

  saveAllData(){
    localStorage.setItem('localStorageData', JSON.stringify(data)); 
  } 

}
