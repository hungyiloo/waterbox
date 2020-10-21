import * as Mustache from 'mustache';

export async function renderContainer(containerSelector: string, templateName: string, view: any = {}) {
  const container = document.querySelector(containerSelector);
  console.info('Fetching template file:', templateName);
  const template = await fetch(templateName).then(r => r.text());
  const markup = Mustache.render(template, view);
  const loadingSpinner = document.querySelector('#loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.remove();
  }
  container.innerHTML = markup;
  console.info(`Rendered '${templateName}' into container '${containerSelector}' with data`, view);
}
