import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Blogs } from 'src/app/core/blogs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent {
  @Input('blog') blog!: Blogs;

  formateDate(creationDate: Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };

    let date = new Date(creationDate);

    return date.toLocaleDateString('en-US', options);
  }
}
