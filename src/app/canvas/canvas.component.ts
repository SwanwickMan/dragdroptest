import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NgStyle} from '@angular/common';
import {BlockService} from '../block-service/block-service.component';
import {BlockComponent} from '../block/block.component';

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css'
})
export class CanvasComponent implements OnInit{
  @ViewChild('canvasElement', { static: true }) canvasRef!: ElementRef<HTMLDivElement>;
  private blocks: BlockComponent[] = [];

  width: number = 10000;
  height: number = 10000;

  isDragging: boolean = false;
  isViewOnly: boolean = false;

  startX: number = 0;
  startY: number =0;
  x: number = -this.width/2;
  y: number = -this.height/2;

  constructor(private blockService: BlockService) {}

  ngOnInit(): void {
    this.blockService.blocks$.subscribe((instances) => {
      this.blocks = instances;
    });
  }


  // below all handles moving blocks with mouse and touchscreen needs overhaul

  private move(x: number, y: number) {
    const oldX = this.x;
    const oldY = this.y;

    this.x = x;
    this.y = y;

    this.blocks.forEach(block =>{
      const deltaX = x - oldX;
      const deltaY = y - oldY;
      block.relative_move(deltaX,deltaY)
    });
  }

  public centerCanvas(){
    // this.x=-this.width/2;
    // this.y=-this.height/2;
    this.move(-this.width/2, -this.height/2)
  }

  onPressDown(x:number,y:number){
    if (!this.isViewOnly) {
      this.isDragging = true;
      this.startX = x - this.x;
      this.startY = y - this.y;
    }
  }

  onPressMove(x:number,y:number) {
    if (this.isDragging && !this.isViewOnly) {
      this.move(x- this.startX, y - this.startY)
    }
  }

  onPressRelease() {
    this.isDragging = false;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.onPressDown(event.clientX, event.clientY);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.onPressMove(event.clientX, event.clientY);
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.onPressRelease();
  }

  // touch screen stuff
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.onPressDown(event.touches[0].clientX, event.touches[0].clientY);
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    this.onPressMove(event.touches[0].clientX, event.touches[0].clientY);
  }

  @HostListener('document:touchend')
  onTouchEnd() {
    this.onPressRelease();
  }



  public getNativeCanvas(): HTMLDivElement {
    return this.canvasRef.nativeElement;
  }
}
