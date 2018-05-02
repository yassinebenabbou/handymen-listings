import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../../../animations/slide-in-out.animation';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class ShowUserComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
  this.userService.getProfile(id)
      .subscribe(user => {
        this.user = user;
        console.log('from show', user);
      });
  }

}
