import client from '../datebase'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export type User = {
    id?: number
    firstname: string
    lastname: string
    password: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            const hash = bcrypt.hashSync(u.password + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS as string))
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [u.firstname, u.lastname, hash])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not add new user ${u.firstname}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }

    async authenticate(firstname: string, password: string): Promise<User | null> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users WHERE firstname=($1)'
            const result = await conn.query(sql, [firstname])
            const user = result.rows[0]
            conn.release()
            if (user) {
                if (bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, user.password)) {
                    return user
                }
            }
            return null
        } catch (err) {
            throw new Error(`Could not authenticate user ${firstname}. Error: ${err}`)
        }
    }

    async update(id: string, u: User): Promise<User> {
        try {
            const sql = 'UPDATE users SET firstname=($1), lastname=($2), password=($3) WHERE id=($4) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [u.firstname, u.lastname, u.password, id])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not update user ${id}. Error: ${err}`)
        }
    }
}
