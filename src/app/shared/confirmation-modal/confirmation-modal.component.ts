import { Component, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DSpaceObject } from '../../core/shared/dspace-object.model';
import { LocaleService } from 'src/app/core/locale/locale.service'; // import LocaleService 
@Component({
  selector: 'ds-confirmation-modal',
  templateUrl: 'confirmation-modal.component.html',
})
export class ConfirmationModalComponent {
  @Input() headerLabel: string;
  @Input() infoLabel: string;
  @Input() cancelLabel: string;
  @Input() confirmLabel: string;
  @Input() confirmIcon: string;
  /**
   * The brand color of the confirm button
   */
  @Input() brandColor = 'primary';

  @Input() dso: DSpaceObject;

  /**
   * An event fired when the cancel or confirm button is clicked, with respectively false or true
   */
  @Output()
  response: Subject<boolean> = new Subject();

  constructor(protected activeModal: NgbActiveModal,
    public localeService : LocaleService  /* kware edit - call service from LocaleService */
    ) {
  }

  /**
   * Confirm the action that led to the modal
   */
  confirmPressed() {
    this.response.next(true);
    this.close();
  }

  /**
   * Cancel the action that led to the modal and close modal
   */
  cancelPressed() {
    this.response.next(false);
    this.close();
  }

  /**
   * Close the modal
   */
  close() {
    this.activeModal.close();
  }
}
