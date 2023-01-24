import { User, UserStore } from "../../models/user";
import dotenv from "dotenv";
dotenv.config();

const userStore = new UserStore();
let user: User;

describe("User Model", () => {
    it("create method should add a user", async () => {
        const result = await userStore.create({
        firstname: "John",
        lastname: "Doe",
        password: "password",
        });
        user = result;
        const { id, password, ...newResult } = user;
        expect(newResult).toEqual({
        firstname: "John",
        lastname: "Doe",
        });
    });

    it("index method should return a list of users", async () => {
        const result = await userStore.index();
        // expect result match array of type User
        expect(result).toBeInstanceOf(Array);
    }); 

    it("show method should return the correct user", async () => {
        const result = await userStore.show(user.id as unknown as string);
        expect(result).toEqual(user);
    });

    it("delete method should remove the user", async () => {
        const result = await userStore.delete(user.id as unknown as string);
        expect(result).not.toEqual(user);
    });
});