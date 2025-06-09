import { Injectable } from '@angular/core';
import { environment } from '../environment/env';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private apiUrl = environment.api.urlBase;

    constructor(private http: HttpClient){}

    private getHeaders(): HttpHeaders {
        // const token = localStorage.getItem('access_token');
        return new HttpHeaders({
            // 'Content-Type': 'application/json',
            // 'Authorization': token ? `Bearer ${token}` : ''
        });
    }

    post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, body, {
      headers: this.getHeaders()
    });
  }

    get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, {
      headers: this.getHeaders(),
      params: params
    });
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, body, {
      headers: this.getHeaders()
    });
  }

  delete<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`, {
      headers: this.getHeaders(),
      params: params
    });
  }


  query<T>(sql: string): Observable<T> {
    alert('chamou');
  return this.post<T>(environment.api.endpoints.sql, { q: sql }).pipe(
    catchError(error => {
      console.error('Erro na query:', error);
      throw error;
    })
  );
}
    


}