import {ElementRef} from "@angular/core";

declare var M //Materializejs M will be in browser window.

export interface MaterialInstance {
  open?(): void
  close?(): void
  destroy?(): void
}

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

  static updateTextInputs() {
    M.updateTextFields()
  }

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement)
  }

  static initTooltip(ref: ElementRef): MaterialInstance {
    return M.Tooltip.init(ref.nativeElement)
  }
}
