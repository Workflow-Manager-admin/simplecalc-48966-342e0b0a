import { Component } from '@angular/core';
import { CalcDisplayComponent } from './calc-display.component';
import { CalcKeypadComponent } from './calc-keypad.component';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalcDisplayComponent, CalcKeypadComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/** This is the container component, orchestrating the calculator layout and state. */
export class AppComponent {
  display: string = '0';
  private current = '';
  private lastInputType: 'operator' | 'number' | 'dot' | 'equals' | 'paren' | null = null;

  // PUBLIC_INTERFACE
  onKeypadPress(key: string) {
    if (key === 'C') {
      this.current = '';
      this.lastInputType = null;
      this.display = '0';
      return;
    }
    if (key === '=') {
      try {
        // Evaluate only safe arithmetic expressions
        // eslint-disable-next-line no-eval
        // Minor sanitization for blank/partial
        const clean = this.current.replace(/[^0-9+\-*/().]/g, '');
        // Don't allow leading operator except minus, don't eval empty
        if (/^[+\/*]/.test(clean) || clean === '') {
          this.display = 'Error';
        } else {
          // Double-eval to get rid of trailing operators
          const result = eval(clean);
          this.display = result.toString();
          this.current = result.toString();
        }
      } catch {
        this.display = 'Error';
        this.current = '';
      }
      this.lastInputType = 'equals';
      return;
    }
    // Append if valid
    if (/[0-9]/.test(key)) {
      if (this.lastInputType === 'equals') {
        this.current = key;
        this.display = this.current;
      } else {
        this.current += key;
        this.display = this.current;
      }
      this.lastInputType = 'number';
      return;
    }
    if (key === '.') {
      if (
        this.lastInputType !== 'dot' &&
        (this.lastInputType === 'number' || this.lastInputType === null || this.lastInputType === 'equals')
      ) {
        // Prevent multiple dots in a number (basic prevent)
        const lastChunk = this.current.split(/[\+\-\*\/\(\)]/g).pop() || '';
        if (!lastChunk.includes('.')) {
          this.current += key;
          this.display = this.current;
          this.lastInputType = 'dot';
        }
      }
      return;
    }
    if ('+-*/'.includes(key)) {
      if (this.current.length === 0 && key === '-') {
        // allow starting with minus
        this.current = '-';
        this.display = this.current;
        this.lastInputType = 'operator';
        return;
      }
      // Disallow double operator entry
      if (
        this.lastInputType === 'operator' ||
        this.lastInputType === null ||
        this.current === ''
      ) {
        return;
      }
      this.current += key;
      this.display = this.current;
      this.lastInputType = 'operator';
      return;
    }
    if (key === '(' || key === ')') {
      this.current += key;
      this.display = this.current;
      this.lastInputType = 'paren';
      return;
    }
  }
}
