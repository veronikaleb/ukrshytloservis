const newsItems = [
  {
    img: "./images/news/n1.png",
    title: "9 років компанії \"Укр Житло Сервіс\"",
    date: "17.06.25",
    link: "news/news1.html"
  },
  {
    img: "images/news/n2.png",
    title: "Правила безпеки при ремонті електропроводки",
    date: "16.06.25",
    link: "news/news2.html"
  },
  {
    img: "images/news/n3.png",
    title: "Перевірка сантехніки у будинку",
    date: "13.06.25",
    link: "news/news3.html"
  }
];

function rendernews(count = 3) {
  const container = document.getElementById('news-container');
  if (!container) return;
  container.innerHTML = '';
  newsItems.slice(0, count).forEach(item => {
    const card = document.createElement('article');
    card.className = 'news-card';
    card.innerHTML = `
      <div class="news-image">
        <img src="${item.img}" alt="${item.title}" />
      </div>
      <div class="news-content">
        <h2 class="news-headline">${item.title}</h2>
        <div class="news-date"><i class="fa fa-clock-o"></i> ${item.date}</div>
        <a href="${item.link}" class="btn-readmore">Детальніше</a>
      </div>`;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => rendernews());
