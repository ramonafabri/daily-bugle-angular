import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HomeResponseModel} from '../../models/homeResponse.model';
import {DailyBugleService} from '../../services/daily-bugle.service';
import {Router} from '@angular/router';
import {ArticleDetailModel} from '../../models/articleDetail.model';
import {CategoryDetailsModel} from '../../models/categoryDetails.model';



@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {

  homepage: HomeResponseModel | null = null;
  featuredArticle: ArticleDetailModel | null = null;
  latestArticles: ArticleDetailModel[] = [];
  categories: CategoryDetailsModel[] = [];
  breakingNews: string[] = [];

  constructor(private dailyBugleService: DailyBugleService,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log('HOME INIT');
    this.dailyBugleService.getHomePageData().subscribe({
      next: (data) => {
        console.log('HOME DATA:', data);
        this.homepage = data;
        this.latestArticles = data.latest.slice(1);
        console.log('FEATURED:', this.featuredArticle);
        console.log('LATEST:', data.latest);

        this.breakingNews = data.topRated
          .slice(0, 3)
          .map(a => a.title);

        console.log('BREAKING:', this.breakingNews);

        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        console.error('HOME ERROR:',err);
      }
    });
    this.dailyBugleService.getCategories().subscribe({
      next: (data) => {
        console.log('CATEGORIES:', data);
        this.categories = data;
      },
      error: (err) => {
        console.error('CATEGORY ERROR:', err);
      }
    });
  }

  goToCategory(category: string) {
    this.router.navigate(['/article-list'], {
      queryParams: { category }
    });
  }


  loadHome() {
    this.dailyBugleService.getHomePageData().subscribe({
      next: (data) => {
        this.homepage = data;
      }
    });
  }

}
