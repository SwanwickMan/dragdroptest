import { Component } from '@angular/core';
import { CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { BlockComponent } from '../block/block.component';
import {NgForOf} from '@angular/common';
import {Observable} from 'rxjs'; // Adjust path as necessary
import { BlockService } from '../block-service/block-service.component';
import { Block } from '../block.interface';

interface Block {
    label: string;
    color: string;
}

@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.css'],
    standalone: true,
  imports: [CdkDropList, BlockComponent, NgForOf] // Import necessary modules directly
})
export class WorkspaceComponent {
  blocksOnCanvas$: Observable<Block[]>;
  constructor(private blockService: BlockService) {
    this.blocksOnCanvas$ = this.blockService.blocksOnCanvas;
  }

  addBlock(): void {
    const newBlock: Block = { id: Date.now(), label: 'basic',color: "skyblue", x: 0, y: 0 };
    this.blockService.addBlock(newBlock);
  }

  removeBlock(blockId: number): void {
    // this.blockService.removeBlock(blockId);
  }

  blocks = [
        { id: 1, label: 'Block 1', color: 'red', x: 0, y: 0 },
        { id: 2, label: 'Block 2', color: 'green', x: 100, y: 0 },
        { id: 3, label: 'Block 3', color: 'blue', x: 200, y: 0 }
    ];


}
