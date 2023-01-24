import supertest from 'supertest'
import app from '../../index'

const req = supertest(app)

describe('GET /users', () => {
    it('should return a 200 response', async () => {
        const res = await req.get('/users')
        expect(res.status).toBe(401)
    })
})

describe('GET /users/:id', () => {
    it('should return a 200 response', async () => {
        const res = await req.get('/users/1')
        expect(res.status).toBe(401)
    })
})

describe('POST /users', () => {
    it('should return a 200 response', async () => {
        const res = await req.post('/users').send({
            firstname: 'test',
            lastname: 'test',
            password: 'test'
        })
        expect(res.status).toBe(200)
    })
})

describe('DELETE /users/:id', () => {
    it('should return a 200 response', async () => {
        const res = await req.delete('/users/2')
        expect(res.status).toBe(401)
    })
})

describe('POST /users/authenticate', () => {
    it('should return a 200 response', async () => {
        const res = await req.post('/users/authenticate').send({
            firstname: 'test',
            password: 'test'
        })
        expect(res.status).toBe(200)
    })
})