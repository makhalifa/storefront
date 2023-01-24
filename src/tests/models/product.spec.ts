import { ProductStore, Product } from "../../models/product";
import { stringify } from 'querystring';

const store = new ProductStore();
let product: Product;

describe("Product Model", () => {
    it("create method should add a product", async () => {
        const result = await store.create({
            name: "test",
            price: 10,
            category: "test",
        });
        product = result;
        const { id, ...newResult } = product;
        expect(newResult).toEqual({
            name: "test",
            price: 10,
            category: "test",
        });
    });

    it("index method should return a list of products", async () => {
        const result = await store.index();
        // expect result match array of type Product
        expect(result).toBeInstanceOf(Array);
    });

    it("show method should return the correct product", async () => {
        const result = await store.show(product.id as unknown as string);
        expect(result).toEqual(product);
    });

    it("delete method should remove the product", async () => {
        const result = await store.delete(product.id as unknown as string);
        const { id, ...newResult } = product;
        expect(result).not.toEqual(newResult);
    });
});