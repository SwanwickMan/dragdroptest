import {Component, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import { CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { BlockComponent } from '../block/block.component';
import {NgForOf} from '@angular/common';
import {Observable} from 'rxjs'; // Adjust path as necessary
import { BlockService } from '../block-service/block-service.component';


@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.css'],
    standalone: true,
  imports: [CdkDropList, BlockComponent, NgForOf] // Import necessary modules directly
})
export class WorkspaceComponent {
  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  dynamicContainer!: ViewContainerRef;

  blocksOnCanvas: ComponentRef<BlockComponent>[] = [];

  test_number: number = 0;
  constructor(private blockService: BlockService) {
  }

  addBlock(): void {
    const componentRef= this.dynamicContainer.createComponent(BlockComponent);
    componentRef.instance.initialize('test ' + this.test_number++,'skyblue', 30, 30);
    this.blocksOnCanvas.push(componentRef);
  }

  removeBlock(blockRef: ComponentRef<BlockComponent>): void {
    // remove from list then destroy instance
    const index = this.blocksOnCanvas.indexOf(blockRef);
    this.blocksOnCanvas.splice(index, 1);

    blockRef.destroy();
  }

  test_merge(): void {
    let lastBlock: ComponentRef<BlockComponent> | undefined;
    console.log("argh2")
    this.blocksOnCanvas.forEach((blockRef, index) => {
      if (lastBlock != undefined){
        lastBlock.instance.connectBlock(blockRef.instance);
        console.log("argh")
      }
      lastBlock = blockRef;
    });

    console.log("start thingy")
    let firstBlock: BlockComponent | null = this.blocksOnCanvas[2].instance;
    while(firstBlock != null){
      console.log(firstBlock.nextBlock);
      firstBlock = firstBlock.nextBlock;
    }
  }
}
