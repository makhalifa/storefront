import { json } from 'body-parser'
import { stringify } from 'querystring'
import { OrderStore ,Order} from '../../models/order'

const orderStore = new OrderStore()
let order: Order

describe('Order Model', () => {
    it('create method should add a order', async () => {
        const result = await orderStore.create({
            user_id: 1,
            status: 'active'
        })
        order = result
        const { id, ...newResult } = order
        expect(newResult).toEqual({
            user_id: 1,
            status: 'active'
        })
    })

    it('index method should return a list of orders', async () => {
        const result = await orderStore.index()
        // expect result match array of orders
        expect(result).toBeInstanceOf(Array)
    })

    it('show method should return the correct order', async () => {
        const { id, ...newResult } = order
        const result = await orderStore.show(id as unknown as string)
        expect(result).toEqual(order)
    })

    it('delete method should remove the order', async () => {
        const result = await orderStore.delete(order.id as unknown as string)
        const { id, ...newResult } = order
        expect(result).not.toEqual(newResult)
    })
})