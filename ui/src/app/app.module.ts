import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';

// === Pages ===
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { PortfolioListPage } from '../pages/portfolio-list/portfolio-list';
import { PortfolioPage } from '../pages/portfolio/portfolio';
import { BrandPage } from '../pages/brand/brand';


// === Dialog ===
import { EditPortfolioDialogPage } from '../pages/edit-portfolio-dialog/edit-portfolio-dialog';


// === API ===
import { ApiService } from '../providers/api/api-service';
// import { PortfolioApiService } from '../providers/api/PortfolioApiService';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		MenuPage,
		PortfolioListPage,
		PortfolioPage,
		BrandPage,
		EditPortfolioDialogPage,
	],
	imports: [
		IonicModule.forRoot(MyApp),
		HttpModule,
		JsonpModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		MenuPage,
		PortfolioListPage,
		PortfolioPage,
		BrandPage,
		EditPortfolioDialogPage,
	],
	providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ApiService]
})
export class AppModule {}
