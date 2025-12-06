import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Despesa {
  _id?: string;
  tipo: 'receita' | 'despesa';
  categoria: string;
  descricao?: string;
  valor: number;
  data: string; // ISO string (ex: 2025-03-05)
}

@Injectable({
  providedIn: 'root',
})
export class DespesasService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/despesas';

  // 🔹 Listar todas as movimentações
  listar(): Observable<Despesa[]> {
    return this.http.get<Despesa[]>(this.baseUrl);
  }

  // 🔹 Buscar por ID
  buscarPorId(id: string): Observable<Despesa> {
    return this.http.get<Despesa>(`${this.baseUrl}/${id}`);
  }

  // 🔹 Criar receita ou despesa
  criar(despesa: Despesa): Observable<Despesa> {
    return this.http.post<Despesa>(this.baseUrl, despesa);
  }

  // 🔹 Atualizar movimentação
  atualizar(id: string, despesa: Partial<Despesa>): Observable<Despesa> {
    return this.http.put<Despesa>(`${this.baseUrl}/${id}`, despesa);
  }

  // 🔹 Deletar movimentação
  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // 🔹 Filtrar por tipo (receita ou despesa)
  listarPorTipo(tipo: 'receita' | 'despesa'): Observable<Despesa[]> {
    return this.http.get<Despesa[]>(`${this.baseUrl}?tipo=${tipo}`);
  }

  // 🔹 Filtrar por categoria
  listarPorCategoria(categoria: string): Observable<Despesa[]> {
    return this.http.get<Despesa[]>(
      `${this.baseUrl}?categoria=${encodeURIComponent(categoria)}`
    );
  }

  // 🔹 Filtrar por período
  listarPorPeriodo(inicio: string, fim: string): Observable<Despesa[]> {
    return this.http.get<Despesa[]>(
      `${this.baseUrl}?inicio=${inicio}&fim=${fim}`
    );
  }
}
