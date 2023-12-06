import { Component, OnInit } from '@angular/core';
import { Ouvrier } from '../../models/ouvrier.model';
import { OuvrierService } from '../../services/ouvrier.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ouvrier',
  templateUrl: './ouvrier.component.html',
  styleUrls: ['./ouvrier.component.scss']
})
export class OuvrierComponent implements OnInit{

  ouvriers: Ouvrier[] = [];

  ouvrierForm: FormGroup;
  

  ouvrier: Ouvrier = {
    id : null,
    fonction: '',
    nom: '',
    numTel: '',
    ville: '',
    salaire: 0
  };
  

  constructor(private ouvrierService: OuvrierService,
    public authService : AuthService,
    private fb : FormBuilder) {
      this.ouvrierForm = this.fb.group({
        fonction: ['', Validators.required],
        nom: ['', Validators.required],
        numTel: ['', Validators.required],
        ville: ['', Validators.required],
        salaire: [0, Validators.required],
      });
    }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour récupérer la liste des ouvriers.'
      });
      return;
    }
    const headers = { Authorization: `Bearer ${token}` };
    this.ouvrierService.getAllOuvriers(headers).subscribe(
      (data: Ouvrier[]) => {
        this.ouvriers = data;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de récupération',
          text: 'Impossible de récupérer la liste des ouvriers.'
        });

        console.error('Erreur lors de la récupération des ouvriers:', error);
      }
    );


    }

//Ajout
addOuvrier() {
  if (this.ouvrierForm.valid) {
    const ouvrier = this.ouvrierForm.value;

    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté...'
      });
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.ouvrierService.addOuvrier(ouvrier, headers).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Enregistré',
          text: 'Ouvrier ajouté avec succès'
        });

        console.log('Ouvrier enregistré:', response);
        this.loadOuvrierList();
        // Réinitialisez le formulaire après l'ajout réussi
        this.ouvrierForm.reset();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Enregistrement non autorisé',
          text: "Vous n'êtes pas autorisé à enregistrer un ouvrier."
        });

        console.error('Erreur lors de l\'enregistrement d\'un ouvrier:', error);
      }
    );
  }
}
    loadOuvrierList() {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = { Authorization: `Bearer ${token}` };
  
        this.ouvrierService.getAllOuvriers(headers).subscribe(
          (data: Ouvrier[]) => {
            this.ouvriers = data;
          },
          (error) => {
            console.error('Erreur lors de la récupération des ouvriers:', error);
          }
        );
      }
    }




  // Méthode pour mettre à jour un bâtiment
  updateOuvrier(ouvrier: Ouvrier) {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Vous devez être connecté pour effectuer cette action.'
      });
      return;
    }

    // Créez un en-tête avec le token JWT
    const headers = { Authorization: `Bearer ${token}` };

    // Appelez la méthode de mise à jour du service
    this.ouvrierService.updateOuvrier(ouvrier, headers).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Mise à jour réussie',
          text: 'L\' ouvrier a été mis à jour avec succès.'
        });

        // Mettez à jour la liste des bâtiments (facultatif)
        this.loadOuvrierList();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur de mise à jour',
          text: 'Impossible de mettre à jour l\' ouvrier.'
        });

        console.error('Erreur lors de la mise à jour du ouvrier:', error);
      }
    );
  }



// Suppression
  deleteOuvrier(id: number) {
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer cet ouvrier ?',
      text: 'L\' ouvrier sera définitivement supprimé!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!'
    }).then((result) => {
      if (result.value) {
        const token = localStorage.getItem('token');
  
        if (!token) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Vous devez être connecté en tant qu\'administrateur pour effectuer cette action.'
          });
          return;
        }
  
        const headers = { Authorization: `Bearer ${token}` };
  
        this.ouvrierService.deleteOuvrier(id, headers).subscribe(
          () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'L\' ouvrier a été supprimé avec succès.',
              icon: 'success'
            });
            this.ouvrierService.getAllOuvriers(headers).subscribe(updatedOuvrier => {
              this.ouvriers = updatedOuvrier;
            });
          },
          (error) => {
            Swal.fire({
              title: 'Oups!',
              text: 'Impossible de supprimer cet ouvrier.',
              icon: 'error'
            });
          }
        );
      }
    });

}
}
