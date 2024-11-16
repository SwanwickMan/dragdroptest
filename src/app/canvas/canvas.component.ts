import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent {
  @ViewChild('canvasElement', { static: true }) canvasRef!: ElementRef<HTMLDivElement>;

  width:number = 400;
  height:number = 400;

  getNativeCanvas(): HTMLDivElement {
    return this.canvasRef.nativeElement;
  }
}
