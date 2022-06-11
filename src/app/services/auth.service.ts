import { Injectable } from "@angular/core";
import { SERVER_URL } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../models/dtos';
import { Observable } from 'rxjs';
import { JwtDto } from "../models/jwt-dto";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    public register(nuevoUsuario: UserDTO): Observable<any> {
        return this.httpClient.post<any>(SERVER_URL + '/register', nuevoUsuario);
    }

    public login(username: string, password: string): Observable<JwtDto> {
        let postData = {
            "username": username,
            "password": password
          }
        return this.httpClient.post<JwtDto>(SERVER_URL + "/authenticate", postData);
    }
}