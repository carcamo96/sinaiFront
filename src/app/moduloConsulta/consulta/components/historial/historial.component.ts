import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit, OnDestroy {

  //Para recibir el objeto paciente cargado desde el componente padre (Consulta)
  private eventsSubscription: any;
  @Input() events: Observable<any>;

  //Para enviar el objeto paciente a los componentes hijos (mostrar-paciente, consultas)
  //Uso este objeto Subject para emitir el resultado del evento response al hijo 
  public eventsSubject: Subject<any> = new Subject<any>();


  constructor() { }

  ngOnInit(): void {

    this.eventsSubscription = this.events.subscribe(
      response =>{
          this.eventsSubject.next(response);
      }
    );
  }

  ngOnDestroy(){
      this.eventsSubscription.unsubscribe();
  }

}
