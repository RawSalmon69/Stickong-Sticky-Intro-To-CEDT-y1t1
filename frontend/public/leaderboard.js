import { createItem, getItems } from "./api.js";

const leaderboardList = document.getElementById("leaderboard-list");

function addLeaderboardEntry(items) {
  leaderboardList.innerHTML = "";

  for (const item of items) {
    const entry = document.createElement("li");
    entry.textContent = `${item.playerName}: ${item.score}`;
  leaderboardList.appendChild(entry);
  }
}

export async function makeLeaderboard() {
  const items = await getItems();
  addLeaderboardEntry(items);
}

export async function handleAddEntry(Nameplayer,score) {
  const nameToAdd = Nameplayer;
  const scoreToAdd = score;
  const payload = {
    playerName: nameToAdd,
    score: scoreToAdd,
  };
  await createItem(payload);
  await makeLeaderboard();
}