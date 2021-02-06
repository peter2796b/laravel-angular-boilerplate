import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url;
        let originalUrl = request.url;

        // Check we are not calling another http url
        if (!originalUrl.startsWith('http') && originalUrl.indexOf( 'assets/i18n' ) === -1 ) {
            url = environment.baseAPIUrl;
            url += originalUrl;
        }

        const clonedRequest = request.clone({ url: url});
        return next.handle(clonedRequest);
    }
}
