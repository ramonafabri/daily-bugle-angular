import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ArticleListItemModel} from '../../models/articleListItem.model';
import {DailyBugleService} from '../../services/daily-bugle.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryDetailsModel} from '../../models/categoryDetails.model';

@Component({
  selector: 'app-article-list',
  standalone: false,
  templateUrl: './article-list.html',
  styleUrl: './article-list.css',
})
export class ArticleList implements OnInit {

  articles: ArticleListItemModel[] = [];
  mode: 'keyword' | 'category' = 'keyword';

  keyword: string = '';
  category: string = '';
  hasSearched: boolean = false;

  categories: CategoryDetailsModel[] = [];

  constructor(private dailyBugleService: DailyBugleService,
              private router: Router,
              private changeDetectorRef: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute) {

  }

  loadArticles(): void {
    this.dailyBugleService.getAllArticles().subscribe({
      next: (data) => {
        console.log('Get all articles');
        this.articles = data;
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void {

    //  categories külön betöltése
    this.dailyBugleService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      }
    });

    //  query param kezelés
    this.activatedRoute.queryParams.subscribe(params => {

      const category = params['category'];

      if (category) {
        console.log('CATEGORY FILTER:', category);

        this.dailyBugleService.getArticlesByCategory(category).subscribe({
          next: (data) => {
            this.articles = data;
            this.changeDetectorRef.detectChanges();
          },
          error: (err) => {
            console.error(err);
          }
        });

      } else {
        this.loadArticles();
      }

    });

  }


  searchByKeyword(): void {
    this.dailyBugleService.getArticlesByKeyword(this.keyword).subscribe({
      next: (data) => {
        this.articles = data;
        this.hasSearched = true;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  searchByCategory(): void {
    this.dailyBugleService.getArticlesByCategory(this.category).subscribe({
      next: (data) => {
        this.articles = data;
        this.hasSearched = true;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

}
