const fastifyStatic = require('fastify-static');
const path = require("path");


const fastify = require('fastify')();
fastify.register(require('fastify-url-data'));

const {Sequelize, QueryTypes} = require('sequelize');

let sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {pool: {max: 5, min:1, acquire: 3000},logging: true});

fastify.addHook('preHandler',async (req, reply) => {

  const isHttps = ((req.headers['x-forwarded-proto'] || '').substring(0, 5) === 'https')
  if (isHttps) {
    return
  }

  const { method, url } = req.req

  if (method && ['GET', 'HEAD'].includes(method)) {
    const host = req.headers.host || req.hostname
    reply.redirect(301, `https://${host}${url}`)
  }
});

fastify.register(fastifyStatic, {
  root: path.join(require.main.path, 'public'),
  prefix: '/'
});

fastify.post('/ab', async (request, response) => {
  const email = request.body.email;
  const type = request.urlData().host.indexOf('trekkers') === -1 ? 'd' : 't';

  await sequelize.query('INSERT INTO email (email, type, ip) VALUES (?,?, ?)', {type: QueryTypes.INSERT, replacements: [email, type, request.headers["x-forwarded-for"]]});

  return {success: true};
});


const start = async () => {
  await fastify.listen(process.env.PORT || 80,'0.0.0.0')
}

start();
