import {ElementRef} from "@angular/core";

declare var M //Materializejs M will be in browser window.

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }

  static initSideMenu(ref: ElementRef) {
    M.Sidenav.init(ref.nativeElement, {draggable: true});
  }

  static initFloatingActionButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement);
  }
}
