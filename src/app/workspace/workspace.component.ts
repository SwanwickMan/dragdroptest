import {Component, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import { CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { BlockComponent } from '../block/block.component';
import {NgForOf} from '@angular/common';
import {BlockCollisionService} from '../block-collision-service/block-collision-service.component';


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

  test_number: number = 0;
  constructor(private blockCollisionService: BlockCollisionService) {
  }

  addBlock(): void {
    const componentRef= this.dynamicContainer.createComponent(BlockComponent);
    componentRef.instance.initialize('test ' + this.test_number++,'skyblue', 30, 30);
  }

  removeBlock(blockRef: ComponentRef<BlockComponent>): void {
    blockRef.destroy();
  }

  removeAllBlocks(){
    this.dynamicContainer.clear();
  }
}
