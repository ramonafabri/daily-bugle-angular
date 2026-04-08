import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryDetailsModel} from '../../models/categoryDetails.model';
import {DailyBugleService} from '../../services/daily-bugle.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-article-create',
  standalone: false,
  templateUrl: './article-create.html',
  styleUrl: './article-create.css',
})
export class ArticleCreate implements OnInit {

  articleForm: FormGroup;
  categories: CategoryDetailsModel[] = [];

  constructor(private formBuilder: FormBuilder,
              private dailyBugleService: DailyBugleService,
              private router: Router) {
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      synopsis: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
      publishAt: ['', [Validators.required, Validators.min(2026), Validators.max(2100)]],
      keywords: ['', this.keywordsValidator]
    })
  }


  ngOnInit(): void {
    this.dailyBugleService.getFormInitData().subscribe({
      next: (data) => {
        console.log('Get form init data');
        this.categories = data.categories;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  protected onSubmit() {
    const formValue = this.articleForm.value;

    const request = {
      ...formValue,
      keywords: formValue.keywords
        ? formValue.keywords.split(',').map((k: string) => k.trim())
        : []
    };

    this.dailyBugleService.createMovie(request as any).subscribe({
      next: () => {
        console.log('Article created');
        this.articleForm.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  // categoryValidator(control: any): { tooMany: boolean } | null {
  //   if (control.value && control.value.length > 3) {
  //     return { tooMany: true };
  //   }
  //   return null;
  // }

  keywordsValidator(control: any): { invalidFormat: boolean } | null {
    if (!control.value) return null;
    const value = control.value;
    const isValid = value.includes(',');
    return isValid ? null : {invalidFormat: true};
  }


}
