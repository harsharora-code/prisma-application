// import { PrismaClient } from './generated/prisma/index.js';
import  express from 'express'
import { PrismaClient } from '@prisma/client';

const client  = new PrismaClient();
const app = express();

app.get('/users', async (req, res) => {
    const users = await client.user.findMany();
    res.json({
        users : users,
    })
})
app.get('/todos/:id', async (req, res) => {
    const id = req.params.id;
    try {

    const user = await client.user.findFirst({
        where : {
            id : parseInt(id),
        },
        select  :{
            todos : true,
            username : true,
            age : true
        }
    })
    res.json({
        user
    })
} catch(e) {
    console.log(e);
}
    
})

app.listen(3000);