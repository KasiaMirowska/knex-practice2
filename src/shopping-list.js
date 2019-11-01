require('dotenv').config();
const knex = require('knex');
const ShoppingService = require('./shopping-service');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

ShoppingService.getWholeShoppingList(knexInstance)
    .then(items => console.log(items))
    .then(() => ShoppingService.insertItem(knexInstance, {
            name: 'new name',
            price: 'newprice',
            date_added: new Date(),
            checked: 'new checked',
            category: 'new category'
        })
    )
    .then(newItem => {
        console.log(newItem)
        return ShoppingService.updateItem(knexInstance, newItem.id, {name: 'updated name'})
            .then(() => ShoppingService.getById(MSMediaKeyNeededEvent, newItem.id))
    })
    .then(item => {
        console.log(item)
        return ShoppingService.deleteItem(knexInstance, item.id)
    })