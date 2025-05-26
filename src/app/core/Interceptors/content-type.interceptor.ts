
import { HttpInterceptorFn, HttpHeaders } from '@angular/common/http';


export const contentTypeInterceptor: HttpInterceptorFn = (req, next) => {
    if (!req.headers.has('Content-Type') && !(req.body instanceof FormData)) {
    const clonedRequest = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
    return next(clonedRequest);
    }
  return next(req);
}