const dotenv = require("dotenv");

let ENV_FILE_NAME = ".env";

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

console.log("NODE_ENV: ", process.env.NODE_ENV);
console.log("HOST: ", process.env.HOST);
console.log("Port: ", process.env.PORT);

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "/http://*/";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "/http://*/";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `medusa-file-s3`,
    options: {
      s3_url: process.env.S3_URL,
      bucket: process.env.S3_BUCKET,
      region: process.env.S3_REGION,
      access_key_id: process.env.S3_ACCESS_KEY,
      secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
      // cache_control: process.env.S3_CACHE_CONTROL,
      // optional
      // download_file_duration: process.env.S3_DOWNLOAD_FILE_DURATION,
      // prefix: process.env.S3_PREFIX,
    },
  },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      serve: true,
      path: "/app",
      open: true,
      // port: 7001,
      autoRebuild: true,
      // develop: {
      //   open: process.env.OPEN_BROWSER !== "false",
      // },
    },
  },
];

console.log("plugins: ", plugins);

const modules = {
  /*eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },*/
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  host: process.env.HOST,
  database_extra:
    process.env.NODE_ENV !== "development"
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {},
  // Uncomment the following lines to enable REDIS
  // redis_url: REDIS_URL
};

console.log("projectConfig: ", projectConfig);

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};
