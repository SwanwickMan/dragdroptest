import {Injectable, OnInit, ViewChild} from '@angular/core';
import { BlockComponent } from '../block/block.component';
import { CanvasComponent } from '../canvas/canvas.component';
import {BlockService} from '../block-service/block-service.component';
import {BlockLibraryComponent} from '../block-library/block-library.component';
import {OutputDisplayComponent} from '../output-display/output-display.component';


@Injectable({
  providedIn: 'root'
})
export class BlockCollisionService{
  private blocks: BlockComponent[] = [];
  private library!: BlockLibraryComponent;
  private canvas!: CanvasComponent;
  private outputDisplay!: OutputDisplayComponent;

  constructor(private blockService: BlockService) {
    this.blockService.blocks$.subscribe((instances) => {
      this.blocks = instances;
    });
  }

  setWorkspaceParts(library:BlockLibraryComponent, canvas: CanvasComponent, outputDisplay: OutputDisplayComponent) {
    this.library = library;
    this.canvas = canvas;
    this.outputDisplay = outputDisplay;
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

  private isBlockWithinComponent(block:BlockComponent, nativeCanvas: HTMLDivElement){
    const canvasRect = nativeCanvas.getBoundingClientRect();
    let { x, y } = block.getCenter();

    return x >= canvasRect.left && x <= canvasRect.right
          && y >= canvasRect.top && y <= canvasRect.bottom;

  }

  public isBlockOnCanvas(block:BlockComponent): boolean{
    return this.isBlockWithinComponent(block, this.canvas.getNativeCanvas());
  }

  public isBlockOnLibrary(block:BlockComponent): boolean{
    return this.isBlockWithinComponent(block, this.library.getNativeCanvas());
  }

  public isBlockOnOutput(block:BlockComponent): boolean{
    return this.isBlockWithinComponent(block, this.outputDisplay.getNativeCanvas());
  }

}
