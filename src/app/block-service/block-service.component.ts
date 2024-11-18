// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { BlockComponent } from '../block/block.component'; // adjust the path to your Block interface

// @Injectable({
//   providedIn: 'root'
// })
// export class BlockService {
//   private readonly blocksOnCanvas$: BehaviorSubject<BlockComponent[]> = new BehaviorSubject<BlockComponent[]>([]);
//   readonly blocksOnCanvas: Observable<BlockComponent[]> = this.blocksOnCanvas$.asObservable();

//   addBlock(block: BlockComponent): void {
//     const currentBlocks = this.blocksOnCanvas$.getValue();
//     this.blocksOnCanvas$.next([...currentBlocks, block]);
//   }

// }
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlockServiceComponent {
  private blocks = [
    { id: 1, label: 'Block 1', color: 'red', x: 0, y: 0 },
    { id: 2, label: 'Block 2', color: 'green', x: 100, y: 0 }
  ];

  getBlocks() {
    return [...this.blocks];
  }

  addBlock(block: { id: number; label: string; color: string; x: number; y: number }) {
    this.blocks.push(block);
  }
}
