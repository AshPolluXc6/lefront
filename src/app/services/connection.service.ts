import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AnswerStandard } from "./answerstandard.service";

@Injectable({
    providedIn: 'root'
})

export class ConnectionService {

    private apiUrl = '/api/';

    constructor(private http: HttpClient) {}

    getUsuarios(): Observable<AnswerStandard> {
        return this.http.get(this.apiUrl+'usuarios');
    }

    public getPublicacao(): Observable<AnswerStandard> {

        return this.http.get(this.apiUrl+'publicacao')
    }


}