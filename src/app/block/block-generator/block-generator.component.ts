import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  HostListener,
  Injector,
  Input,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BlockComponent} from '../block.component';
import {WorkspaceComponent} from '../../workspace/workspace.component';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-block-generator',
  standalone: true,
  templateUrl: './block-generator.component.html',
  styleUrls: ['./block-generator.component.css'],
  imports: [
    NgStyle
  ]
})
export class BlockGeneratorComponent {
  @ViewChild('blockContainer', { read: ViewContainerRef, static: true }) blockContainer!: ViewContainerRef;
  private componentRef!: ComponentRef<BlockComponent>;

  public width: number = 0;
  public height: number = 0;

  @Input() workspace!: WorkspaceComponent;
  @Input() set blockType(blockType: Type<BlockComponent>) {
    if (this.blockContainer) {
      this.blockContainer.clear();
      this.componentRef = this.blockContainer.createComponent(blockType);
      this.componentRef.instance.setViewOnly();

      this.width = this.componentRef.instance.width;
      this.height = this.componentRef.instance.height;
    }
  }

  @HostListener('mousedown', ['$event'])
  onClick(event: MouseEvent){
    const x = event.clientX
    const y = event.clientY

    this.workspace.addBlock(this.componentRef.componentType, x, y);
    console.log(this.componentRef.componentType.name);
  }


}
