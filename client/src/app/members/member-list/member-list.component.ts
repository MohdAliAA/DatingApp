import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/Member';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit { 
    memberServices = inject(MembersService);
    //members : Member[] = [];

  ngOnInit(): void {
    if(this.memberServices.member().length == 0) this.loadMembers(); 
    //this.loadMembers();
  }

  loadMembers()
  {
    this.memberServices.getMembers()
  }

  
}



