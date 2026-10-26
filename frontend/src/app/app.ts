import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Photo {
  id: number;
  title: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  private api = 'http://localhost:3000/api';
  photos: Photo[] = [];
  category = 'All';
  showManager = false;
  notice = '';
  photoForm = { title: '', category: 'Nature', image: '' };
  contact = { name: '', email: '', message: '' };

  ngOnInit() { this.loadPhotos(); }

  loadPhotos() {
    this.http.get<Photo[]>(`${this.api}/photos`).subscribe({
      next: data => this.photos = data,
      error: () => this.notice = 'Cannot reach the server. Start the backend first.'
    });
  }

  get categories() {
    return ['All', ...new Set(this.photos.map(photo => photo.category))];
  }

  get visiblePhotos() {
    return this.category === 'All'
      ? this.photos
      : this.photos.filter(photo => photo.category === this.category);
  }

  addPhoto() {
    this.http.post<Photo>(`${this.api}/photos`, this.photoForm).subscribe({
      next: () => {
        this.photoForm = { title: '', category: 'Nature', image: '' };
        this.notice = 'Photo added to your gallery.';
        this.loadPhotos();
      },
      error: () => this.notice = 'Could not add photo. Check the form and server.'
    });
  }

  deletePhoto(id: number) {
    if (!confirm('Delete this photo from the gallery?')) return;
    this.http.delete(`${this.api}/photos/${id}`).subscribe({
      next: () => {
        this.notice = 'Photo deleted.';
        this.loadPhotos();
      },
      error: () => this.notice = 'Could not delete photo.'
    });
  }

  sendMessage() {
    this.http.post<{ message: string }>(`${this.api}/contact`, this.contact).subscribe({
      next: result => {
        this.notice = result.message;
        this.contact = { name: '', email: '', message: '' };
      },
      error: () => this.notice = 'Message could not be sent. Please try again.'
    });
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
