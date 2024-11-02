import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import { CommonModule } from '@angular/common';
import { AnswerStandard } from '../services/answerstandard.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  usuarios: any[] = [];
  publicacao: any[]= [];

  constructor(private connectionService: ConnectionService) {}

  ngOnInit(): void {
    this.connectionService.getUsuarios().subscribe((resp: AnswerStandard) => {
      this.usuarios = resp.data.usuarios;
      console.log(this.usuarios);
    });

    this.connectionService.getPublicacao().subscribe((resp: AnswerStandard) => {
        this.publicacao = resp.data.publicacao;
        console.log(this.publicacao);
      });
    }
}
