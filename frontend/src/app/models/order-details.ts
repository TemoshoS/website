import { OrderItem } from './order-item';

export class OrderDetails {

    orderid :number;
    username:string;
    deliveryaddress:string;
    phone:string;
    orderpaymethod :string;
    paymentrefrenceid :string;
    totprice: string;
    email: string;
    orderlist:OrderItem[];
    
}
