import {Component, ComponentRef, Type, ViewChild, ViewContainerRef} from '@angular/core';
import { CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { BlockComponent } from '../block/block.component';
import {NgForOf} from '@angular/common';
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

  addBlock(childType: Type<BlockComponent>): void {
    const componentRef= this.dynamicContainer.createComponent(childType);
    componentRef.instance.initialize(30, 30);
  }

  removeBlock(blockRef: ComponentRef<BlockComponent>): void {
    blockRef.destroy();
  }

  removeAllBlocks(){
    this.dynamicContainer.clear();
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
