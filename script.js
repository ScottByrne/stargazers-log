const repositoryList = document.querySelector("#repository-list");
const repositoryCount = document.querySelector("#repository-count");
const statusMessage = document.querySelector("#status");

function createRepositoryItem(repository) {
  const item = document.createElement("li");
  item.className = "repository";

  const title = document.createElement("a");
  title.className = "repository-title";
  title.href = repository.url;
  title.target = "_blank";
  title.rel = "noopener noreferrer";
  title.textContent = repository.name;

  const owner = document.createElement("p");
  owner.className = "repository-owner";
  owner.textContent = `by ${repository.owner}`;

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

  const metadata = document.createElement("div");
  metadata.className = "repository-meta";

  const language = document.createElement("span");
  language.textContent = repository.language;

  const starredDate = document.createElement("time");
  starredDate.dateTime = repository.starredAt;
  starredDate.textContent = `Starred ${new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(`${repository.starredAt}T00:00:00Z`))}`;

  metadata.append(language, starredDate);
  item.append(title, owner, description, metadata);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren(...repositories.map(createRepositoryItem));
    repositoryCount.textContent = `${repositories.length} repositories`;
    statusMessage.textContent = repositories.length === 0 ? "No starred repositories yet." : "";
  } catch (error) {
    statusMessage.textContent = "Repositories could not be loaded. Please try again later.";
    console.error("Unable to load starred repositories:", error);
  }
}

loadRepositories();