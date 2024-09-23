import { Component } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../models/User';
import { Firm } from '../models/Firm';

@Component({
  selector: 'app-admin-app',
  templateUrl: './admin-app.component.html',
  styleUrls: ['./admin-app.component.css']
})
export class AdminAppComponent {
  users: User[] = [];
  firms: Firm[] = [];
  requests: any[] = [];
  selectedUser?: User = undefined; 
  editMode: boolean = false;
  firm = {
    name: '',
    address: '',
    services: '',
    phoneNumber: '',
    location: '',
    contactPerson: '',
    employees: [] as string[],
    pricing: '',
    vacationPeriod: {
      startDate: '',
      endDate: ''
    }
  };

  newDecorator: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    phone: '',
    email: '',
    profilePicture: null,
    creditCardNumber: '',
    type: '',
    status: ''
  };

  decoratorsList: User[] = [];


  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadDecorators();
    this.loadRequests();
    this.loadFirms()
  }

  loadUsers(): void {
    this.adminService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Greška prilikom dohvatanja korisnika', error);
      }
    );
  }

  loadDecorators(): void {
    this.adminService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Greška prilikom dohvatanja korisnika', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.newDecorator.profilePicture = file;
    }
  }

  loadFirms(): void {
    this.adminService.getFirms().subscribe(
      (data) => {
        this.firms = data;
      },
      (error) => {
        console.error('Greška prilikom dohvatanja korisnika', error);
      }
    );
  }

  editUser(user: User): void {
    this.selectedUser = { ...user }; 
    this.editMode = true;
  }

  updateUser(): void {
    if (this.selectedUser) {
      this.adminService.editUser(this.selectedUser).subscribe(
        () => {
          alert('Korisnik uspešno ažuriran');
          this.editMode = false;
          this.loadUsers();
        },
        (error) => {
          console.error('Greška prilikom ažuriranja korisnika', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.selectedUser = undefined;
  }


  deactivateUser(username: string): void {
    this.adminService.editUser({username: username, status: 'Deactivated' }).subscribe(
      () => {
        alert('Korisnik deaktiviran');
        this.loadUsers();
      },
      (error) => {
        console.error('Greška prilikom deaktivacije korisnika', error);
      }
    );
  }

  activateUser(username: string): void {
    this.adminService.editUser({username: username, status: 'Active' }).subscribe(
      () => {
        alert('Korisnik ponovo aktivan');
        this.loadUsers();
      },
      (error) => {
        console.error('Greška prilikom deaktivacije korisnika', error);
      }
    );
  }

  loadRequests(): void {
    this.adminService.getUsers().subscribe(
      (data) => {
        this.requests = data.filter(user => user.status === 'Pending');
      },
      (error) => {
        console.error('Greška prilikom dohvatanja zahteva za registraciju', error);
      }
    );
  }

  approveRequest(username: string): void {
    this.adminService.reviewRegistrationRequest(username, 'Active').subscribe(
      () => {
        alert('Zahtev prihvaćen');
        this.loadRequests();
      },
      (error) => {
        console.error('Greška prilikom prihvatanja zahteva', error);
      }
    );
  }

  denyRequest(username: string): void {
    this.adminService.reviewRegistrationRequest(username, 'Denied').subscribe(
      () => {
        alert('Zahtev odbijen');
        this.loadRequests();
      },
      (error) => {
        console.error('Greška prilikom odbijanja zahteva', error);
      }
    );
  }

  addFirm(): void {
    this.firm.employees = this.decoratorsList.map(decorator => decorator.username);
    this.adminService.addFirm(this.firm).subscribe(
      (data) => {
        alert('Firma uspešno dodata.');
      },
      (error) => {
        console.error('Greška prilikom dodavanja firme.', error);
      }
    );
  }

  addDecorator(): void {
    this.adminService.addDecorator(this.newDecorator).subscribe(
      (data) => {
        this.decoratorsList.push(data); // Dodaj novog dekoratera u listu zaposlenih
        this.newDecorator = {  
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          gender: '',
          address: '',
          phone: '',
          email: '',
          profilePicture: null,
          creditCardNumber: '',
          type: '',
          status: '' }; // Resetuj formu za dekoratera
      },
      (error) => {
        console.error('Greška prilikom dodavanja dekoratera.', error);
      }
    );
  }

}
