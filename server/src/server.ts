import app from "./loaders/app";


async function startServer(){
   await require('./loaders').default();
   const PORT = 3000;
   app.listen(PORT, () => {
      // tslint:disable-next-line:no-console
      console.log('Express server listening on port ' + PORT);
   })
}

startServer();
