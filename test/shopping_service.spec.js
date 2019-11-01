const ShoppingService = require('../src/shopping-service');
const knex = require('knex');

describe('shopping service object', function () {
    let db;
    let testList = [
        {
            id: 1,
            name: 'apples',
            price: 2.45,
            date_added: new Date(),
            checked: false,
            category: 'Snack'
        },
        {
            id: 2,
            name: 'eggs',
            price: 3.99,
            date_added: new Date(),
            checked: false,
            category: 'Breakfast'
        },
        {
            id: 3,
            name: 'bread',
            price: 5.45,
            date_added: new Date(),
            checked: false,
            category: 'Lunch'
        }
    ]
    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
    })
    after(() => db.destroy(db));
    afterEach(() => db('shopping_list').truncate())
    before(() => db('shopping_list').truncate())

    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testList)
        })

        it(`getWholeShoppingList() resolves all items from 'shopping_list' table`, () => {
            return ShoppingService.getWholeShoppingList(db)
                .then(actual => {
                    expect(actual).to.eql(testList.map(item => ({
                        ...item,
                        date_added: new Date(item.date_added)
                    })))
                })
        })
        it(`getById() resolves an item by id from 'shopping_list' table`, () => {
            const pickedId = 2;
            const pickedItem = testList[2 - 1];
            return ShoppingService.getById(db, pickedId)
                .then(actual).to.eql({
                    id: pickedId,
                    name: pickedItem.name,
                    price: pickedItem.price,
                    date_added: pickedItem.date_added,
                    checked: false,
                    category: pickedItem.category,
                })
        })
        it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
            const itemId = 3
            return ShoppingService.deleteItem()
                .then(() => ShoppingService.getWholeShoppingList(db))
                .then(allItems => {[
                    {
                        id: 1,
                        name: 'apples',
                        price: 2.45,
                        date_added: new Date(),
                        checked: false,
                        category: 'Snack'
                    },
                    {
                        id: 2,
                        name: 'eggs',
                        price: 3.99,
                        date_added: new Date(),
                        checked: false,
                        category: 'Breakfast'
                    },
                ]
                const expected = testItems.filter(item = item.id !== id) 
                expect(allItems).to.eql(expected);   
            })
        })
        it(`updatesItem() updates an item from the 'shopping_list' by id`, () => {
            const itemToUpdateId = 3
            const newItemData = {
                id: 2,
                        name: 'updated name',
                        price: 'updated price',
                        date_added: new Date(),
                        checked: 'updated checked',
                        category: 'updated category'
            }
            return ShoppingService.updatedItem(db, itemToUpdateId, newItemData)
                .then(() => ShoppingService.getById(db, itemToUpdateId))
                .them(item => {
                    expect(item).to.eql({
                        id: itemToUpdateId,
                        ...newItemData,
                    })
                })
        })

    })

    context(`Given 'shopping_list' has no data`, () => {
        it(`getWholeShoppingList() resolves an empty array`, () => {
            return ShoppingService.getWholeShoppingList(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it(`insertNewItem() inserts a new item and resolves new item with 'id' inside 'shopping_list' table `, () => {
            const newItem = {
                name: 'muffins',
                price: 3.99,
                date_added: new Date(),
                checked: false,
                category: 'Breakfast'
            }
            return ShoppingService.insertNewItem(db, newItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newItem.name,
                        price: newItem.price,
                        date_added: newItem.date_added,
                        checked: false,
                        category: newItem.category,
                    })
                })
        })
    })
})