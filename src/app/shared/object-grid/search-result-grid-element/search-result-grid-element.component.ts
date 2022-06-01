import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SearchResult } from '../../search/models/search-result.model';
import { BitstreamDataService } from '../../../core/data/bitstream-data.service';
import { DSpaceObject } from '../../../core/shared/dspace-object.model';
import { Metadata } from '../../../core/shared/metadata.utils';
import { hasValue } from '../../empty.util';
import { AbstractListableElementComponent } from '../../object-collection/shared/object-collection-element/abstract-listable-element.component';
import { TruncatableService } from '../../truncatable/truncatable.service';
import { Item } from 'src/app/core/shared/item.model';  //kware-edit
import { followLink } from '../../utils/follow-link-config.model'; //kware-edit
import { LinkService } from 'src/app/core/cache/builders/link.service'; //kware-edit
import { LocaleService } from 'src/app/core/locale/locale.service'; //kware-edit
@Component({
  selector: 'ds-search-result-grid-element',
  template: ``
})
export class SearchResultGridElementComponent<T extends SearchResult<K>, K extends DSpaceObject> extends AbstractListableElementComponent<T> implements OnInit {
  /**
   * The DSpaceObject of the search result
   */
  dso: K;

  /**
   * Whether or not the grid element is currently collapsed
   */
  isCollapsed$: Observable<boolean>;
 keywords=[];
  title:string;
  public constructor(
    protected truncatableService: TruncatableService,
    protected bitstreamDataService: BitstreamDataService,
    protected linkService: LinkService, //kware-edit
    public localeService : LocaleService ,
  ) {
    super();
  }

  /**
   * Retrieve the dso from the search result
   */
  ngOnInit(): void {
    if (hasValue(this.object)) {
      this.dso = this.object.indexableObject;
      this.isCollapsed$ = this.isCollapsed();
// this.linkService.resolveLink<Item>(this.dso, followLink('thumbnail'));
         }
     let  arabic = /[\u0600-\u06FF]/;
     let english= /[a-zA-Z]/;
     let arabicKeyswords= this.dso.allMetadataValues('dc.subject').filter(key=>arabic.test(key));
     let englishKeywords=this.dso.allMetadataValues('dc.subject').filter(key=>english.test(key));
     

   this.localeService.getCurrentLanguageCode() === 'ar' ? this.keywords= arabicKeyswords.slice(0,3) : this.keywords= englishKeywords.slice(0,3);

if(this.localeService.getCurrentLanguageCode() === 'ar' && arabic.test(this.dso.firstMetadataValue('dc.title'))){
this.title=this.dso.firstMetadataValue('dc.title');
}

if(this.localeService.getCurrentLanguageCode() === 'ar' && !(arabic.test(this.dso.firstMetadataValue('dc.title'))) && this.dso.firstMetadataValue('dc.title.alternative') ){
  this.title=this.dso.firstMetadataValue('dc.title.alternative');
  }

  if(this.localeService.getCurrentLanguageCode() === 'ar' && !(arabic.test(this.dso.firstMetadataValue('dc.title'))) && !this.dso.firstMetadataValue('dc.title.alternative') ){
    this.title=this.dso.firstMetadataValue('dc.title');
    }

if(this.localeService.getCurrentLanguageCode() === 'en' && english.test(this.dso.firstMetadataValue('dc.title'))){
this.title=this.dso.firstMetadataValue('dc.title');
}

if(this.localeService.getCurrentLanguageCode() === 'en' && !(english.test(this.dso.firstMetadataValue('dc.title'))) && this.dso.firstMetadataValue('dc.title.alternative') ){
  this.title=this.dso.firstMetadataValue('dc.title.alternative');
  }
  if(this.localeService.getCurrentLanguageCode() === 'en' && !(english.test(this.dso.firstMetadataValue('dc.title'))) && !this.dso.firstMetadataValue('dc.title.alternative') ){
    this.title=this.dso.firstMetadataValue('dc.title');
    }
  }

  /**
   * Gets all matching metadata string values from hitHighlights or dso metadata, preferring hitHighlights.
   *
   * @param {string|string[]} keyOrKeys The metadata key(s) in scope. Wildcards are supported; see [[Metadata]].
   * @returns {string[]} the matching string values or an empty array.
   */
  allMetadataValues(keyOrKeys: string | string[]): string[] {
    return Metadata.allValues([this.object.hitHighlights, this.dso.metadata], keyOrKeys);
  }

  /**
   * Gets the first matching metadata string value from hitHighlights or dso metadata, preferring hitHighlights.
   *
   * @param {string|string[]} keyOrKeys The metadata key(s) in scope. Wildcards are supported; see [[Metadata]].
   * @returns {string} the first matching string value, or `undefined`.
   */
  firstMetadataValue(keyOrKeys: string | string[]): string {
    return Metadata.firstValue([this.object.hitHighlights, this.dso.metadata], keyOrKeys);
  }

  private isCollapsed(): Observable<boolean> {
    return this.truncatableService.isCollapsed(this.dso.id);
  }
}