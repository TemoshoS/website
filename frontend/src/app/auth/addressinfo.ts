export class Addressinfo {

    postalcode: string;
    streetaddress: string;
    city: string;
    province: string;
   
 
    constructor(postalcode: string, streetaddress: string, city: string, province: string) {
        this.postalcode = postalcode;
        this.streetaddress = streetaddress;
        this.city = city;
        this.province = province;
      
    }

}
