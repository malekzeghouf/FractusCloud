import { Component } from '@angular/core';
import { ServiceService } from '../cours/service.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent {
  statistiques: any;
  myChartCircle: any;
  myChartBar: any;

  constructor(private statistiquesService: ServiceService) { }

  ngOnInit(): void {
    this.obtenirStatistiques();
  }

  obtenirStatistiques(): void {
    this.statistiquesService.obtenirStatistiquesParticipations()
      .subscribe(
        data => {
          this.statistiques = data;
          this.genererGraphiques();
        },
        error => {
          console.log(error);
        }
      );
  }

  genererGraphiques(): void {
    const labels = Object.keys(this.statistiques);
    const data = Object.values(this.statistiques);

    // Générer le graphique en cercle (cercle)
    const ctxCircle = document.getElementById('graphiqueCercle') as HTMLCanvasElement;
    this.myChartCircle = new Chart(ctxCircle, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Statistiques des participations par Cours',
          data: data.map(value => value as number),
         
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        // Autres options de configuration du graphique en cercle
      }
    });

    // Générer le graphique en courbe des barres (barres)
    const ctxBar = document.getElementById('graphiqueBarres') as HTMLCanvasElement;
    this.myChartBar = new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Statistiques des participations par cours',
          data: data.map(value => value as number),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        // Autres options de configuration du graphique en courbe des barres
      }
    });
  }
}

