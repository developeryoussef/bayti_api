const express = require('express');
const app = express();
const PORT = 5000;
const usersRouter = require('./api/routers/usersroute');
const categoriesRouter = require('./api/routers/categoriesroute');
const productsRouter = require('./api/routers/productsroute');
const ordersRouter = require('./api/routers/ordersroute');
const cartRouter = require('./api/routers/cartrouter');
const adminOrdersRouter = require('./api/routers/admin/admin-get-orders');
const adminDeliveryEmpRouter = require('./api/routers/admin/admin-delivery-employment');
const deliveryGetOrders = require('./api/routers/delivery/get-delivery-orders');
const deliveryTrackingSteps = require('./api/routers/delivery/delivery-order-tracking-steps');
const favouritesRouter = require('./api/routers/favouritesroute');
const getUserOrdersRouter = require('./api/routers/get-user-orders');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bayti').then(() => {
    console.log('Connected to mongodb');
}).catch((error) => {
    console.log(error);
});
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', usersRouter);
app.use('/api', categoriesRouter);
app.use('/api', productsRouter);
app.use('/api', cartRouter);
app.use('/api', favouritesRouter);
app.use('/api', ordersRouter);
app.use('/api', adminDeliveryEmpRouter);
app.use('/api', adminOrdersRouter);
app.use('/api', deliveryGetOrders);
app.use('/api', deliveryTrackingSteps);
app.use('/api', getUserOrdersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});