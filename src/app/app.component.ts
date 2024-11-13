import { Component } from '@angular/core';
import { WorkspaceComponent } from './workspace/workspace.component'; // Adjust path as necessary

@Component({
    selector: 'app-root',
    template: '<app-workspace></app-workspace>', // Use the workspace component directly
    standalone: true,
    imports: [WorkspaceComponent] // Import the workspace component
})
export class AppComponent {}
