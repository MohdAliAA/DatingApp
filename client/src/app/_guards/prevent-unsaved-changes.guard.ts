import { CanDeactivateFn } from '@angular/router';
import { MembersService } from '../_services/members.service';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {

    const memberService = inject(MembersService);
    const accountservice = inject(AccountService);
    const toastr = inject(ToastrService);
  if(component.editform?.dirty)
    {
      return confirm('Are you sure you want to continue? Changes may not be saved.')
    }  
    return true;
};
