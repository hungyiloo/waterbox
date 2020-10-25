import Mustache from 'mustache';
import morphdom from 'morphdom';

export async function renderContainer(containerSelector: string, templateName: string, view?: any, options?: {
  afterRender?: (container: HTMLElement) => any,
}) {
  const container = document.querySelector<HTMLElement>(containerSelector);
  console.info('Fetching template file:', templateName);
  const template = await fetch(templateName).then(r => r.text());
  const markup = Mustache.render(template, view || {});
  morphdom(container, `<div>${markup}</div>`, { childrenOnly: true });
  options?.afterRender?.call(null, container);
  console.info(`Rendered '${templateName}' into container '${containerSelector}' with data`, view);
}
