import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, Order, Position} from "./interfaces";


@Injectable(
  {
    providedIn: 'root'
  }
)
export class OrdersService {
  constructor(private http: HttpClient) {
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order)
  }
}
