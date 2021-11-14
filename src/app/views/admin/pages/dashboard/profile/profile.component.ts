import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/core/_service/profile/profileService..service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:user;
  constructor(
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute
  ) {
   }

  ngOnInit(): void {
    this.profileService.getProfile(this.activatedRoute.snapshot.paramMap.get("id")).subscribe(
      dt => {
        this.user = dt.Data[0];
      }
    )
  }

}
