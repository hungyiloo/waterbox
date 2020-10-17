import { initDatabase } from './database';
import { renderContainer } from './renderer';

/**
 * This will be called once the page has loaded
 */
export async function main() {
  // Set up the database
  const { db, query } = await initDatabase();

  // Main render method
  async function renderFruits(filterCondition?: string) {

    // Fetch some data from the database
    const fruits = query(`SELECT * FROM fruits WHERE ${filterCondition || '1=1'}`);

    // Render the template main.mustache into #main-container
    await renderContainer(
      '#main-container',          // Find this id inside ./index.html
      'main.mustache',            // Find this template in ./templates/main.mustache
      { fruits, filterCondition } // The data we fetched above and the query condition that we last used
    );

    // Some example DOM event handlers.
    // These need to be set up after the render,
    // otherwise the buttons/inputs won't yet exist.
    const conditionInput = document.querySelector('#condition-input') as HTMLInputElement;
    const queryButton = document.querySelector('#query-btn') as HTMLButtonElement;

    const queryHandler = async (_: Event) => {
      const newFilterCondition = conditionInput ? conditionInput.value : null;
      await renderFruits(newFilterCondition)
    };
    queryButton.onclick = queryHandler;
    conditionInput.onkeypress = async (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        await queryHandler(event);
      }
    }

    const resetButton = document.querySelector('#reset-btn') as HTMLButtonElement;
    resetButton.onclick = async (_clickEvent: MouseEvent) => {
      // Re-render to reset everything
      await renderFruits();
    };
  }

  // Execute the render
  renderFruits();
}
