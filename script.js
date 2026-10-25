// parte do menu do celular (abrir e fechar)
const menuBotao = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

menuBotao.addEventListener('click', () => {
  const aberto = menu.classList.toggle('is-open');
  menuBotao.setAttribute('aria-expanded', aberto);
  menuBotao.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
});

// parte que fecha o menu ao clicar em um link
menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuBotao.setAttribute('aria-expanded', 'false');
    menuBotao.setAttribute('aria-label', 'Abrir menu');
  });
});

// parte do espaço reservado quando a imagem do projeto não existe
document.querySelectorAll('.project-card__media img').forEach((img) => {
  const trocarPorPlaceholder = () => {
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.setAttribute('role', 'img');
    placeholder.setAttribute('aria-label', img.alt);
    placeholder.textContent = 'Adicione a imagem em ' + img.getAttribute('src');
    img.replaceWith(placeholder);
  };
  img.addEventListener('error', trocarPorPlaceholder);
  // caso a imagem já tenha falhado antes do script rodar
  if (img.complete && img.naturalWidth === 0) trocarPorPlaceholder();
});

// parte que destaca no menu a seção que está aparecendo
const links = document.querySelectorAll('.nav a');
const secoes = [...links].map((l) => document.querySelector(l.getAttribute('href')));

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === '#' + entrada.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

secoes.forEach((s) => s && observador.observe(s));
