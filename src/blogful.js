require('dotenv').config()
const knex = require('knex');
const ArticleService = require('./articles-service');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

ArticleService.getAllArticles(knexInstance)
    .then(articles => console.log(articles))
    .then(() => 
        ArticleService.insertArticle(knexInstance, {
            title: 'new title',
            content: 'new content',
            date_published: new Date(),
        })
    )
    .then(newArticle => {
        console.log(newArticle)
        return ArticleService.updateArticle(knexInstance, newArticle.id, {title: 'updated title'})
            .then(() => ArticleService.getById(
                knexInstance, newArticle.id
            ))
    })
    .then(article => {
        console.log(article)
        return ArticleService.deleteArticle(knexInstance, article.id)
    })

