import { Component, Input, HostListener } from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css'],
  standalone: true,
  imports: [
    NgStyle
  ],
})
export class BlockComponent {
  label: string = '';
  color: string = 'skyblue';
  x: number = 0; // Current X position
  y: number = 0; // Current Y position

  private isDragging = false;
  private startX = 0;
  private startY = 0;

  public nextBlock: BlockComponent | null = null;

  initialize(label: string, color: string, x: number, y: number) {
    this.label = label;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  move(x: number, y: number) {
    this.x = x;
    this.y = y;
    // If there are connected blocks, move them as well
    if (this.nextBlock) {
      this.nextBlock.move(x, y - 1); // Adjust y position for each block below
    }
  }

  // Mouse down event to initiate dragging
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX - this.x;
    this.startY = event.clientY - this.y;
    event.preventDefault(); // Prevents text selection
  }

  // Mouse move event to handle dragging
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.move(event.clientX - this.startX, event.clientY - this.startY)
    }
  }

  // Mouse up event to stop dragging
  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  connectBlock(block: BlockComponent) {
    this.nextBlock = block;
  }

}
