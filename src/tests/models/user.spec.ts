import { UserStore } from "../../models/user";
import dotenv from "dotenv";
dotenv.config();

const userStore = new UserStore();

describe("User Model", () => {
    it("ENV should equal test or dev", () => {
        console.log("ENV=",process.env.ENV);
        expect(process.env.ENV).toMatch(/test|dev/);
    });
    it("should have an index method", () => {
        expect(userStore.index).toBeDefined();
    });
    
    it("should have a show method", () => {
        expect(userStore.show).toBeDefined();
    });
    
    it("should have a create method", () => {
        expect(userStore.create).toBeDefined();
    });
    
    it("should have a delete method", () => {
        expect(userStore.delete).toBeDefined();
    });
    
    it("should have an authenticate method", () => {
        expect(userStore.authenticate).toBeDefined();
    });
    
    it("create method should add a user", async () => {
        const result = await userStore.create({
        firstname: "John",
        lastname: "Doe",
        password: "password",
        });
        const { id, password, ...newResult } = result;
        expect(newResult).toEqual({
        firstname: "John",
        lastname: "Doe",
        });
    });
});