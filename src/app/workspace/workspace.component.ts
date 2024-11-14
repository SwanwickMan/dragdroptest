import {Component, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import { CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { BlockComponent } from '../block/block.component';
import {NgForOf} from '@angular/common';
import {BlockCollisionService} from '../block-collision-service/block-collision-service.component';
import {BasicFilteringComponent} from '../block/block-implementations/basic-filtering/basic-filtering.component';


@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.css'],
    standalone: true,
    imports: []
})
export class WorkspaceComponent {
  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  dynamicContainer!: ViewContainerRef;

  constructor(private blockCollisionService: BlockCollisionService) {
  }

  addBlock(): void {
    const componentRef= this.dynamicContainer.createComponent(BasicFilteringComponent);
    componentRef.instance.initialize('skyblue', 30, 30);
  }

  removeBlock(blockRef: ComponentRef<BlockComponent>): void {
    blockRef.destroy();
  }

  removeAllBlocks(){
    this.dynamicContainer.clear();
  }
}
