import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Blogs } from 'src/app/core/blogs';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  blogs: Blogs[] = [];

  constructor(private _http: HttpClient, private _service: AuthService) {}

  ngOnInit(): void {
    this._service.getBlogs().subscribe((res) => (this.blogs = res));
  }

  activeCategory: string | null = null;

  get uniqueCategories(): string[] {
    return [...new Set(this.blogs.map(blog => blog.category.toLowerCase()))];
  }

  handleCategoryChange(category: string): void {
    this.activeCategory = category;
    // Add your logic when a category button is clicked
  }
}
