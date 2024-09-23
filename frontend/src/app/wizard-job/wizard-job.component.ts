import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GardenService } from '../services/garden.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-wizard-job',
  templateUrl: './wizard-job.component.html',
  styleUrls: ['./wizard-job.component.css']
})
export class WizardJobComponent {
  currentStep = 1;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  gardenType = '';
  username = ''
  @Input() firmId: string = ''
  @Input() services: string[] = []; 
  finalResult: string = '';
  selectedOptions: string[] = []; 

  constructor(
    private _formBuilder: FormBuilder,
    private gardenService: GardenService
  ) {
    this.firstFormGroup = this._formBuilder.group({});
    this.secondFormGroup = this._formBuilder.group({});
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') ?? ''
    this.firstFormGroup = this._formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      gardenType: ['', Validators.required],
      totalArea: ['', Validators.required]
    });
  
    this.secondFormGroup = this._formBuilder.group({
      poolArea: [''],
      greeneryArea: [''],
      furnitureArea: [''],
      fountainArea: [''],
      tables: [''],
      chairs: [''],
      description: ['']
    });
  }

  onCheckboxChange(option: string, event: any): void {
    if (event.target.checked) {
      this.selectedOptions.push(option);
    } else {
      const index = this.selectedOptions.indexOf(option);
      if (index > -1) {
        this.selectedOptions.splice(index, 1);
      }
    }

    this.finalResult = this.selectedOptions.join(', ');
  }

  nextStep(): void {
    this.currentStep++;
  }

  previousStep(): void {
    this.currentStep--;
  }

  saveGarden(): void {
    const gardenData = {
      username: this.username, 
      name: 'My Beautiful Garden',
      total: this.firstFormGroup.get('totalArea')!.value,
      pool: this.secondFormGroup.get('poolArea')!.value,
      greenery: this.secondFormGroup.get('greeneryArea')!.value,
      tables: this.secondFormGroup.get('tables')!.value,
      chairs: this.secondFormGroup.get('chairs')!.value,
      fountaion: this.secondFormGroup.get('fountainArea')!.value,
      type: this.firstFormGroup.get('gardenType')!.value,
      services: this.selectedOptions
    };

    this.gardenService.createGarden(gardenData).subscribe(response => {
      console.log('Garden created:', response);
    });
  }

  scheduleJob(): void {
    const jobData = {
      username: this.username, 
      firmId: this.firmId, 
      name: 'My Beautiful Garden',
      startDate: this.firstFormGroup.get('date')!.value,
      endDate: null,
      description: this.secondFormGroup.get('description')!.value,
      status: 'Pending'
    };

    this.gardenService.createJob(jobData).subscribe(response => {
      console.log('Job scheduled:', response);
    });
  }
}
