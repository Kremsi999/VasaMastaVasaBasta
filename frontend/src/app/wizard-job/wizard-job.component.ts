import { Component } from '@angular/core';
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

  constructor(
    private _formBuilder: FormBuilder,
    private gardenService: GardenService,
    private jobService: JobService
  ) {
    this.firstFormGroup = this._formBuilder.group({});
    this.secondFormGroup = this._formBuilder.group({});
  }

  ngOnInit(): void {
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

  nextStep(): void {
    this.currentStep++;
  }

  previousStep(): void {
    this.currentStep--;
  }

  saveGarden(): void {
    const gardenData = {
      ownerId: '12345', // Пример: добијен из сесије или ауторизације
      name: 'My Beautiful Garden',
      total: this.firstFormGroup.get('totalArea')!.value,
      pool: this.secondFormGroup.get('poolArea')!.value,
      greenery: this.secondFormGroup.get('greeneryArea')!.value,
      tables: this.secondFormGroup.get('tables')!.value,
      chairs: this.secondFormGroup.get('chairs')!.value,
      fountaion: this.secondFormGroup.get('fountainArea')!.value,
      type: this.firstFormGroup.get('gardenType')!.value
    };

    this.gardenService.createGarden(gardenData).subscribe(response => {
      console.log('Garden created:', response);
    });
  }

  scheduleJob(): void {
    const jobData = {
      gardenId: '...', // ID баште након креирања
      firmId: '...', // ID фирме која ће уређивати башту
      startDate: this.firstFormGroup.get('date')!.value,
      endDate: null, // Опционо
      description: this.secondFormGroup.get('description')!.value,
      status: 'Pending'
    };

    this.jobService.createJob(jobData).subscribe(response => {
      console.log('Job scheduled:', response);
    });
  }
}
