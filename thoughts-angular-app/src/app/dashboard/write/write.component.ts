import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Blogs } from 'src/app/core/blogs';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
})
export class WriteComponent {
  blogForm: FormGroup;

  blog: Blogs = {
    title: '',
    category: '',
    content: '',
    _id: '',
    userId: '',
    author: '',
    creationDate: new Date(),
    favorite: false,
  };

  constructor(
    public fb: FormBuilder,
    public service: AuthService,
    public router: Router
  ) {
    this.blogForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.blogForm.valid) {
      const blogObject = {
        title: this.blogForm.controls['title'].value,
        category: this.blogForm.controls['category'].value,
        content: this.blogForm.controls['content'].value,
      };
      this.service.postBlog(blogObject).subscribe(
        (res) => {
          this.blog = res;
          this.router.navigate([
            '/dashboard',
            'single-blog-post',
            this.blog._id,
          ]);
        },
        (error) => {
          // Error callback
          console.error(error.error);
        }
      );
    } else {
      Object.values(this.blogForm.controls).forEach((control) =>
        control.markAsTouched()
      );
    }
  }
}
