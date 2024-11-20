import {ComponentRef, Injectable, OnInit} from '@angular/core';
import { BlockComponent } from '../block/block.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes it available throughout the app
})
export class BlockService{
  private blocks: ComponentRef<BlockComponent>[] = []; // Internal array of blocks
  private blocksSubject: BehaviorSubject<ComponentRef<BlockComponent>[]> = new BehaviorSubject<ComponentRef<BlockComponent>[]>(this.blocks);

  // Observable to get the list of blocks
  blocks$ = this.blocksSubject.asObservable();

  constructor() {}


  // Add a new block
  addBlock(blockRef: ComponentRef<BlockComponent>): void {
    this.blocks.push(blockRef);
    this.blocksSubject.next(this.blocks); // Emit updated list
  }

  // Remove a block by id
  removeBlock(block: BlockComponent): void {
    const blockRef = this.blocks.find(blockRef => blockRef.instance === block);
    if (blockRef) {
      this.blocks = this.blocks.filter(blockRef => block !== blockRef.instance);
      this.blocksSubject.next(this.blocks); // Emit updated list
      blockRef.destroy();
    }
  }

  // Get the current list of blocks
  getBlocks(): BlockComponent[] {
    return this.blocks.map(blockRef => blockRef.instance);
  }

}
