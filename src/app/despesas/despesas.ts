// Importa os elementos principais do Angular
import { Component, OnInit } from '@angular/core';

// Módulo comum (ngIf, ngFor, pipes, etc.)
import { CommonModule } from '@angular/common';

// Módulo de formulários (ngModel)
import { FormsModule } from '@angular/forms';

// Importa o service responsável pela comunicação com a API
// e a interface que representa uma despesa
import { DespesasService, Despesa } from '../Services/despesas-service';

// Decorator que define este arquivo como um componente Angular
@Component({
  // Nome da tag HTML do componente
  selector: 'app-despesas',

  // Indica que o componente é standalone (Angular moderno)
  standalone: true,

  // Módulos necessários para o funcionamento do template
  imports: [CommonModule, FormsModule],

  // Arquivo HTML do componente
  templateUrl: './despesas.html',

  // Arquivo CSS do componente
  styleUrls: ['./despesas.css'],
})
export class Despesas implements OnInit {

  // ========================
  // VARIÁVEIS DO FORMULÁRIO
  // ========================

  // Tipo da movimentação (receita ou despesa)
  tipo: 'receita' | 'despesa' | '' = '';

  // Categoria da despesa
  categoria = '';

  // Descrição opcional
  descricao = '';

  // Valor monetário da despesa
  valor!: number;

  // Data da movimentação
  data = '';

  // ========================
  // LISTA DE DESPESAS
  // ========================

  // Array que armazena as despesas vindas da API
  despesas: Despesa[] = [];

  // ========================
  // CONTROLE DE ESTADO
  // ========================

  // Indica se os dados estão sendo carregados
  carregando = false;

  // Indica se o formulário está salvando
  salvando = false;

  // Armazena mensagens de erro para exibição na tela
  erro = '';

  // ========================
  // CONSTRUTOR
  // ========================

  // Injeta o service de despesas
  constructor(
    private service: DespesasService
  ) {}

  // ========================
  // CICLO DE VIDA
  // ========================

  // Executado automaticamente ao iniciar o componente
  ngOnInit(): void {
    // Carrega as despesas ao abrir a página
    this.carregar();
  }

  // ========================
  // MÉTODO: CARREGAR DESPESAS
  // ========================

  carregar(): void {
    // Ativa o estado de carregamento
    this.carregando = true;

    // Chamada à API para listar despesas
    this.service.listar().subscribe({
      // Em caso de sucesso
      next: dados => {
        this.despesas = dados;
        this.carregando = false;
      },
      // Em caso de erro
      error: () => {
        this.erro = 'Erro ao carregar despesas';
        this.carregando = false;
      }
    });
  }

  // ========================
  // MÉTODO: CRIAR DESPESA
  // ========================

  criar(): void {
    // Limpa mensagem de erro
    this.erro = '';

    // Indica que está salvando
    this.salvando = true;

    // Validação simples dos campos obrigatórios
    if (!this.tipo || !this.categoria || !this.valor || !this.data) {
      this.erro = 'Preencha todos os campos obrigatórios';
      this.salvando = false;
      return;
    }

    // Monta o objeto despesa conforme o model
    const novaDespesa: Despesa = {
      tipo: this.tipo,
      categoria: this.categoria,
      descricao: this.descricao,
      valor: this.valor,
      data: this.data
    };

    // Envia a despesa para a API
    this.service.criar(novaDespesa).subscribe({
      // Em caso de sucesso
      next: () => {
        this.limparFormulario();
        this.carregar();
        this.salvando = false;
      },
      // Em caso de erro
      error: () => {
        this.erro = 'Erro ao salvar despesa';
        this.salvando = false;
      }
    });
  }

  // ========================
  // MÉTODO: EXCLUIR DESPESA
  // ========================

  excluir(id?: string): void {
    // Se não houver ID, não faz nada
    if (!id) return;

    // Confirmação do usuário
    if (!confirm('Deseja realmente excluir esta despesa?')) return;

    // Chamada à API para excluir
    this.service.excluir(id).subscribe({
      // Em caso de sucesso
      next: () => this.carregar(),
      // Em caso de erro
      error: () => this.erro = 'Erro ao excluir despesa'
    });
  }

  // ========================
  // LIMPAR FORMULÁRIO
  // ========================

  // Método privado para resetar os campos do formulário
  private limparFormulario(): void {
    this.tipo = '';
    this.categoria = '';
    this.descricao = '';
    this.valor = 0;
    this.data = '';
  }
}
