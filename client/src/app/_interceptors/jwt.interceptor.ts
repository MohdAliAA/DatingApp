import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AccountService } from "../_services/account.service";


export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const acountService = inject(AccountService);

    if (acountService.currentUser()){
        req =req.clone({
            setHeaders: {
                Authorization: `Bearer ${acountService.currentUser()?.token}` 
            }
        })
    } 
    return next(req)
}