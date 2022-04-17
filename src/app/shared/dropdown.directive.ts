import { Directive, OnInit, HostListener, ElementRef} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{
  
  constructor(private elementRef: ElementRef){}
  ngOnInit(): void {}

 @HostListener('document:click',['$event']) toggleOpen(event: Event){
  if(!this.elementRef.nativeElement.contains(event.target)){
     this.elementRef.nativeElement.lastElementChild.classList.add('hidden') 
  }else{
   this.elementRef.nativeElement.lastElementChild.classList.toggle('hidden')
   }
 }

  }