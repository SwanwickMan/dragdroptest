import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-block-library',
  standalone: true,
  imports: [],
  templateUrl: './block-library.component.html',
  styleUrl: './block-library.component.css'
})
export class BlockLibraryComponent {
  @ViewChild('libraryElement', { static: true }) canvasRef!: ElementRef<HTMLDivElement>;

  getNativeCanvas(): HTMLDivElement {
    return this.canvasRef.nativeElement;
  }
}
