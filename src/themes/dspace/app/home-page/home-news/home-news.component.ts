import { Component, Input } from '@angular/core';
import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';
// interface carouselImage{
//   imageSrc:string;
//   imageAlt:string;

// }
@Component({
  selector: 'ds-home-news',
  styleUrls: ['./home-news.component.scss'],
  templateUrl: './home-news.component.html'
})

/**
 * Component to render the news section on the home page
 */
export class HomeNewsComponent extends BaseComponent {

  images = [
  
    {
      imageSrc:'/assets/dspace/images/2.jpg',
      imageAlt: 'nature2',
    },
    // {
    //   imageSrc:'/assets/dspace/images/3.jpg',
    //   imageAlt: 'person1',
    // },
    // {
    //   imageSrc:'/assets/dspace/images/4.jpg',
    //   imageAlt: 'person2',
    // },
    {
      imageSrc:'/assets/dspace/images/5.jpg',
      imageAlt: 'person2',
    },
    {
      imageSrc:'/assets/dspace/images/6.jpg',
      imageAlt: 'person2',
    },
    // {
    //   imageSrc:'/assets/dspace/images/7.jpg',
    //   imageAlt: 'person2',
    // },
    {
      imageSrc:'/assets/dspace/images/8.webp',
      imageAlt: 'person2',
    },
  ];


  // @Input() images: carouselImage[]=[];
  selectedIndex =0;
@Input() indicator=true;
@Input() controls=true;
@Input() autoSlide=true;
@Input() slideInterval=3000;
  

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
    setInterval(()=>{ this.onNextClick();},this.slideInterval);
  }
}

