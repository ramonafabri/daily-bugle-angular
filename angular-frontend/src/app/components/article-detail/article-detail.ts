import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArticleDetailModel} from '../../models/articleDetail.model';
import {DailyBugleService} from '../../services/daily-bugle.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-article-detail',
  standalone: false,
  templateUrl: './article-detail.html',
  styleUrl: './article-detail.css',
})
export class ArticleDetail implements OnInit {

  id!: number;
  article: ArticleDetailModel | null = null;
  loading = false;
  commentContent = '';
  hoveredRating = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private dailyBugleService: DailyBugleService,
              private changeDetectorRef: ChangeDetectorRef,
              protected authService: AuthService,) {
  }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.id = id;
    this.loading = true;
    this.article = null;


    this.dailyBugleService.getArticleById(id).subscribe({
      next: (data) => {
        console.log('MEGJÖTT:', data);

        this.article = data;
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        console.error('HTTP HIBA:', err);
        this.loading = false;
      }
    });
  }

  submitComment() {
    if (!this.commentContent.trim()) return;
    this.dailyBugleService.createComment(this.id, this.commentContent).subscribe({
      next: () => {
        this.commentContent = '';
        this.reloadArticle();
      },
      error: (err) => console.error(err)
    });
  }

  reloadArticle() {
    this.dailyBugleService.getArticleById(this.id).subscribe({
      next: (data) => {
        this.article = data;
        this.changeDetectorRef.detectChanges();
      }
    });
  }

  rateArticle(value: number) {
    const numericValue = Number(value);
    console.log('VALUE:', numericValue);
    this.dailyBugleService.createRating(this.id, numericValue).subscribe({
      next: () => {
        console.log('RATED: ', value);

        this.reloadArticle();
      },
      error: (err) => {
      console.error(err)
      }
    });
  }

}
