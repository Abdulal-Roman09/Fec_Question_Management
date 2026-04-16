import cors from 'cors'
import httpStatus from 'http-status'
import cookiParser from 'cookie-parser'
import express, { Application } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import routerNotFound from './app/middleware/routerNotFound';


const app: Application = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use(express.json());
app.use(cookiParser())

// all routes
app.use('/api/v1', router)

// main routes
app.get('/', (req, res) => {
  res.send('  🌿 API Service is running smoothly!');
});


app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API endpoint not found',
    error: {
      path: req.originalUrl,
      method: req.method,
    },
  });
});

app.use(globalErrorHandler)
app.use(routerNotFound)

export default app;