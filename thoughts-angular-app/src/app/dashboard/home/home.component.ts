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
  filteredBlogs: Blogs[] = [];
  categories: string[] = [];

  constructor(private _http: HttpClient, private _service: AuthService) {}

  ngOnInit(): void {
    this._service.getBlogs().subscribe((res) => {
      this.blogs = res;
      this.categories = [
        ...new Set(this.blogs.map((blog) => blog.category.toLowerCase())),
      ];
      this.filteredBlogs = this.blogs;
    });
  }

  activeCategory: string | null = null;

  handleCategoryChange(category: string): void {
    this.activeCategory = category;

    this.filteredBlogs = this.blogs.filter(
      (blog) => blog.category.toLowerCase() === this.activeCategory
    );

    console.log(this.filteredBlogs);
  }
}
