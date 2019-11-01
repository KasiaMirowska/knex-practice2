const ShoppingService = {
    getWholeShoppingList(knex) {
        return knex.select('*').from('shopping_list')
    },
    insertNewItem(knex, newItem) {
        return knex 
            .insert(newItem)
            .into('shopping_list')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex.from('shopping_list').select('*').where({id: id}).first()
    },
    deleteItem(db, id) {
        return knex('shopping_list')
            .where({id}).delete()
    },
    updateItem(knex, id, newItemData) {
        return knex('shopping_list')
            .where({id: id}).udate(newItemData)
    }
}