import {Injectable, OnInit} from '@angular/core';
import { BlockComponent } from '../block/block.component';
import { CanvasComponent } from '../canvas/canvas.component';
import {BlockService} from '../block-service/block-service.component';


@Injectable({
  providedIn: 'root'
})
export class BlockCollisionService{
  private blocks: BlockComponent[] = [];
  private canvas!: CanvasComponent;

  constructor(private blockService: BlockService) {
    this.blockService.blocks$.subscribe((instances) => {
      this.blocks = instances;
    });
  }

  setCanvas(canvas: CanvasComponent) {
    this.canvas = canvas;
  }

  getCollisionsForBlock(block:BlockComponent): BlockComponent[]{
    console.log("checking collisions for ", typeof block)
    const currentBlocks = this.blocks;
    console.log(currentBlocks);
    return currentBlocks.filter(otherBlock =>
      otherBlock !== block &&
      block.isOverlapping(otherBlock)
    );
  }

  isBlockOnCanvas(block:BlockComponent){
    const nativeCanvas  = this.canvas.getNativeCanvas()
    const canvasRect = nativeCanvas.getBoundingClientRect();
    let { x, y } = block.getCenter();

    return x >= canvasRect.left && x <= canvasRect.right
          && y >= canvasRect.top && y <= canvasRect.bottom;

  }

  allBlocksNotOnCanvas(): BlockComponent[]{
    return this.blocks.filter(block => !this.isBlockOnCanvas(block));
  }

}
