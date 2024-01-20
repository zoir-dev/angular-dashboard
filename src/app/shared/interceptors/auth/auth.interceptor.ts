import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedRequest = req.clone({
    url: `${environment.apiUrl}/${req.url}`,
  });
  return next(modifiedRequest);
};
