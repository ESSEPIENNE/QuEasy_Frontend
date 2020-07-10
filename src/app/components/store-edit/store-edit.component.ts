import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StoresService } from 'src/app/services/stores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.scss'],
})
export class StoreEditComponent implements OnInit {
  createStoreForm: FormGroup;
  avatar = null;
  avatarUploadPlaceholder: string = 'assets/images/upload.png';

  constructor(private router: Router, private storesService: StoresService) {}

  ngOnInit(): void {
    this.createStoreForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      maxInStore: new FormControl(null, [
        Validators.required,
        Validators.min(0),
      ]),
      maxInQueue: new FormControl(null, [
        Validators.required,
        Validators.min(0),
      ]),
      avatar: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.createStoreForm);
    const formData = new FormData();
    formData.append('avatar', this.createStoreForm.get('avatar').value);
    formData.append(
      'max_in_store',
      this.createStoreForm.get('maxInStore').value
    );
    formData.append(
      'max_in_queue',
      this.createStoreForm.get('maxInQueue').value
    );
    formData.append('name', this.createStoreForm.get('name').value);

    this.storesService
      .createStore(formData)
      .subscribe((_) => this.router.navigateByUrl('/managment'));
  }

  imageUploaded(event) {
    const files = event.target.files;
    if (files.length === 0) return;

    const file = files && files.item(0);

    if (!file) return;

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (_event) => {
      this.avatar = reader.result;
    };

    this.createStoreForm.patchValue({
      avatar: file,
    });
  }
}
