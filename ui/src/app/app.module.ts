import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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

// === Library ===
import { DialogLibrary } from '../providers/library/DialogLibrary';

// === API ===
import { ApiAccessor } from '../providers/api/api-accessor';

// === ng2-chart ===
import { ChartsModule } from 'ng2-charts/ng2-charts';
import '../../node_modules/chart.js/dist/Chart.min.js';


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
		JsonpModule,
		ChartsModule
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
	providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ApiAccessor, DialogLibrary],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
