import {Component, Input, HostListener, OnInit, OnDestroy, ElementRef, ComponentRef} from '@angular/core';
import {NgStyle} from '@angular/common';
import {BlockCollisionService} from '../block-collision-service/block-collision-service.component';
import { FormsModule } from '@angular/forms';
import {Block} from '@angular/compiler';

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
  protected isViewOnly: boolean = false;

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
    private blockCollisionService: BlockCollisionService,
    ) {}

  public setViewOnly(){
    this.isViewOnly = true;
    this.blockCollisionService.removeBlock(this);
  }

  ngOnInit() {
    this.blockCollisionService.addBlock(this);
  }

  ngOnDestroy() {
    this.blockCollisionService.removeBlock(this);
  }

  initialize(x: number, y: number) {
    this.isDragging = true;
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

  isOverlapping(otherBlock: BlockComponent): boolean {
  return this.x + this.width > otherBlock.x &&
         this.x < otherBlock.x + otherBlock.width &&
         this.y + this.height > otherBlock.y &&
         this.y < otherBlock.y + otherBlock.height;
  }

  private measureDistance(otherBlock: BlockComponent): number {
    const dx = otherBlock.x - this.x;
    const dy = otherBlock.y - this.y;
    return Math.sqrt(dx**2 + dy**2);
  }

  getCenter():{x:number, y:number}{
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    return { x: centerX, y: centerY };
  }

  private checkCollisions(): BlockComponent | null {
    const collisions = this.blockCollisionService.getCollisionsForBlock(this);
    if (collisions.length > 0) {
      let minDistance = Infinity;
      let closestBlock: BlockComponent | null = null;
      for (const block of collisions) {
        const distance = this.measureDistance(block);
        if (distance < minDistance) {
          minDistance = distance
          closestBlock = block;
        }
      }
      return closestBlock;
    }
    return null;
  }

  private connect(block: BlockComponent) {
    block.previousBlock = this;
    this.nextBlock = block;
  }

  insertUnderneath(block: BlockComponent) {
    let nextBlock= block.nextBlock;

    block.connect(this);
    if (nextBlock) {
      let bottomBlock = this.nextBlock || this
      while(bottomBlock.nextBlock != null) bottomBlock = bottomBlock.nextBlock;
      bottomBlock.connect(nextBlock);
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




  // below all handles moving blocks with mouse and touchscreen needs overhaul

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (!this.isViewOnly) {
      this.isDragging = true;
      this.startX = event.clientX - this.x;
      this.startY = event.clientY - this.y;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging && !this.isViewOnly) {
      console.log(this.blockCollisionService.isBlockOnCanvas(this));
      this.disconnectBlockAbove()
      this.move(event.clientX - this.startX, event.clientY - this.startY)
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if(this.isDragging && !this.isViewOnly){
      if (this.blockCollisionService.isBlockOnCanvas(this)) {
        let touching_block: BlockComponent | null = this.checkCollisions();
        if (touching_block) {
          this.insertUnderneath(touching_block);
        }
      }
    }
    this.isDragging = false;
  }

  // touch screen stuff
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    // Prevent default to avoid unwanted scrolling or zooming during drag
    event.preventDefault();
    this.isDragging = true;
    this.startX = event.touches[0].clientX - this.x;
    this.startY = event.touches[0].clientY - this.y;
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.isDragging) {
      event.preventDefault(); // Prevents the page from scrolling during the drag
      this.disconnectBlockAbove();
      this.move(event.touches[0].clientX - this.startX, event.touches[0].clientY - this.startY);
    }
  }

  @HostListener('document:touchend')
  onTouchEnd() {
    if (this.isDragging) {
      let touching_block: BlockComponent | null = this.checkCollisions();
      if (touching_block) {
        this.insertUnderneath(touching_block);
      }
    }
    this.isDragging = false;
  }

}
