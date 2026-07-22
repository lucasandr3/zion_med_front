import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ScreenService {
    responsiveBreakpoint: string;
    responsiveFilterBreakpoint: string;

    constructor() {
        this.responsiveBreakpoint = this.getResponsiveBreakpoint();
        this.responsiveFilterBreakpoint = this.getResponsiveFilterBreakpoint();
    }

    getResponsiveBreakpoint() {
        let breakpoint = 'sm';

        if (window.innerWidth >= 1536) breakpoint = '2xl';
        else if (window.innerWidth >= 1280) breakpoint = 'xl';
        else if (window.innerWidth >= 1024) breakpoint = 'lg';
        else if (window.innerWidth >= 768) breakpoint = 'md';
        //else if (window.innerWidth >= 640) breakpoint = 'sm';

        this.responsiveBreakpoint = breakpoint;

        return breakpoint;
    }

    getResponsiveFilterBreakpoint() {
        let breakpoint = 'sm';

        if (window.innerWidth >= 1681) breakpoint = 'xl';
        else if (window.innerWidth >= 768) breakpoint = 'sm';

        this.responsiveBreakpoint = breakpoint;

        return breakpoint;
    }

    isMobile() {
        return ['sm', 'md', 'lg'].includes(this.getResponsiveBreakpoint());
    }

    isFilterMobile() {
        return ['sm'].includes(this.getResponsiveFilterBreakpoint());
    }
}
