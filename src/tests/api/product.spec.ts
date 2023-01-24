import supertest from 'supertest'
import app from '../../index'

const req = supertest(app)
let token: string

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
    it('should return a 200 response', async () => {
        const resUser = await req.post('/users').send({
            firstname: 'test',
            lastname: 'test',
            password: 'test'
        })
        token = resUser.text.substring(1, resUser.text.length - 1)

        const res = await req.post('/products').send({
            name: 'test',
            price: 10,
            category: 'test'
        }).set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

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
    it('should return a 200 response', async () => {
        const res = await req.delete('/products/1').set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    it('should return a 401 response for Authentication', async () => {
        const res = await req.delete('/products/1')
        expect(res.status).toBe(401)
    })
})