import supertest from 'supertest'
import app from '../../index'

const req = supertest(app)

describe('GET /orders', () => {
    it('should return a 200 response', async () => {
        // set the authorization header
        const res = await req.get('/orders')
        expect(res.status).toBe(401)
    })
})

describe('GET /orders/:id', () => {
    it('should return a 200 response', async () => {
        const res = await req.get('/orders/1')
        expect(res.status).toBe(401)
    })
})

describe('POST /orders', () => {
    it('should return a 401 response', async () => {
        const res = await req.post('/orders').send({
            user_id: 1,
            status: 'active'
        })
        expect(res.status).toBe(401)
    })
})

describe('DELETE /orders/:id', () => {
    it('should return a 401 response', async () => {
        const res = await req.delete('/orders/1')
        expect(res.status).toBe(401)
    })
})

describe('POST /orders/:id/products', () => {
    it('should return a 401 response', async () => {
        const res = await req.post('/orders/1/products').send({
            product_id: 1,
            quantity: 1
        })
        expect(res.status).toBe(401)
    })
})

describe('GET /orders/:id/products', () => {
    it('should return a 401 response', async () => {
        const res = await req.get('/orders/1/products')
        expect(res.status).toBe(401)
    })
})