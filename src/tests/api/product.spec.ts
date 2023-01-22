import supertest from 'supertest'
import app from '../../index'

const req = supertest(app)

describe('GET /products', () => {
    it('should return a 200 response', async () => {
        const res = await req.get('/products')
        expect(res.status).toBe(200)
    })
})

describe('GET /products/:id', () => {
    it('should return a 200 response', async () => {
        const res = await req.get('/products/1')
        expect(res.status).toBe(200)
    })
})

describe('POST /products', () => {
    it('should return a 401 response for Authentication', async () => {
        const res = await req.post('/products').send({
            name: 'test',
            price: 10,
            category: 'test'
        })
        expect(res.status).toBe(401)
    })
})

describe('DELETE /products/:id', () => {
    it('should return a 401 response for Authentication', async () => {
        const res = await req.delete('/products/1')
        expect(res.status).toBe(401)
    })
})