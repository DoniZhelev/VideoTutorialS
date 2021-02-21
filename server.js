const express = require('express');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { PORT} = require('./config/config');

const app = express();

require('./config/mongoose')

require('./config/express')(app);

app.use(routes);
// Notify... Must be after routes ERRORHANDLER!!!
app.use(errorHandler);




app.listen(PORT, () => console.log(`Server is running on port ${PORT}...` ));