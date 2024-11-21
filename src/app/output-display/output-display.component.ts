import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-output-display',
  standalone: true,
  imports: [],
  templateUrl: './output-display.component.html',
  styleUrl: './output-display.component.css'
})
export class OutputDisplayComponent {
  @ViewChild('outputDisplayElement', { static: true }) canvasRef!: ElementRef<HTMLDivElement>;

  public getNativeCanvas(): HTMLDivElement {
    return this.canvasRef.nativeElement;
  }
}
