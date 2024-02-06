import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteHeadlineContainerComponent } from './quote-headline-container.component';

describe('QuoteHeadlineContainerComponent', () => {
  let component: QuoteHeadlineContainerComponent;
  let fixture: ComponentFixture<QuoteHeadlineContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteHeadlineContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuoteHeadlineContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
