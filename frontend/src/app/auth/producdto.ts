export class Producdto {
 
    id: number;
    prodname: string;
    proddecription: string;
    prodprice: number;
    category: string;
    prodquantity: number;
    logo: Blob;
 
    constructor(prodname: string, proddecription: string, prodprice: number,category: string, prodquantity: number) {
        this.prodname = prodname;
        this.proddecription = proddecription;
        this.prodprice = prodprice;
        this.category = category;
        this.prodquantity = prodquantity;
        
    }
}      