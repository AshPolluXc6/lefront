import { Component, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
@Input()
public variant: 'primary' | 'secondary' = 'primary';

@Input()
public size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
}
