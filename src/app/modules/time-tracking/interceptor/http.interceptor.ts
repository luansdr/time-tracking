import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, delay, retry, shareReplay, throwError, tap } from 'rxjs';
import { IToast } from '../interfaces/IToast.interface';
import { ToastService } from '../../../services/toast.service';
import { LoaderService } from '../../../services/loader-service.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  const _toastService = inject(ToastService);
  const _loaderService = inject(LoaderService); 

  _loaderService.show();

  return next(req).pipe(
    shareReplay(),
    // retry({ count: 2, delay: 1000 }),

    tap({
      complete: () => {
        _loaderService.hide(); 
      }
    }),

    catchError((error: HttpErrorResponse) => {
      _loaderService.hide(); 
      let messageError: IToast = {
        severity: 'error',
        summary: error.error.body,
        detail: `${error.status}`
      }

      if (error.status === 0) {
        messageError = {
          severity: 'warn',
          summary: 'Você está sem conexão',
          detail: `${error.status}`
        }
      }

      _toastService.showToast(messageError);

      return throwError(() => error);
    })
  );
};
