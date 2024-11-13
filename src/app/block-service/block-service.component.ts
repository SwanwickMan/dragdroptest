import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlockComponent } from '../block/block.component'; // adjust the path to your Block interface

@Injectable({
  providedIn: 'root'
})
export class BlockService {
  private readonly blocksOnCanvas$: BehaviorSubject<BlockComponent[]> = new BehaviorSubject<BlockComponent[]>([]);
  readonly blocksOnCanvas: Observable<BlockComponent[]> = this.blocksOnCanvas$.asObservable();

  addBlock(block: BlockComponent): void {
    const currentBlocks = this.blocksOnCanvas$.getValue();
    this.blocksOnCanvas$.next([...currentBlocks, block]);
  }

}
