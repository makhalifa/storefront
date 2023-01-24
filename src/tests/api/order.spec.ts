import supertest from 'supertest'
import app from '../../index'

const req = supertest(app)
let token: string

describe('GET /orders', () => {
    it('should return a 200 response', async () => {
        // create a user returning
        const res = await req.post('/users').send({
            firstname: 'test',
            lastname: 'test',
            password: 'test'
        })
        token = res.text
        console.log(`Bearer ${token}`)
        token = token.substring(1, res.text.length - 1)
        console.log(`Bearer ${token}`)
        
        // set some headers in request
        const res2 = await req.get('/orders').set('Authorization', `Bearer ${token}`)
        // print headers of response
        expect(res2.status).toBe(200)
    })

    it('should return a 401 response', async () => {
        // set the authorization header
        const res = await req.get('/orders')
        expect(res.status).toBe(401)
    })
})

describe('GET /orders/:id', () => {
    it('should return a 200 response', async () => {
        const res = await req.get('/orders/1').set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    it('should return a 401 response', async () => {
        const res = await req.get('/orders/1')
        expect(res.status).toBe(401)
    })
})

describe('POST /orders', () => {
    it('should return a 200 response', async () => {
        const res = await req.post('/orders').set('Authorization', `Bearer ${token}`).send({
            user_id: 1,
            status: 'active'
        })
        expect(res.status).toBe(200)
    })

    it('should return a 401 response', async () => {
        const res = await req.post('/orders').send({
            user_id: 1,
            status: 'active'
        })
        expect(res.status).toBe(401)
    })
})

describe('DELETE /orders/:id', () => {
    it('should return a 200 response', async () => {
        const res = await req.delete('/orders/1').set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    it('should return a 401 response', async () => {
        const res = await req.delete('/orders/1')
        expect(res.status).toBe(401)
    })
})
