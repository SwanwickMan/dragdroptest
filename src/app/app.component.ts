import { Component } from '@angular/core';
import { WorkspaceComponent } from './workspace/workspace.component'; // Adjust path as necessary

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html', // Use the workspace component directly
    styleUrl: 'app.component.css',
    standalone: true,
    imports: [WorkspaceComponent] // Import the workspace component
})
export class AppComponent {}
