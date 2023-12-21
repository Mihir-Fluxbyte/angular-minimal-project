import { InjectionToken } from '@angular/core';

export const THEME = new InjectionToken<'old' | 'new'>('ThemeToken', {
  providedIn: 'root',
  factory: () => 'old',
});

export const ProvideNewTheme = {
  provide: THEME,
  useValue: 'new',
};

export const ProvideOldTheme = {
  provide: THEME,
  useValue: 'old',
};
