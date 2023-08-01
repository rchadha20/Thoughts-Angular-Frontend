import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { WriteComponent } from './write/write.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { SingleBlogPostComponent } from './single-blog-post/single-blog-post.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    WriteComponent,
    HomeComponent,
    BlogsComponent,
    SingleBlogPostComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class DashboardModule {}
