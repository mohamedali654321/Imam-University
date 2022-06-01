import { Component, Input, OnInit } from '@angular/core';
import { async } from 'rxjs';
interface carouselImage{
  imageSrc:string;
  imageAlt:string;

}
@Component({
  selector: 'ds-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
@Input() images: carouselImage[]=[];
selectedIndex =0;
@Input() indicator=true;
@Input() controls=true;
@Input() autoSlide=false;
@Input() slideInterval=3000;
  constructor() { }

  ngOnInit(): void {
    if(this.autoSlide === true)
    {
      this.autoSlideImages();
    }
  }

  // select image on indicator
  selectImage(index:number):void{
    this.selectedIndex=index;
    
  }

  onPrevClick():void{
    if(this.selectedIndex === 0)
    {this.selectedIndex= this.images.length-1}
    else{this.selectedIndex--;}

  }

  onNextClick():void{
    if(this.selectedIndex ===  this.images.length -1){this.selectedIndex = 0}
    else{this.selectedIndex++;}

  }

    autoSlideImages():void{
    setInterval(async()=>{await this.onNextClick();},this.slideInterval);
  }
}
