import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
    static settings: any;
    constructor(private http: HttpClient) { }
    load() {
        const jsonfile = "assets/config.json";
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonfile).toPromise().then((response: any) => {
                AppConfig.settings = response;
                resolve();
            }).catch((response: any) => {
                reject(`Could not load file '${jsonfile}: ${JSON.stringify(response)}`);
            });
        });
    }
}