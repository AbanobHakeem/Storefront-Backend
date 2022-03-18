import { Category,CategoryStore } from "../models/Category";
const store = new CategoryStore()

describe("Category Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a category', async () => {
    const result = await store.create({
      name:"tv"
    });
    expect(result).toEqual({
      id: "1",
      name:"tv"

    });
  });

  it('index method should return a list of categorys', async () => {
    const result = await store.index();
    expect(result).toEqual([{
      id: "1",
      name:"tv"
    }]);
  });

  it('show method should return the correct category', async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      id: "1",
      name:"tv"
    });
  });

  it('delete method should remove the category', async () => {
    store.delete("1");
    const result = await store.index()

    expect(result).toEqual([]);
  });
});