class ORDER {
    constructor(id,  quantity, status,payment_id , buy_customer_id , buy_product_id  ) {
        this.id = id
        this.quantity = quantity
        this.status = status
        this.payment_id = payment_id
        this.buy_customer_id = buy_customer_id
        this.buy_product_id = buy_product_id
        
      
    }
}

module.exports = ORDER