import { getById } from './helpers';
import { initDatabase } from './database';
import { renderContainer } from './renderer';

/**
 * This will be called once the page has loaded
 */
export async function main() {

  // Initialise app-wide context //////////////////////////////////////////////
  const { db, query, queryFirst } = await initDatabase();


  // Data access methods //////////////////////////////////////////////////////
  function getFruits(filterCondition?: string) {
    return query<Fruit>(`SELECT * FROM fruits ${filterCondition ? `WHERE ${filterCondition}` : ''}`);
  }

  // Here's a different way of querying, as an example:
  // - Fetches just a single result
  // - Uses a prepared statement with parameters, instead of string interpolation
  //
  // function getBanana() {
  //   return queryFirst<Fruit>(`SELECT * FROM fruits WHERE name = $name`, { $name: 'Banana' });
  // }

  // Main render method ///////////////////////////////////////////////////////
  async function renderFruits(viewState: { fruits: Fruit[]; filterCondition?: string; }) {
    // Render the template main.mustache into #main-container
    await renderContainer(
      '#main-container', // Find this id inside .  /index.html
      'main.mustache',   // Find this template in ./templates/main.mustache
      viewState          // View state for mustache to render
    );

    // Bind some example DOM event handlers.
    // These need to be set up after the render, otherwise the buttons/inputs won't yet exist.
    const queryButton = getById<HTMLButtonElement>('query-btn');
    const resetButton = getById<HTMLButtonElement>('reset-btn');
    const conditionInput = getById<HTMLInputElement>('condition-input');
    const tailwindButton = getById<HTMLButtonElement>('go-to-tailwind-btn');

    queryButton.onclick = handleQuery;
    resetButton.onclick = handleReset;
    conditionInput.onkeypress = handleInputKeypress;
    tailwindButton.onclick = handleTailwindNavigation;
  }


  // Event handlers ///////////////////////////////////////////////////////////
  async function handleQuery(_e: Event) {
    const conditionInput = getById<HTMLInputElement>('condition-input');
    const filterCondition = conditionInput ? conditionInput.value : null;
    const fruits = getFruits(filterCondition);
    await renderFruits({ fruits, filterCondition })
  };

  async function handleInputKeypress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      await handleQuery(event);
    }
  }

  async function handleReset(_e: Event) {
    await renderFruits({
      fruits: getFruits()
    });
  }

  async function handleTailwindNavigation(_e: Event) {
    await renderContainer('#main-container', 'tailwind.mustache');
    getById<HTMLButtonElement>('go-to-main-btn').onclick = handleReset;
  }


  // Execute the initial render ///////////////////////////////////////////////
  await renderFruits({
    fruits: getFruits()
  });
}

interface Fruit {
  id: number;
  name: string;
  description: string;
}
