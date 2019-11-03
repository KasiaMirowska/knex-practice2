const ShoppingService = {
    getWholeShoppingList(knex) {
        return knex.select('*').from('shopping_list')
            .then(rows => rows.map(row => {
                return {
                    ...row,
                    price: Number(row.price)}
            }))
    },
    insertNewItem(knex, newItem) {
        return knex 
            .insert(newItem)
            .into('shopping_list')
            .returning('*')
            .then(rows => {
                return ({
                    ...rows[0],
                    price: Number(rows[0].price)
                })
            })
            //it's always an array
    },
    getById(knex, id) {
        return knex.from('shopping_list').select('*').where({id: id}).first()
            .then(row => ({
                ...row,
                price: Number(row.price)
            }))
    }, 
    deleteItem(knex, id) {
        return knex('shopping_list')
            .where({id}).delete()
    },
    updateItem(knex, id, newItemData) {
        return knex('shopping_list')
            .where({id: id}).update(newItemData)
    }
}

module.exports = ShoppingService;