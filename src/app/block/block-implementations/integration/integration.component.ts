import { Component } from '@angular/core';
import { BlockComponent } from '../../block.component';
import {NgClass, NgStyle} from '@angular/common';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-integration',
  standalone: true,
    imports: [
        NgStyle,
        NgClass,
        FormsModule
    ],
  templateUrl: './integration.component.html',
  styleUrl: '../../block.component.css'
})
export class Integration extends BlockComponent{
  height: number = 80;
  width: number = 200;
  color: string = "brown";
  observation: string = "";
}
