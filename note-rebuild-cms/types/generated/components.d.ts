import type { Schema, Struct } from '@strapi/strapi';

export interface HomepageAudienceLine extends Struct.ComponentSchema {
  collectionName: 'components_homepage_audience_lines';
  info: {
    displayName: 'Audience Line';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageBlindItem extends Struct.ComponentSchema {
  collectionName: 'components_homepage_blind_items';
  info: {
    displayName: 'Blind Item';
    icon: 'picture';
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageColorSlide extends Struct.ComponentSchema {
  collectionName: 'components_homepage_color_slides';
  info: {
    displayName: 'Color Slide';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    taglineLine1: Schema.Attribute.String & Schema.Attribute.Required;
    taglineLine2: Schema.Attribute.String;
  };
}

export interface HomepageColors extends Struct.ComponentSchema {
  collectionName: 'components_homepage_colors';
  info: {
    displayName: 'Colors';
    icon: 'picture';
  };
  attributes: {
    slides: Schema.Attribute.Component<'homepage.color-slide', true>;
  };
}

export interface HomepageDetailCard extends Struct.ComponentSchema {
  collectionName: 'components_homepage_detail_cards';
  info: {
    displayName: 'Detail Card';
    icon: 'picture';
  };
  attributes: {
    caption: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface HomepageDetails extends Struct.ComponentSchema {
  collectionName: 'components_homepage_details';
  info: {
    displayName: 'Details';
    icon: 'picture';
  };
  attributes: {
    backgroundVideo: Schema.Attribute.Media<'videos'>;
    cards: Schema.Attribute.Component<'homepage.detail-card', true>;
  };
}

export interface HomepageHero extends Struct.ComponentSchema {
  collectionName: 'components_homepage_heroes';
  info: {
    displayName: 'Hero';
    icon: 'star';
  };
  attributes: {
    headlineLine1: Schema.Attribute.String & Schema.Attribute.Required;
    headlineLine2: Schema.Attribute.String & Schema.Attribute.Required;
    lottieAnimation: Schema.Attribute.Media<'files'>;
  };
}

export interface HomepageInside extends Struct.ComponentSchema {
  collectionName: 'components_homepage_insides';
  info: {
    displayName: 'Inside';
    icon: 'box';
  };
  attributes: {
    blinds: Schema.Attribute.Component<'homepage.blind-item', true>;
    tagline: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HomepagePaper extends Struct.ComponentSchema {
  collectionName: 'components_homepage_papers';
  info: {
    displayName: 'Paper';
    icon: 'picture';
  };
  attributes: {
    coverHeadlineLine1: Schema.Attribute.String & Schema.Attribute.Required;
    coverHeadlineLine2: Schema.Attribute.String & Schema.Attribute.Required;
    slides: Schema.Attribute.Component<'homepage.paper-slide', true>;
  };
}

export interface HomepagePaperSlide extends Struct.ComponentSchema {
  collectionName: 'components_homepage_paper_slides';
  info: {
    displayName: 'Paper Slide';
    icon: 'picture';
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface HomepageSpecCard extends Struct.ComponentSchema {
  collectionName: 'components_homepage_spec_cards';
  info: {
    displayName: 'Spec Card';
    icon: 'layer';
  };
  attributes: {
    lines: Schema.Attribute.Component<'homepage.spec-line', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageSpecLine extends Struct.ComponentSchema {
  collectionName: 'components_homepage_spec_lines';
  info: {
    displayName: 'Spec Line';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageSpecs extends Struct.ComponentSchema {
  collectionName: 'components_homepage_specs';
  info: {
    displayName: 'Specs';
    icon: 'layer';
  };
  attributes: {
    cards: Schema.Attribute.Component<'homepage.spec-card', true>;
    headingLine1: Schema.Attribute.String & Schema.Attribute.Required;
    headingLine2: Schema.Attribute.String & Schema.Attribute.Required;
    penImage: Schema.Attribute.Media<'images'>;
  };
}

export interface HomepageThesisCard extends Struct.ComponentSchema {
  collectionName: 'components_homepage_thesis_cards';
  info: {
    displayName: 'Thesis Card';
    icon: 'layer';
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageWho extends Struct.ComponentSchema {
  collectionName: 'components_homepage_whos';
  info: {
    displayName: 'Who';
    icon: 'user';
  };
  attributes: {
    audienceLabel: Schema.Attribute.String & Schema.Attribute.Required;
    audienceLines: Schema.Attribute.Component<'homepage.audience-line', true>;
    backgroundVideo: Schema.Attribute.Media<'videos'>;
    introText: Schema.Attribute.Text & Schema.Attribute.Required;
    theses: Schema.Attribute.Component<'homepage.thesis-card', true>;
  };
}

export interface LayoutCta extends Struct.ComponentSchema {
  collectionName: 'components_layout_ctas';
  info: {
    displayName: 'CTA';
    icon: 'cursor';
  };
  attributes: {
    orderLabel: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.String & Schema.Attribute.Required;
    productLabel: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutNavLink extends Struct.ComponentSchema {
  collectionName: 'components_layout_nav_links';
  info: {
    displayName: 'Nav Link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutTextLink extends Struct.ComponentSchema {
  collectionName: 'components_layout_text_links';
  info: {
    displayName: 'Text Link';
    icon: 'link';
  };
  attributes: {
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutWaitlistModal extends Struct.ComponentSchema {
  collectionName: 'components_layout_waitlist_modals';
  info: {
    displayName: 'Waitlist Modal';
    icon: 'envelope';
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    inputPlaceholder: Schema.Attribute.String & Schema.Attribute.Required;
    submitLabel: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'homepage.audience-line': HomepageAudienceLine;
      'homepage.blind-item': HomepageBlindItem;
      'homepage.color-slide': HomepageColorSlide;
      'homepage.colors': HomepageColors;
      'homepage.detail-card': HomepageDetailCard;
      'homepage.details': HomepageDetails;
      'homepage.hero': HomepageHero;
      'homepage.inside': HomepageInside;
      'homepage.paper': HomepagePaper;
      'homepage.paper-slide': HomepagePaperSlide;
      'homepage.spec-card': HomepageSpecCard;
      'homepage.spec-line': HomepageSpecLine;
      'homepage.specs': HomepageSpecs;
      'homepage.thesis-card': HomepageThesisCard;
      'homepage.who': HomepageWho;
      'layout.cta': LayoutCta;
      'layout.nav-link': LayoutNavLink;
      'layout.text-link': LayoutTextLink;
      'layout.waitlist-modal': LayoutWaitlistModal;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
