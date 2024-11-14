import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlockComponent } from '../block/block.component'; // adjust the path to your Block interface


@Injectable({
  providedIn: 'root'
})
export class BlockCollisionService {
  private blocksSubject = new BehaviorSubject<BlockComponent[]>([]);
  blocksOnCanvas$ = this.blocksSubject.asObservable();

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

}
