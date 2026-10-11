const list = document.getElementById("list");

async function load() {
  const items = await (await fetch("/api/items")).json();
  list.innerHTML = items.map((item) => `
    <article>
      <p class="meta">${item.at} · ${item.method}</p>
      <pre>${JSON.stringify(item.body, null, 2)}</pre>
    </article>
  `).join("") || "<p class='muted'>No hooks yet. POST to /hook.</p>";
}

document.getElementById("refresh").onclick = load;
document.getElementById("clear").onclick = async () => {
  await fetch("/api/items", { method: "DELETE" });
  load();
};
load();
setInterval(load, 3000);
