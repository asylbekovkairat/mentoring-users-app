// eslint-disable-next-line @nx/enforce-module-boundaries
import { MaterialsCreateButtonComponent } from './../../../../feature-materials-create/src/lib/materials-create-button/materials-create-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LetDirective } from '@ngrx/component';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFacade } from '@users/materials/data-access';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    MatProgressBarModule,
    MaterialsListComponent,
    MatIconModule,
    MatButtonModule,
    MaterialsCreateButtonComponent,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent implements OnInit {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router);

  public readonly materials$ = this.materialsFacade.allMaterials$;
  public readonly status$ = this.materialsFacade.status$;
  public readonly error$ = this.materialsFacade.error$;

  public folderTitle!: string;

  ngOnInit(): void {
    this.materialsFacade.load();

    const state = window.history.state;
    if (state && state.folderTitle) {
      this.folderTitle = state.folderTitle;
    }
  }

  public backOnFolders() {
    this.router.navigate([`/materials`]);
  }

  public deleteMaterial(folderId: number): void {
    this.materialsFacade.delete(folderId);
  }
}
