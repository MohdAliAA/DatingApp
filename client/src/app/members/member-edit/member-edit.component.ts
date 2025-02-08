import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/Member';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {FormsModule, NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [TabsModule, GalleryModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit{
  private accountService = inject(AccountService);
  private memberService = inject(MembersService);
  private toaster = inject(ToastrService);
  member?: Member;
  images : GalleryItem[] = [];
  @ViewChild('editform') editform?: NgForm;
  @HostListener('window: beforeunload', ['$event']) notify($event: any){
    if(this.editform?.dirty){
      $event.returnValue = true;
    }
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember()
  {
    const user = this.accountService.currentUser();
    if(user == null) return;
    this.memberService.getMember(user.username).subscribe({
      next: member => {this.member = member;
      member.photos.map(p => {
        this.images.push
        (new ImageItem({src: p.url, thumb: p.url}))
      })}
    })
  }

  UpdateMember(){
    this.memberService.updateMember(this.editform?.value).subscribe({
      next: _ =>{ 
      this.toaster.success('Profile updated succesfully!');
      this.editform?.reset(this.member);
      }
    });
  }

}
