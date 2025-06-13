import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calc-keypad',
  standalone: true,
  templateUrl: './calc-keypad.component.html',
  styleUrls: ['./calc-keypad.component.css']
})
export class CalcKeypadComponent {
  @Output() buttonPress = new EventEmitter<string>();

  // PUBLIC_INTERFACE
  onButton(value: string) {
    this.buttonPress.emit(value);
  }

  keys: { value: string, style?: string }[][] = [
    [
      { value: 'C', style: 'secondary' },
      { value: '(', style: 'accent' },
      { value: ')', style: 'accent' },
      { value: '/', style: 'accent' }
    ],
    [
      { value: '7' }, { value: '8' }, { value: '9' }, { value: '*', style: 'accent' }
    ],
    [
      { value: '4' }, { value: '5' }, { value: '6' }, { value: '-', style: 'accent' }
    ],
    [
      { value: '1' }, { value: '2' }, { value: '3' }, { value: '+', style: 'accent' }
    ],
    [
      { value: '0', style: 'wide' }, { value: '.', style: 'accent' }, { value: '=', style: 'primary' }
    ]
  ];
}
