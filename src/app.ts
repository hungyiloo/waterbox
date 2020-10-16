import { initDatabase } from './database';
import { renderContainer } from './renderer';

/**
 * This will be called once the page has loaded
 */
export async function main() {
  // Set up the database
  const { db, query } = await initDatabase();

  // Fetch some data from the database
  const boundary = 4;
  const fruits = query(`SELECT * FROM fruits WHERE id < ${boundary}`);

  // A method to render the data from above onto the page
  async function renderFruits() {
  // Render the template main.mustache into #main-container
    await renderContainer(
      '#main-container', // Find this id inside ./index.html
      'main.mustache',   // Find this template in ./templates/main.mustache
      { fruits }         // The data we fetched above
    );

    // Some example button click event handlers.
    // These need to be set up after the render,
    // otherwise the buttons won't yet exist.
    const destroyFruitsButton = document.querySelector('#destroy-fruits-btn') as HTMLButtonElement;
    destroyFruitsButton.onclick = (_clickEvent: MouseEvent) => {
      // Remove the fruit table from the DOM
      const fruitTable = document.querySelector('#fruit-table');
      if (fruitTable) {
        fruitTable.remove();
      }
    };

    const resetButton = document.querySelector('#reset-btn') as HTMLButtonElement;
    resetButton.onclick = async (_clickEvent: MouseEvent) => {
      // Re-render to reset everything
      await renderFruits();
    };
  }

  // Execute the render
  renderFruits();
}
