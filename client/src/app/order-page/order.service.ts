import {Injectable} from "@angular/core";
import {OrderPosition, Position} from "../shared/services/interfaces";
import {dedupePaths} from "@angular/compiler-cli/ngcc/src/entry_point_finder/utils";

@Injectable()
export class OrderService {

  public list: OrderPosition[] = []
  public price = 0

  add(position: Position) {
    //copyObject
    const orderPosition: OrderPosition = Object.assign({},{
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    })

    const candidate = this.list.find(p => p._id === orderPosition._id)
    if(candidate){
      //change quantity of already existing order
      candidate.quantity += orderPosition.quantity
    } else {
      this.list.push(orderPosition)
    }

    this.computePrice()
  }

  remove(item: OrderPosition) {
    const idx = this.list.findIndex(p => p._id === item._id)
    this.list.splice(idx, 1)
    this.computePrice()
  }

  clear() {
    this.list = []
    this.price = 0;
  }

  private computePrice() {
    this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0)
  }
}
