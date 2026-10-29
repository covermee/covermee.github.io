(() => {
  "use strict";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const toggle = document.querySelector(".theme-toggle");
  const isDark = () => document.documentElement.dataset.theme
    ? document.documentElement.dataset.theme === "dark" : systemTheme.matches;
  const updateToggle = () => {
    toggle.textContent = isDark() ? "Light mode" : "Dark mode";
    toggle.setAttribute("aria-label", isDark() ? "Use light theme" : "Use dark theme");
    toggle.setAttribute("aria-pressed", String(isDark()));
  };
  toggle.hidden = false;
  updateToggle();
  systemTheme.addEventListener("change", updateToggle);
  toggle.addEventListener("click", () => {
    const theme = isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("portfolio-theme", theme); } catch (_) { /* Keep toggle usable. */ }
    updateToggle();
  });
  document.querySelectorAll("[data-github]").forEach(link => {
    link.href = `https://github.com/${encodeURIComponent(GITHUB_USERNAME)}`;
    link.hidden = false;
  });
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  // Ignore missing/invalid URLs instead of generating misleading placeholder links.
  const validUrl = value => {
    try { return new URL(value).protocol === "https:"; } catch (_) { return false; }
  };
  const list = document.getElementById("project-list");
  PROJECTS.forEach((project, index) => {
    const card = element("article", "project-card");
    const copy = element("div", "project-copy");
    copy.append(element("p", "eyebrow", `${String(index + 1).padStart(2, "0")} / ${project.context}`));
    const title = element("h3", "", project.title);
    title.id = `project-${index + 1}`;
    card.setAttribute("aria-labelledby", title.id);
    copy.append(title, element("p", "project-subtitle", project.subtitle), element("p", "role", project.role));
    const problem = element("p", "muted");
    problem.append(element("strong", "", "The problem: "), document.createTextNode(project.problem));
    copy.append(problem, element("p", "muted", project.detail));
    const tags = element("ul", "tags");
    tags.setAttribute("aria-label", "Technology stack");
    project.stack.forEach(skill => tags.append(element("li", "", skill)));
    copy.append(tags);
    const links = element("div", "project-links");
    if (validUrl(project.repoUrl)) {
      const link = element("a", "text-link", "View repository ↗");
      link.href = project.repoUrl;
      link.setAttribute("aria-label", `View ${project.title} repository`);
      links.append(link);
    } else links.append(element("span", "pending", "Repository link coming soon"));
    if (validUrl(project.demoUrl)) {
      const link = element("a", "text-link", "View demo ↗");
      link.href = project.demoUrl;
      link.setAttribute("aria-label", `View ${project.title} demo`);
      links.append(link);
    }
    copy.append(links);
    const media = element("div", "project-media");
    const shot = project.screenshot;
    if (shot && shot.src && shot.alt && shot.width > 0 && shot.height > 0) {
      const img = element("img");
      img.src = shot.src; img.alt = shot.alt;
      img.width = shot.width; img.height = shot.height;
      img.loading = "lazy"; img.decoding = "async";
      media.append(img);
    } else {
      media.append(document.createComment(" TODO: add real project screenshot "));
      const placeholder = element("div", "screenshot-placeholder");
      const mark = element("span", "placeholder-mark", "[ / ]");
      mark.setAttribute("aria-hidden", "true");
      placeholder.append(mark, element("p", "", "Screenshots coming soon"));
      media.append(placeholder);
    }
    card.append(copy, media);
    list.append(card);
  });
})();
