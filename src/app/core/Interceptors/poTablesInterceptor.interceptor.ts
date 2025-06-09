import {
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../environment/env';

export const poTableInterceptor: HttpInterceptorFn = (req, next) => {
  const isPoTableQuery =
    req.method === 'GET' &&
    req.url.startsWith(`${environment.api.urlBase}${environment.api.endpoints.sql}`);

  if (isPoTableQuery) {
    // Extrair os parâmetros da URL
    const url = new URL(req.url, window.location.origin);
    const page = Number(url.searchParams.get('page')) || 1;
    const pageSize = Number(url.searchParams.get('pageSize')) || 10;
    const filters = url.searchParams.get('filters') || null;
    const order = url.searchParams.get('order') || null;

    // Montar uma query SQL simples (você pode substituir por lógica mais dinâmica)
    const sql = `SELECT * FROM publicacao LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`;

    const newReq = req.clone({
      method: 'POST',
      body: { q: sql },
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        ...req.headers.keys().reduce((acc, key) => {
          acc[key] = req.headers.get(key)!;
          return acc;
        }, {} as { [key: string]: string })
      }),
      url: req.url.split('?')[0] // Remove os parâmetros da URL
    });

    return next(newReq).pipe(
      map(response => {
        if (response instanceof HttpResponse) {
          const originalItems = response.body;

          // Mapeia os dados para o formato esperado pelo PO UI
          const mappedItems = Array.isArray(originalItems)
            ? originalItems.map((item: any) => ({
                id: item.publicacao_id,
                nome: item.nome,
                imagemcapa: item.imagemcapa,
                imagem: item.imagem,
                data: item.datacadastro,  
                alteracao: item.dataalterado,
                nota: item.nota ,
              }))
            : [];

          return response.clone({
            body: {
              items: mappedItems,
              hasNext: false
            }
          });
        }
        return response;
      }),
      catchError(error => {
        console.error('[PO-TABLE-INTERCEPTOR] Erro na requisição SQL:', error);
        return of(
          new HttpResponse({
            status: 200,
            body: {
              items: [],
              hasNext: false
            }
          })
        );
      })
    );
  }

  return next(req);
};
