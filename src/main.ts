import { initDatabase } from './database';
import { renderContainer } from './renderer';

/**
 * This will be called once the page has loaded
 */
export async function main() {

  // Initialise app-wide context //////////////////////////////////////////////
  const { db, query } = await initDatabase();


  // Data access methods //////////////////////////////////////////////////////
  function getFruits(filterCondition?: string) {
    return query(`SELECT * FROM fruits WHERE ${filterCondition || '1=1'}`);
  }


  // Main render method ///////////////////////////////////////////////////////
  async function renderFruits({ fruits, filterCondition }: { fruits: any[]; filterCondition?: string; }) {
    // Render the template main.mustache into #main-container
    await renderContainer(
      '#main-container',          // Find this id inside ./index.html
      'main.mustache',            // Find this template in ./templates/main.mustache
      { fruits, filterCondition } // View state for mustache to render
    );

    // Bind some example DOM event handlers.
    // These need to be set up after the render, otherwise the buttons/inputs won't yet exist.
    const queryButton = document.querySelector('#query-btn') as HTMLButtonElement;
    const resetButton = document.querySelector('#reset-btn') as HTMLButtonElement;
    const conditionInput = document.querySelector('#condition-input') as HTMLInputElement;

    queryButton.onclick = handleQuery;
    conditionInput.onkeypress = handleInputKeypress;
    resetButton.onclick = handleReset;
  }


  // Event handlers ///////////////////////////////////////////////////////////
  async function handleQuery(_e: Event) {
    const conditionInput = document.querySelector('#condition-input') as HTMLInputElement;
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


  // Execute the initial render ///////////////////////////////////////////////
  await renderFruits({
    fruits: getFruits()
  });
}
