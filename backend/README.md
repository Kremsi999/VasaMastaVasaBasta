# Node/Express

-   Inicijalizovanje aplikacije:
    -   `npm init //U inicilazaciji entry point je dist/server.js
    -   `npm i typescript --save-dev
    -   `npm i @types/node --save-dev
    -   `npm i express
    -   `npm i @types/express --save-dev
    -   `npm i cors //za cross-origin
    -   `npm i @types/cors --save-dev
    -   `npm i mongoose
    -   `npm i mongodb
    -   `npx tsc --init --outDir dist //kompajler
-   Kontorleri:
    -   Logika endpoint-a koja se obradjuje na aplikaciji

```
import express from 'express'
import UserModel from '../models/user'

export class UserController{
	login = (req: express.Request, res: express.Response)=>{
		let usernameP = req.body.username;
		let passwordP = req.body.password;

		/* let query = UserM.findOne({username: usernameP, password: passwordP});
			Mongoose queries are not promises. Queries are thenables. Code above is executed synchronously.
			Unlike promises, calling a query's .then() executes the query and it gets called immediately, but execution is asynchronous and THEN CALLBACK is called after finish.
			Then function returs Promise, but we are not returning promises to front, from then callback we are returning just data in response that is later inserted into Observable.*/
		UserModel.findOne({username: usernameP, password: passwordP})
			.then((user)=>{
				res.json(user)
			})
			.catch((err)=>{
				console.log(err)
			})
	}
}
```

-   Rutiranje:
    -   Generisanje ruta sa kojima pristupamo endpoint-u

```
import express from 'express'
import { UserController } from '../controllers/user.controller'

const userRouter = express.Router()
userRouter.route("/login").post(
	(req,res)=>new UserController().login(req,res)
)
```

-   Glavna aplikacija:

```
import express from 'express';
import cors from 'cors'
import userRouter from './routers/user.router';
import mongoose from 'mongoose'

const app = express();

app.use(cors()) //cross-origin
app.use(express.json()) //vraca sve u JSON-u

mongoose.connect('mongodb://127.0.0.1:27017/newDB')
const conn = mongoose.connection
conn.once('open', ()=>{
	console.log("DB ok")
})

const router = express.Router()
router.use('/users', userRouter)

app.use("/" ,router)
app.listen(4000, () => console.log(`Express server running on port 4000`));
```

# MongoDB

-   Pokretanje servisa u pozadini da bi radilo (otvorimo port 27017)
-   Povezivanje monga sa express aplikacijom:

```
import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/<db_name>')

const conn = mongoose.connection
conn.open('open', () => {
	console.log('db connection ok')
})
```

-   Modeli:

```
import mongoose from 'mongoose'

const Schema = mongoose.Schema

let User = new Schema({
	username: {
		type: String
	},
	password: String,
	type: {
		type: Number, min: 0, max: 1
	}
})
//Naziv modela, Sema, naziv kolekcije
export default mongoose.model('UserModel', User, 'korisnici')
```

-   Upiti

```
import UserModel from '...'

//Vrati korisnika sa datim korisnickim imenom i lozinkom
UserModel.findOne({'username': username, 'password': password})
	.then((user) => {
		res.json(user)
	})
	.catch((err) => {
		console.log(err)
	})

//Korisniku sa korisnickim imenom promeni tip u 0
UserModel.findOneAndUpdate({'username': username}, {'type': 0})
	.then((user) =>{
		res.json({'message': 'ok'})
	})
	.catch((err) => {
		console.log(err)
		res.json({'message': 'err'})
	})

//Vrati sve korisnike sa tipom 0
UserModel.find({'type': 0})
	.then((users) => {
		res.json(users)
	})
	.catch((err) => {
		console.log(err)
	})

//Vrati sve iz kolekcije
UserModel.find({})
	.then((all) => {
		res.json(all)
	})
	.catch((err) => {
		console.log(err)
	})

//Unos u kolekciju (prethodno napravljen objekat user tipa UserModel)
user.save()
	.then((ok) => {
		res.json({'message': 'ok'})
	})
	.catch((err) => {
		console.log(err)
		res.status(400).json({'message': 'error'})
	})

//Brisanje korisnika
UserModel.deleteOne({'username': username})
	.then((ok) => {
		res.json({'message': 'ok'})
	})
	.catch((err) => {
		console.log(err)
		res.json({'message': 'error'})
	})
//Azuriranje sth - moze biti prost tip ili objekat kao niz
UserModel.update({'username': username}, {$push: {'list': sth}})
	.then((ok) => {
		res.json({'message': 'ok'})
	})
	.catch((err) => {
		console.log(err)
		res.json({'message': 'error'})
	})

//Azuriranje obicne vrednosti
UserModel.update({'username': username}, {'type': radnik})
	.then((ok) => {
		res.json({'message': 'ok'})
	})
	.catch((err) => {
		console.log(err)
		res.json({'message': 'error'})
	})
```
