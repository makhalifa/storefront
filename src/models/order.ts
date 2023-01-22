import client from '../datebase'

export type Order = {
    id?: number
    user_id: number
    status: string
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [o.user_id, o.status])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not add new order ${o.id}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const conn = await client.connect()
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const result = await conn.query(sql, [id])
            const order = result.rows[0]
            conn.release()
            console.log(order)
            return order
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }

    async addProduct(order_id: string, product_id: string): Promise<Order> {
        try {
            const conn = await client.connect()

            // 1) check if order exists
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const result = await conn.query(sql, [order_id])
            const order = result.rows[0]

            // 2) check if product exists
            const sql2 = 'SELECT * FROM products WHERE id=($1)'
            const result2 = await conn.query(sql2, [product_id])
            const product = result2.rows[0]

            // 3) check if product is already in order
            const sql3 = 'SELECT * FROM orders_products WHERE order_id=($1) AND product_id=($2)'
            const result3 = await conn.query(sql3, [order_id, product_id])
            const order_product = result3.rows[0]
            if (order_product) {
                throw new Error(`Product ${product_id} is already in order ${order_id}.`)
            }

            // 4) add product to order
            const sql4 = 'INSERT INTO orders_products (order_id, product_id) VALUES($1, $2) RETURNING *'
            const result4 = await conn.query(sql4, [order_id, product_id])
            const order_product2 = result4.rows[0]
            conn.release()
            return order_product2
        } catch (err) {
            throw new Error(`Could not add product ${product_id} to order ${order_id}. Error: ${err}`)
        }
    }

    async showProducts(order_id: string): Promise<Order> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders_products WHERE order_id=($1)'
            const result = await conn.query(sql, [order_id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not find order ${order_id}. Error: ${err}`)
        }
    }

}
