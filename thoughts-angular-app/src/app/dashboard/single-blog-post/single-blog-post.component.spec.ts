import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBlogPostComponent } from './single-blog-post.component';

describe('SingleBlogPostComponent', () => {
  let component: SingleBlogPostComponent;
  let fixture: ComponentFixture<SingleBlogPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleBlogPostComponent]
    });
    fixture = TestBed.createComponent(SingleBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
