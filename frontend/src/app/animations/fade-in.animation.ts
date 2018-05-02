import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
  trigger('fadeInAnimation', [
    // route 'enter' transition
    transition(':enter', [

      // css at start of transition
      style({ opacity: 0 }),

      // animation and css at end of transition
      animate('.1s', style({ opacity: 1 }))
    ]),
  ]);
