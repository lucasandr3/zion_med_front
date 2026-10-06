import { type ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  InjectionToken,
  Injector,
  PLATFORM_ID,
  TemplateRef,
  type ViewContainerRef,
} from '@angular/core';

import { GestgoDialogRef } from './dialog-ref';
import { GestgoDialogComponent, GestgoDialogOptions } from './dialog.component';

type ContentType<T> = ComponentType<T> | TemplateRef<T> | string;

export const Z_MODAL_DATA = new InjectionToken<any>('Z_MODAL_DATA');

@Injectable({
  providedIn: 'root',
})
export class GestgoDialogService {
  private overlay = inject(Overlay);
  private injector = inject(Injector);
  private platformId = inject(PLATFORM_ID);

  create<T, U>(config: GestgoDialogOptions<T, U>): GestgoDialogRef<T> {
    return this.open<T, U>(config.zContent as ComponentType<T>, config);
  }

  private open<T, U>(componentOrTemplateRef: ContentType<T>, config: GestgoDialogOptions<T, U>) {
    const overlayRef = this.createOverlay();

    if (!overlayRef) {
      return new GestgoDialogRef(
        undefined as unknown as OverlayRef,
        config,
        undefined as unknown as GestgoDialogComponent<T, U>,
        this.platformId,
      );
    }

    const dialogContainer = this.attachDialogContainer<T, U>(overlayRef, config);
    const dialogRef = this.attachDialogContent<T, U>(componentOrTemplateRef, dialogContainer, overlayRef, config);

    dialogContainer.dialogRef = dialogRef;

    return dialogRef;
  }

  private createOverlay(): OverlayRef | undefined {
    if (isPlatformBrowser(this.platformId)) {
      const overlayConfig = new OverlayConfig({
        hasBackdrop: true,
        positionStrategy: this.overlay.position().global(),
      });

      return this.overlay.create(overlayConfig);
    }

    return undefined;
  }

  private attachDialogContainer<T, U>(overlayRef: OverlayRef, config: GestgoDialogOptions<T, U>) {
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: OverlayRef, useValue: overlayRef },
        { provide: GestgoDialogOptions, useValue: config }],
    });

    const containerPortal = new ComponentPortal<GestgoDialogComponent<T, U>>(
      GestgoDialogComponent,
      config.zViewContainerRef,
      injector,
    );

    const containerRef = overlayRef.attach<GestgoDialogComponent<T, U>>(containerPortal);

    return containerRef.instance;
  }

  private attachDialogContent<T, U>(
    componentOrTemplateRef: ContentType<T>,
    dialogContainer: GestgoDialogComponent<T, U>,
    overlayRef: OverlayRef,
    config: GestgoDialogOptions<T, U>,
  ) {
    const dialogRef = new GestgoDialogRef<T>(overlayRef, config, dialogContainer, this.platformId);

    if (componentOrTemplateRef instanceof TemplateRef) {
      dialogContainer.attachTemplatePortal(
        new TemplatePortal<T>(
          componentOrTemplateRef,
          null as unknown as ViewContainerRef,
          {
            dialogRef,
          } as T,
        ),
      );
    } else if (typeof componentOrTemplateRef !== 'string') {
      const injector = this.createInjector<T, U>(dialogRef, config);
      const contentRef = dialogContainer.attachComponentPortal<T>(
        new ComponentPortal(componentOrTemplateRef, config.zViewContainerRef, injector),
      );
      dialogRef.componentInstance = contentRef.instance;
    }

    return dialogRef;
  }

  private createInjector<T, U>(dialogRef: GestgoDialogRef<T>, config: GestgoDialogOptions<T, U>) {
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: GestgoDialogRef, useValue: dialogRef },
        { provide: Z_MODAL_DATA, useValue: config.zData }],
    });
  }
}
