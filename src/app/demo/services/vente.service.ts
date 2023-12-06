import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vente } from '../models/vente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

    //Ajout
    addVente(vente: Vente, headers: any): Observable<any> {
      const url = `${this.baseUrl}/vente/add`;
      return this.http.post(url, vente, { headers });
    }
  
    //Récupération
    getAllVentes(headers: any): Observable<Vente[]> {
      return this.http.get<Vente[]>(`${this.baseUrl}/vente/all`, { headers });
    }
  
  
    // Mise à jour
    updateVente(vente: Vente, headers: any): Observable<any> {
      const url = `${this.baseUrl}/vente/update`;
      return this.http.put(url, vente, { headers });
    }
  
    // Suppression
    deleteVente(id: number, headers: any): Observable<any> {
    const url = `${this.baseUrl}/vente/delete/${id}`;
    return this.http.delete(url, { headers });
  }

    //Récupération des ventes total de poulet 
    sommeTotalVentePoulet(headers : any):Observable<number> {
      const url = `${this.baseUrl}/vente/ventePoulets`;
      return this.http.get<number>(url,{headers})
    }

    //Récupération des ventes total des oeufs 
    sommeTotalVenteOeuf(headers : any):Observable<number> {
        const url = `${this.baseUrl}/vente/venteOeufs`;
        return this.http.get<number>(url,{headers})
      }

      nbrOeufVendu(headers : any):Observable<number> {
        const url = `${this.baseUrl}/vente/nbrOeufVendu`;
        return this.http.get<number>(url,{headers})
      }
}
