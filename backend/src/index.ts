import app from './app';

const port = process.env.PORT || 3000;

(async () => {
  try {
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
  } catch (error) {
    console.log('Server error', (error as Error).message);
  }
})();
