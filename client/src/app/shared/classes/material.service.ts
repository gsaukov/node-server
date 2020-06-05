declare var M //Materializejs M will be in browser window.

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }
}
