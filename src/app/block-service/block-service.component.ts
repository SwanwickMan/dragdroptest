import {ComponentRef, Injectable, OnInit} from '@angular/core';
import { BlockComponent } from '../block/block.component';
import {BehaviorSubject, map} from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes it available throughout the app
})
export class BlockService{
  private blocks: ComponentRef<BlockComponent>[] = []; // Internal array of blocks
  private blocksSubject: BehaviorSubject<ComponentRef<BlockComponent>[]> = new BehaviorSubject<ComponentRef<BlockComponent>[]>(this.blocks);

  // Observable to get the list of block instances
  blocks$ = this.blocksSubject.asObservable().pipe(
    map((blockRefs) => blockRefs.map((blockRef) => blockRef.instance)) // Map to instances
  );


  addBlock(blockRef: ComponentRef<BlockComponent>): void {
    this.blocks.push(blockRef);
    this.blocksSubject.next(this.blocks); // Emit updated list
  }

  removeBlock(block: BlockComponent): void {
    const blockRef = this.blocks.find(blockRef => blockRef.instance === block);
    if (blockRef) {
      this.blocks = this.blocks.filter(blockRef => block !== blockRef.instance);
      this.blocksSubject.next(this.blocks); // Emit updated list
      blockRef.destroy();
    }
  }

  clearAllBlocks(){
    this.blocks.forEach(blockRef => {
      blockRef.destroy();
    });
    this.blocks = [];
  }
}
