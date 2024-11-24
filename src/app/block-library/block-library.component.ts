import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-block-library',
  standalone: true,
  imports: [],
  templateUrl: './block-library.component.html',
  styleUrls: ['./block-library.component.css']
})
export class BlockLibraryComponent {
  // @ViewChild('libraryElement', { static: true }) libraryRef!: ElementRef<HTMLDivElement>;
  @ViewChild('libraryElement', { static: true }) canvasRef!: ElementRef<HTMLDivElement>;

  getNativeCanvas(): HTMLDivElement {
    return this.canvasRef.nativeElement;
  }

  isResizing = false; // Flag for tracking resizing
  startX = 0; // Starting mouse X position
  startWidth = 0; // Starting column width

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    const libraryElement = this.canvasRef.nativeElement;
    const rect = libraryElement.getBoundingClientRect();
    if (event.clientX > rect.right - 10) {
      this.isResizing = true;
      this.startX = event.clientX;
      this.startWidth = rect.width;
      event.preventDefault();
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isResizing) {
      const libraryElement = this.canvasRef.nativeElement;
      const deltaX = event.clientX - this.startX;
      let newWidth = this.startWidth + deltaX;
      newWidth = Math.max(200, Math.min(newWidth, window.innerWidth * 0.4));
      libraryElement.style.width = `${newWidth}px`;
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.isResizing = false;
  }
}
