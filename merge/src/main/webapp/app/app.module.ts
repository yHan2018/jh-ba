import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { NbThemeModule } from '@nebular/theme';

import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { MergeSharedModule, UserRouteAccessService } from './shared';
import { MergeAppRoutingModule} from './app-routing.module';
import { MergeHomeModule } from './home/home.module';
import { MergeAdminModule } from './admin/admin.module';
import { MergeAccountModule } from './account/account.module';
import { MergeEntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { StateStorageService } from './shared/auth/state-storage.service';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,

    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        MergeAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        MergeSharedModule,
        MergeHomeModule,
        MergeAdminModule,
        MergeAccountModule,
        MergeEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        NbThemeModule.forRoot({ name: 'default' }), // this will enable the default theme, you can change this to `cosmic` to enable the dark theme
    ],
    declarations: [
        JhiMainComponent,
        ErrorComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                StateStorageService,
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class MergeAppModule {}
