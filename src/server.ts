
import { app } from './app';
import { client } from './database/config.database';


const startServer = async (port:number):Promise<void> =>{
    app.listen(port, ()=>console.log("server is running at http://localhost:3000`"))
    try {
        await client.connect();
        console.log("banco de dados conectado!");
      } catch (error: any) {
        console.log(error);
      }
}

startServer(3000)