// import { Component, Input, HostListener } from '@angular/core';
// import {NgStyle} from '@angular/common';

// @Component({
//   selector: 'app-block',
//   template: `
//     <div
//       class="block"
//       [ngStyle]="{
//         transform: 'translate(' + x + 'px, ' + y + 'px)'
//       }"
//     >
//       Block {{ id }}
//     </div>
//   `,
//   standalone: true,
//   imports: [
//     NgStyle
//   ],
//   styleUrls: ['./block.component.css']
// })
// export class BlockComponent {
//   @Input() id: number = 0;
//   @Input() label: string = '';
//   @Input() color: string = 'skyblue';
//   @Input() x: number = 0; // Current X position
//   @Input() y: number = 0; // Current Y position

//   private isDragging = false;
//   private startX = 0;
//   private startY = 0;
//   public nextBlock: BlockComponent | null = null;

//   constructor() {

//   }

//   move(x: number, y: number) {
//     this.x = x;
//     this.y = y;
//     // If there are connected blocks, move them as well
//     if (this.nextBlock) {
//       this.nextBlock.move(x, y + 1); // Adjust y position for each block below
//     }
//   }

//   // Mouse down event to initiate dragging
//   @HostListener('mousedown', ['$event'])
//   onMouseDown(event: MouseEvent) {
//     this.isDragging = true;
//     this.startX = event.clientX - this.x;
//     this.startY = event.clientY - this.y;
//     event.preventDefault(); // Prevents text selection
//   }

//   // Mouse move event to handle dragging
//   @HostListener('document:mousemove', ['$event'])
//   onMouseMove(event: MouseEvent) {
//     if (this.isDragging) {
//       this.move(event.clientX - this.startX, event.clientY - this.startY)
//     }
//   }

//   // Mouse up event to stop dragging
//   @HostListener('document:mouseup')
//   onMouseUp() {
//     this.isDragging = false;
//   }

//   connectBlock(block: BlockComponent) {
//     this.nextBlock = block;
//   }
// }
import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-block',
  template: `
    <div
      class="block"
      [ngStyle]="{
        transform: 'translate(' + x + 'px, ' + y + 'px)',
        backgroundColor: color
      }"
    >
      {{ label }}
    </div>
  `,
  styles: [`
    .block {
      position: absolute;
      width: 100px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid black;
      cursor: move;
    }
  `]
})
export class BlockComponent {
  @Input() id!: number;
  @Input() label!: string;
  @Input() color: string = 'lightgray';
  @Input() x: number = 0;
  @Input() y: number = 0;

  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.offsetX = event.clientX - this.x;
    this.offsetY = event.clientY - this.y;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.x = event.clientX - this.offsetX;
      this.y = event.clientY - this.offsetY;
    }
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isDragging = false;
  }
}
