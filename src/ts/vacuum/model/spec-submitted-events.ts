export const UrlSubmitted = 'urlSubmitted';
export const TextSubmitted = 'textSubmitted';

export interface UrlSubmittedEvent {
  url: string;
}

export interface TextSubmittedEvent {
  text: string;
}
