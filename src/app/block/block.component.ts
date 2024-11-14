import {Component, Input, HostListener, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {NgStyle} from '@angular/common';
import {BlockCollisionService} from '../block-collision-service/block-collision-service.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css'],
  standalone: true,
  imports: [
    NgStyle,
    FormsModule
  ],
})
export abstract class BlockComponent implements OnInit, OnDestroy {
  abstract color: string;
  abstract width: number;
  abstract height: number;

  x: number = 0; // Current X position
  y: number = 0; // Current Y position

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

  initialize(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  private move(x: number, y: number) {
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
      if (touching_block) { this.insertUnderneath(touching_block); }
    }
    this.isDragging = false;
  }


  isOverlapping(otherBlock: BlockComponent): boolean {
  return this.x + this.width > otherBlock.x &&
         this.x < otherBlock.x + otherBlock.width &&
         this.y + this.height > otherBlock.y &&
         this.y < otherBlock.y + otherBlock.height;
}

  private checkCollisions(): BlockComponent | null {
    const collisions = this.blockCollisionService.getCollisionsForBlock(this);
    if (collisions.length > 0) {
      // currently selects random block of all it collides with fix later
      return collisions[0];
    }
    return null;
  }

  private connect(block: BlockComponent) {
    block.previousBlock = this;
    this.nextBlock = block;
  }

  insertUnderneath(block: BlockComponent) {
    const nextBlock= block.nextBlock;

    block.connect(this);
    if (nextBlock) {
      this.connect(nextBlock);
    }

    block.updateChildXYPositions();
  }

  private updateChildXYPositions(){
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
