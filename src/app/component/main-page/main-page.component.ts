import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addClassBlockOnClick() {
    
    const factory = this.componentFactoryResolver.resolveComponentFactory(ClassBlockComponent);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();

    // classData.blockId = "block_" + dataCount;   
    // data.push(JSON.parse(JSON.stringify(classData)));  dataCount++;
    // localStorage.setItem('localStorageData', JSON.stringify(data));  
    // console.log(data);     
  }

  saveAllData(){
    localStorage.setItem('localStorageData', JSON.stringify(data)); 
  }

}
