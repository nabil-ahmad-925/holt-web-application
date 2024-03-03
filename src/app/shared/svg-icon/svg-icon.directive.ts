import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { SvgIconService } from './svg-icon.service';
 

@Directive({
  selector: '[cygovSvgIcon]',
})
export class SvgIconDirective implements OnInit, OnChanges, OnDestroy {
  @Input() svgName: string;
  @Input() stopPropagation: boolean;
  @Input() svgUrl = '';

  constructor(private element: ElementRef, private svgIconService: SvgIconService) {}

  ngOnInit(): void {
    if (this.stopPropagation) {
      this.element.nativeElement.addEventListener('click', event => {
        event.stopPropagation();
      });
    }
  }

  ngOnDestroy(): void {
    this.element.nativeElement.removeEventListener('click', () => {});
  }

  ngOnChanges(changes: SimpleChanges): void {
    debugger
    const currentValue: string = changes?.['svgName']?.currentValue;
    console.log("In svg -===============+>")
        if (this.svgUrl) {
      this.svgIconService.baseUrl = this.svgUrl;
    }
    this.handleSvgCall(currentValue);
  }

  private async handleSvgCall(currentValue: string): Promise<void> {
    try {
      // result = svg object
      this.element.nativeElement.innerHTML = await this.svgIconService.getSvgByName(currentValue);
    } catch (e) {
     console.log("This is logger ===> ")
    }
  }
}
