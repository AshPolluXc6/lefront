import { NgClass } from '@angular/common';
import { Component, Input, output } from '@angular/core';

@Component({
    selector: 'lib-frame',
    imports: [NgClass],
    templateUrl: './frame.component.html',
    styleUrl: './frame.component.scss'
})
export class FrameComponent {
  @Input()
  public variant: 'primary' | 'secundary' = 'primary';  

}
