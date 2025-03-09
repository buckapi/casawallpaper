import { Injectable, OnDestroy } from '@angular/core';
import PocketBase from 'pocketbase';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RealtimeImagesService implements OnDestroy {
  private pb: PocketBase;
  private imagesSubject = new BehaviorSubject<any[]>([]);

  // Esta es la propiedad que expondrá el Observable para que los componentes puedan suscribirse a ella
  public images$: Observable<any[]> =
    this.imagesSubject.asObservable();

  constructor() {
    this.pb = new PocketBase('https://db.camiwa.com:8092');
    this.subscribeToImages();
  }

  private async subscribeToImages() {
    // (Opcional) Autenticación
    await this.pb
      .collection('users')
      .authWithPassword('admin@email.com', 'admin1234');

    // Suscribirse a cambios en cualquier registro de la colección 'supervisors'
    this.pb.collection('casaGallery').subscribe('*', (e) => {
      this.handleRealtimeEvent(e);
    });

    // Inicializar la lista de esupervisoras
    this.updateImagesList();
  }

  private handleRealtimeEvent(event: any) {
    // Aquí puedes manejar las acciones 'create', 'update' y 'delete'
    console.log(event.action);
    console.log(event.record);

    // Actualizar la lista de esupervisoras
    this.updateImagesList();
  }

  private async updateImagesList() {
    // Obtener la lista actualizada de esupervisoras
    const records = await this.pb
      .collection('casaGallery')
      .getFullList(200 /* cantidad máxima de registros */, {
        sort: '-created', // Ordenar por fecha de creación
      });
    this.imagesSubject.next(records);
  }

  ngOnDestroy() {
    // Desuscribirse cuando el servicio se destruye
    this.pb.collection('casaGallery').unsubscribe('*');
  }

  getImagesCount(): number {
    return this.imagesSubject.value.length;
  } 
}
