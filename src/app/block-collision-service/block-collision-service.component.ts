import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlockComponent } from '../block/block.component';
import { CanvasComponent } from '../canvas/canvas.component';

@Injectable({
  providedIn: 'root'
})
export class BlockCollisionService {
  private blocksSubject = new BehaviorSubject<BlockComponent[]>([]);
  blocksOnCanvas$ = this.blocksSubject.asObservable();
  private canvas!: CanvasComponent;

  setCanvas(canvas: CanvasComponent) {
    this.canvas = canvas;
  }

  addBlock(block: BlockComponent) {
    console.log("added ", typeof block)
    const currentBlocks = this.blocksSubject.getValue();
    this.blocksSubject.next([...currentBlocks, block]);
  }

  removeBlock(block: BlockComponent) {
    console.log("removed ", typeof block)
    const currentBlocks = this.blocksSubject.getValue().filter(b => b !== block);
    this.blocksSubject.next(currentBlocks);
  }

  getCollisionsForBlock(block:BlockComponent): BlockComponent[]{
    console.log("checking collisions for ", typeof block)
    const currentBlocks = this.blocksSubject.getValue();

    return currentBlocks.filter(otherBlock =>
      otherBlock !== block &&
      block.isOverlapping(otherBlock)
    );
  }

  isBlockOnCanvas(block:BlockComponent){
    const nativeCanvas  = this.canvas.getNativeCanvas()
    const canvasRect = nativeCanvas.getBoundingClientRect();
    let { x, y } = block.getCenter();

    return x >= canvasRect.left && x <= canvasRect.right;

  }

  allBlocksNotOnCanvas(): BlockComponent[]{
    return this.blocksSubject.getValue().filter(block => !this.isBlockOnCanvas(block));
  }

}
