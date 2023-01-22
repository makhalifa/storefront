import { OrderStore } from '../../models/order'

const orderStore = new OrderStore()

describe('Order Model', () => {
    // 
    it('should have an index method', () => {
        expect(orderStore.index).toBeDefined()
    })

    it('should have a show method', () => {
        expect(orderStore.show).toBeDefined()
    })

    it('should have a create method', () => {
        expect(orderStore.create).toBeDefined()
    })

    it('should have a delete method', () => {
        expect(orderStore.delete).toBeDefined()
    })

    it('should have an addProduct method', () => {
        expect(orderStore.addProduct).toBeDefined()
    })

    it('should have a showProducts method', () => {
        expect(orderStore.showProducts).toBeDefined()
    })

    it('create method should add a order', async () => {
        const result = await orderStore.create({
            user_id: 1,
            status: 'active'
        })
        const {id,...newResult }= result
        expect(newResult).toEqual({
            user_id: 1,
            status: 'active'
        })
    })
})