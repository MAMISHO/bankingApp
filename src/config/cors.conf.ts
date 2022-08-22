import cors from 'cors';

const allowedOrigins = '*';
const ENABLED: Boolean = process.env.CORS_ENABLED ? new Boolean(process.env.CORS_ENABLED) : new Boolean(false);

const options: cors.CorsOptions = {
  // origin: allowedOrigins,
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if (!ENABLED.valueOf()) {
      return callback(null, true);
    }
    // if (!origin) return callback(null, true);
    if (!origin || allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
};

export const CustomCorsConfig = cors(options);
