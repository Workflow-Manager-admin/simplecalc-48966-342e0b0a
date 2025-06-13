import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calc-display',
  standalone: true,
  template: `
    <div class="calc-display">
      {{ display }}
    </div>
  `,
  styleUrls: ['./calc-display.component.css']
})
export class CalcDisplayComponent {
  @Input() display: string = '0';
}
