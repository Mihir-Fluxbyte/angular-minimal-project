import { Component } from '@angular/core';

@Component({
  selector: 'app-dnd',
  template: ` <div class="flex flex-col gap-2 h-full">
    <div>
      <ul class="flex">
        <li
          *ngFor="let link of links"
          [routerLink]="link.path"
          routerLinkActive="active-link"
          class="px-2 py-1.5 cursor-pointer text-gray-600 [&:not[.active-link]]hover:bg-gray-200 [&:not[.active-link]]:hover:text-gray-900 active-link:bg-gray-100 active-link:text-gray-800"
        >
          {{ link.label }}
        </li>
      </ul>
    </div>
    <div class="grow overflow-auto">
      <router-outlet />
    </div>
  </div>`,
  styles: [``],
})
export class DndComponent {
  links: Array<{ path: string; label: string }> = [
    {
      path: 'basic-drag-and-drop',
      label: 'Basic-Drag-And-Drop',
    },
    {
      path: 'reordering-lists',
      label: 'Reordering-List',
    },
    {
      path: 'transferring-items-between-lists',
      label: 'Transferring-Items-Between-Lists',
    },
    {
      path: 'drag-handle',
      label: 'Drag-Handle',
    },
  ];
}
