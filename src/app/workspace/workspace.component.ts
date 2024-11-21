import {AfterViewInit, Component, ComponentRef, HostListener, Type, ViewChild, ViewContainerRef} from '@angular/core';
import { BlockComponent } from '../block/block.component';
import {BlockCollisionService} from '../block-collision-service/block-collision-service.component';
import {BasicFilteringComponent} from '../block/block-implementations/basic-filtering/basic-filtering.component';
import {QualityControlPlots} from '../block/block-implementations/quality-control-plots/quality-control-plots.component';
import {Integration} from '../block/block-implementations/integration/integration.component';
import {LoadData} from '../block/block-implementations/load-data/load-data.component';
import {
  PlotDimensionReduction
} from '../block/block-implementations/plot-dimension-reduction/plot-dimension-reduction.component';
import {
  QualityControlsFiltering
} from '../block/block-implementations/quality-controls-filtering/quality-controls-filtering.component';
import {RunUmap} from '../block/block-implementations/run-umap/run-umap.component';
import {
  PrincipleComponentAnalysis
} from '../block/block-implementations/principle-component-analysis/principle-component-analysis.component';
import {
  IdentifyHighlyVariableGenes
} from '../block/block-implementations/identify-highly-variable-genes/identify-highly-variable-genes.component';
import {BlockLibraryComponent} from '../block-library/block-library.component';
import {CanvasComponent} from '../canvas/canvas.component';
import {BlockGeneratorComponent} from '../block/block-generator/block-generator.component';
import {OutputDisplayComponent} from '../output-display/output-display.component';
import {BlockService} from '../block-service/block-service.component';


@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.css'],
    standalone: true,
  imports: [
    BlockLibraryComponent,
    CanvasComponent,
    BlockGeneratorComponent,
    OutputDisplayComponent,
  ]
})
export class WorkspaceComponent implements AfterViewInit{
  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  dynamicContainer!: ViewContainerRef;
  @ViewChild(CanvasComponent)
  canvas!: CanvasComponent;

  instanceToRef: Map<BlockComponent, ComponentRef<BlockComponent>> = new Map();


  constructor(private blockService: BlockService, private blockCollisionService: BlockCollisionService) {}

  ngAfterViewInit() {
    this.blockCollisionService.setCanvas(this.canvas);
  }

  addBlock(childType: Type<BlockComponent>, x: number, y: number): void {
    const componentRef = this.dynamicContainer.createComponent(childType);
    componentRef.instance.initialize(x, y);
    componentRef.instance.centerCorrectCoords();
    this.blockService.addBlock(componentRef);
    this.instanceToRef.set(componentRef.instance, componentRef);
  }

  removeBlock(blockRef: ComponentRef<BlockComponent> | undefined): void {
    this.blockService.removeBlock(blockRef!.instance);
  }

  removeAllBlocks(){
    this.blockService.clearAllBlocks();
  }

  executeBlocks(){
    for (let [blockComponent, componentRef] of this.instanceToRef.entries()) {
      if(blockComponent instanceof LoadData) {
        console.log(blockComponent.getExecutionStuff());
        return;
      }
}
  }

  @HostListener('document:mouseup')
  @HostListener('document:touchend')
  removeBlocksOffCanvas(){
    let removeList = this.blockCollisionService.allBlocksNotOnCanvas();
    removeList.forEach(block => {
      this.removeBlock(this.instanceToRef.get(block));
    });
  }

  centerCanvas(){
    this.canvas.centerCanvas();
  }

  protected readonly BasicFilteringComponent = BasicFilteringComponent;
  protected readonly QualityControlPlots = QualityControlPlots;
  protected readonly Integration = Integration;
  protected readonly LoadData = LoadData;
  protected readonly PlotDimensionReduction = PlotDimensionReduction;
  protected readonly QualityControlsFiltering = QualityControlsFiltering;
  protected readonly RunUmap = RunUmap;
  protected readonly PrincipleComponentAnalysis = PrincipleComponentAnalysis;
  protected readonly IdentifyHighlyVariableGenes = IdentifyHighlyVariableGenes;
}
