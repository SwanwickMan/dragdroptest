import {Component, Input, HostListener, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {NgStyle} from '@angular/common';
import {BlockCollisionService} from '../block-collision-service/block-collision-service.component';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css'],
  standalone: true,
  imports: [
    NgStyle
  ],
})
export class BlockComponent implements OnInit, OnDestroy {
  label: string = '';
  color: string = 'skyblue';
  x: number = 0; // Current X position
  y: number = 0; // Current Y position
  width: number = 100;
  height: number = 60;

  private isDragging = false;
  private startX = 0;
  private startY = 0;

  public previousBlock: BlockComponent | null = null;
  public nextBlock: BlockComponent | null = null;

  constructor(
    private el: ElementRef,
    private blockCollisionService: BlockCollisionService
  ) {}

  ngOnInit() {
    this.blockCollisionService.addBlock(this);
  }

  ngOnDestroy() {
    this.blockCollisionService.removeBlock(this);
  }

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
      this.nextBlock.move(x, y+this.height); // Adjust y position for each block below
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
      this.disconnectBlockAbove()
      this.move(event.clientX - this.startX, event.clientY - this.startY)
    }
  }

  // Mouse up event to stop dragging
  @HostListener('document:mouseup')
  onMouseUp() {
    if(this.isDragging){
      let touching_block:BlockComponent | null = this.checkCollisions();
      if (touching_block) {touching_block.connectUnderneath(this);}
    }
    this.isDragging = false;
  }


  isOverlapping(otherBlock: BlockComponent): boolean {
  return this.x + this.width > otherBlock.x &&
         this.x < otherBlock.x + otherBlock.width &&
         this.y + this.height > otherBlock.y &&
         this.y < otherBlock.y + otherBlock.height;
}

  checkCollisions(): BlockComponent | null {
    const collisions = this.blockCollisionService.getCollisionsForBlock(this);
    if (collisions.length > 0) {
      // currently selects random block of all it collides with fix later
      return collisions[0];
    }
    return null;
  }

  connectUnderneath(block: BlockComponent) {
    block.previousBlock = this;
    this.nextBlock = block;

    this.updateChildXYPositions()
  }

  updateChildXYPositions(){
    let block = this.nextBlock;
    if (block) {
      block.startX = this.startX;
      block.startY = this.startY + this.height;

      block.x = this.x;
      block.y = this.y + this.height;

      block.updateChildXYPositions()
    }
  }

  disconnectBlockAbove(){
    if (this.previousBlock != null){
      this.previousBlock.nextBlock = null;
      this.previousBlock = null;
    }
  }

}
