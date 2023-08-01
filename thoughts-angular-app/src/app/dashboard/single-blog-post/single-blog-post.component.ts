import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { Blogs } from 'src/app/core/blogs';

@Component({
  selector: 'app-single-blog-post',
  templateUrl: './single-blog-post.component.html',
  styleUrls: ['./single-blog-post.component.scss'],
})
export class SingleBlogPostComponent implements OnInit {
  id: string = '';
  blog: Blogs[] = [];
  constructor(private route: ActivatedRoute, private service: AuthService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['blogId'];
    });

    this.service.getSingleBlog(this.id).subscribe((res) => {
      this.blog = res;
      console.log(this.blog);
    });
  }
}
