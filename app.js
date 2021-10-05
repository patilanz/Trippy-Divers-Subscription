const fastifyStatic = require('fastify-static');
const path = require("path");


const fastify = require('fastify')();
fastify.register(require('fastify-url-data'))

const {Sequelize, QueryTypes} = require('sequelize');

let sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {pool: {max: 5, min:1, acquire: 3000},logging: true});


fastify.register(fastifyStatic, {
  root: path.join(require.main.path, 'public'),
  prefix: '/'
});

fastify.post('/ab', async (request, response) => {
  const email = request.body.email;
  const type = request.urlData().host.indexOf('trekkers') === -1 ? 'd' : 't';

  await sequelize.query('INSERT INTO email (email, type) VALUES (?,?)', {type: QueryTypes.INSERT, replacements: [email, type]});

  return {success: true};
});


const start = async () => {
  await fastify.listen(process.env.PORT || 80,'0.0.0.0');
}

start();
