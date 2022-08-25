//configucao inicial

const express = require('express');
const mongoose = require('mongoose');
//const dotenv = require('dotenv');
//dotenv.config();
require('dotenv').config();
const app = express();

//leitura do json / middleware 
app.use(express.urlencoded({
  extended: true,
}),
);

app.use(express.json());
//rotas da API
const personRoutes = require('./Routes/personRoutes');
app.use('/person', personRoutes);

//rota inicial / endpoint

app.get('/', (request, response) => {
  response.json({ message: "First Response via API" });
});


//mongodb+srv://APIClusterUSER:<password>@apicluster.uk8iufq.mongodb.net/?retryWrites=true&w=majority

//habilitando a porta de comnicação //
const dbuser = process.env.MONGODB_USER;
const dbpass = encodeURIComponent(process.env.MONGODB_PASS);

mongoose
  .connect(
    `mongodb://${dbuser}:${dbpass}'@apicluster.uk8iufq.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('MongoDB connected');
    //app.listen(3000);
    //app.listen(3000, () => {
    //  console.log('Server listening on port 3000!')
    //console.log('Press Ctrl+C to quit.')
    //process.exit()
    //}) //close app listen
  })
  .catch((error) => console.log(error))




