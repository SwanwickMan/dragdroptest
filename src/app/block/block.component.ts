import {Component, Input, HostListener, OnInit, OnDestroy, ElementRef, ComponentRef} from '@angular/core';
import {NgStyle} from '@angular/common';
import {BlockCollisionService} from '../block-collision-service/block-collision-service.component';
import { FormsModule } from '@angular/forms';
import {BlockService} from '../block-service/block-service.component';

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
export abstract class BlockComponent {
  protected isViewOnly: boolean = false;

  abstract color: string;
  abstract width: number;
  abstract height: number;

  protected x: number = 0; // Current X position
  protected y: number = 0; // Current Y position

  protected isDragging = false;
  private startX = 0;
  private startY = 0;

  private previousBlock: BlockComponent | null = null;
  private nextBlock: BlockComponent | null = null;

  constructor(
    private blockCollisionService: BlockCollisionService,
    private blockService: BlockService,
    ) {}

  public setViewOnly(){
    this.isViewOnly = true;
  }

  private destroy(){
    this.nextBlock?.destroy();
    this.blockService.removeBlock(this);
  }

  private toggleGlow(apply: boolean) {
    const action = apply ? 'add' : 'remove';

    const toggleRecursive = (block: BlockComponent | null) => {
      if (block) {
        const element = document.querySelector(`[data-id='${block.constructor.name}']`);
        if (element) {
          element.classList[action]('glow');
        }
        toggleRecursive(block.nextBlock); // Recursively toggle for child blocks
      }
    };

    toggleRecursive(this); // starts with current block
  }

  public initialize(x: number, y: number, scrollX: number, scrollY: number) {
    this.isDragging = true;
    this.x = x + scrollX;
    this.y = y + scrollY;
    this.startX = -scrollX;
    this.startY = -scrollY;
  }

  public getExecutionStuff(): string{
    return this.constructor.name + "\n" + (this.nextBlock ? this.nextBlock.getExecutionStuff() : "");
  }

  private move(x: number, y: number) {
    this.x = x;
    this.y = y;
    // If there are connected blocks, move them as well
    if (this.nextBlock) {
      this.nextBlock.move(x, y+this.height); // Adjust y position for each block below
    }
  }

  public relative_move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  public isOverlapping(otherBlock: BlockComponent): boolean {
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

  public getCenter():{x:number, y:number}{
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;
    return { x: centerX, y: centerY };
  }

  public centerCorrectCoords(){
    this.x = this.x - this.width / 2;
    this.y = this.y - this.height / 2;
    this.startX += this.width / 2;
    this.startY += this.height / 2;
  }

  private checkCollisions(): BlockComponent | null {
    const collisions = this.blockCollisionService.getCollisionsForBlock(this);
    console.log(collisions)
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

  private isBlockPositionIsValid():boolean{
    return (this.blockCollisionService.isBlockOnCanvas(this) && this.blockCollisionService.isBlockOnWorkspace(this)) &&
      !(this.blockCollisionService.isBlockOnLibrary(this) || this.blockCollisionService.isBlockOnOutput(this))
  }

  private connect(block: BlockComponent) {
    block.previousBlock = this;
    this.nextBlock = block;
  }

  public insertUnderneath(block: BlockComponent) {
    const nextBlock= block.nextBlock;

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


  public disconnectBlockAbove(){
    if (this.previousBlock != null){
      this.previousBlock.nextBlock = null;
      this.previousBlock = null;
    }
  }


  // below all handles moving blocks with mouse and touchscreen needs overhaul
  // private onPressDown(x:number,y:number){
  //   if (!this.isViewOnly) {
  //     this.isDragging = true;
  //     this.startX = x - this.x;
  //     this.startY = y - this.y;
  //   }
  // }
  private onPressDown(x: number, y: number) {
    if (!this.isViewOnly) {
      this.isDragging = true;
      this.startX = x - this.x;
      this.startY = y - this.y;
      this.toggleGlow(true); // Add the glow effect
    }
  }

  private onPressMove(x:number,y:number) {
    if (this.isDragging && !this.isViewOnly) {
      console.log(this.blockCollisionService.isBlockOnCanvas(this));
      this.disconnectBlockAbove()
      this.move(x- this.startX, y - this.startY)
    }
  }

  private onPressRelease() {
    if(this.isDragging && !this.isViewOnly){
      if (this.isBlockPositionIsValid()) {
        let touching_block: BlockComponent | null = this.checkCollisions();
        if (touching_block) {
          this.insertUnderneath(touching_block);
        }
      }
      else{
        // call destroy self if block is at invalid position
        this.destroy();
      }
    }
    this.toggleGlow(false);
    this.isDragging = false;
  }

  @HostListener('mousedown', ['$event'])
  private onMouseDown(event: MouseEvent) {
    this.onPressDown(event.clientX, event.clientY);
  }

  @HostListener('document:mousemove', ['$event'])
  private onMouseMove(event: MouseEvent) {
    this.onPressMove(event.clientX, event.clientY);
  }

  @HostListener('document:mouseup')
  private onMouseUp() {
    this.onPressRelease();
  }

  // touch screen stuff
  @HostListener('touchstart', ['$event'])
  private onTouchStart(event: TouchEvent) {
    this.onPressDown(event.touches[0].clientX, event.touches[0].clientY);
  }

  @HostListener('document:touchmove', ['$event'])
  private onTouchMove(event: TouchEvent) {
    this.onPressMove(event.touches[0].clientX, event.touches[0].clientY);
  }

  @HostListener('document:touchend')
  private onTouchEnd() {
    this.onPressRelease();
  }

}
