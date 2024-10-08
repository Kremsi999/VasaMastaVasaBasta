import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwnerFirmsService } from '../services/owner-firms.service';
import { Comment } from '../models/Comment';

@Component({
  selector: 'app-firm-details',
  templateUrl: './firm-details.component.html',
  styleUrls: ['./firm-details.component.css']
})
export class FirmDetailsComponent {
  firm: any;
  comments: Comment[] = [];
  showWizard: boolean = false

  constructor(private route: ActivatedRoute, private firmService: OwnerFirmsService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.firmService.getFirmById(id!).subscribe(data => {
      this.firm = data.firm;
      this.comments = data.comments;
    });
  }
  zakazi() {
    this.showWizard = true
  }
  otkazi() {
    this.showWizard = false
  }
}
