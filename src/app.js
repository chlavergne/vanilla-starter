export function initApp(rootElement) {
  rootElement.innerHTML = `
      <div class="project-container">
        <h1>Mon Mini-Projet JS</h1>
        <button id="counter-btn" type="button">Clics : 0</button>
      </div>
    `;

  let count = 0;
  const btn = rootElement.querySelector('#counter-btn');

  btn.addEventListener('click', () => {
    count += 1;
    btn.textContent = `Clics : ${count}`;
  });
}
