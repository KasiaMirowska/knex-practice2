require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL

})
console.log('knex and driver installed correctly');


function findTerm(searchTerm) {
    knexInstance   
        .select('name','price','date_added','checked','category')
        .from('shopping_list')
        .where('name', 'ILIKE',`%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
};
findTerm('tuna');

function paginateList(page) {
    const productsPerPage = 6;
    const offset = productsPerPage * (page -1);
    knexInstance
        .select('name','price','date_added','checked','category')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(results => {
            console.log('PER PAGE', results)
        })
}
paginateList(1);

function findItemsForDays(daysAgo) {
    knexInstance
        .select('name','price','date_added','checked','category')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(results => {
            console.log('OLD ITEMS', results)
        })
};
findItemsForDays(2);

function findTotalCostInCategory() {
    knexInstance
        .select('category')
        .from('shopping_list')
        .groupBy('category')
        .sum('price as total')
        .then(results => {
            console.log('TOTAL SUM', results)
        })
}
findTotalCostInCategory();