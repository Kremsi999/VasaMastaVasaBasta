- Globalna instalacija:
	- ``` npm install -g @angular/cli@16.2.2```
- Inicijalizovanje aplikacije:
	- ```ng new <app_name>```
	- ```routing - YES, styles - CSS```
	- ```cd <app_name> ng serve --open //pokretanje aplikacije```
- Generisanje komponente:
	- ```ng g c <component_name>```
	- Unutar komponente postoje fajlovi za stil, html i logiku
```
export class LoginComponent {

	constructor(private servis: UserService, private router: Router){}
	
	username: string = ""
	password: string = ""

	login(){
		this.servis.login(this.username, this.password).subscribe(data=>{
			if(data==null) alert("Nema korisnika")
			else {
				localStorage.setItem("logged", data.username)
				this.router.navigate(['books'])
			}
		})
	}
}	
```
- Generisanje servisa:
	- ```ng g s <service-name>```
```
export class UserService {
	constructor(private http: HttpClient) { }

	login(username: string, password: string){
		const data={
			username: username,
			password: password
		}
		return this.http.post<User>("http://localhost:4000/users/login", data)
	}
}
```
- Generisanje guard-ova:
	- ```ng g g <guard_name>```
	- kace se na rutu u okviru router-module-a
```
//book.guard.ts
import { CanActivateFn } from '@angular/router';

export const bookGuard: CanActivateFn = (route, state) => {
	if (localStorage.getItem("logged")!=null) return true;
	else {
		alert("No")
		return false;
	}
};

//app-routing-module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BooksComponent } from './books/books.component';
import { bookGuard } from './book.guard';

const routes: Routes = [
	{path: "", component: LoginComponent},
	{path: "register", component: RegisterComponent},
	{path: "books", component: BooksComponent, canActivate: [bookGuard]}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
```
- Strukturalne direktive:
	- *\*ngFor
	- *\*ngIf
	- *\*ngSwitch
- One-way binding:
	- Interpolacija;
	- Property binding:
		- `````` <img alt="item" [src]="itemImageUrl"> //HTML  
		- ``````temImageUrl = '../assets/phone.svg’; //TS
	- Atribute binding:		```
		<button type="button" [attr.aria-label]="actionName">
			{{actionName}} with Aria
		</button>
	- Class and style binding:
		```[class.sale]="onSale" true,false```
	- Event binding:
		```<button (click)="onSave()">Save</button>```
- Ugradjene funkcije u komponentama:
	- ngOnInit(): void - pandam useEffect-u
- Dekoratori:
	- @Input - vredonst i komponente koja je visa u hijerarhiji (kao props)
- Direktive:
	- `<ng-template> - kao conditional rendering u React-u
