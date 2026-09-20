(function () {
  'use strict';

  // Número do WhatsApp com DDI+DDD, só dígitos
  var WHATSAPP = '5511966409902';

  // Ano no rodapé
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('menu-principal');
  if (toggle && menu) {
    var label = toggle.querySelector('.visually-hidden');
    var setMenu = function (open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? 'Fechar menu' : 'Abrir menu';
    };
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  // Galeria com lightbox (usa <dialog>: Esc e foco tratados pelo navegador)
  var box = document.getElementById('lightbox');
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  if (box && items.length && typeof box.showModal === 'function') {
    var img = document.getElementById('lightbox-img');
    var cap = document.getElementById('lightbox-caption');
    var current = 0;

    var show = function (i) {
      current = (i + items.length) % items.length;
      var it = items[current];
      img.src = it.dataset.full;
      img.alt = it.dataset.caption || '';
      cap.textContent = (it.dataset.caption || '') + ' (' + (current + 1) + ' de ' + items.length + ')';
    };

    items.forEach(function (it, i) {
      it.addEventListener('click', function () {
        show(i);
        box.showModal();
      });
    });
    document.getElementById('lb-prev').addEventListener('click', function () { show(current - 1); });
    document.getElementById('lb-next').addEventListener('click', function () { show(current + 1); });
    document.getElementById('lb-close').addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  // Formulário -> abre o WhatsApp com a mensagem pronta
  var form = document.getElementById('form-whatsapp');
  if (form) {
    var fields = [
      { input: form.elements.nome, error: document.getElementById('erro-nome') },
      { input: form.elements.mensagem, error: document.getElementById('erro-mensagem') }
    ];
    fields.forEach(function (f) {
      f.input.addEventListener('input', function () {
        if (f.input.value.trim()) {
          f.error.hidden = true;
          f.input.removeAttribute('aria-invalid');
          f.input.removeAttribute('aria-describedby');
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      fields.forEach(function (f) {
        var ok = f.input.value.trim().length > 0;
        f.error.hidden = ok;
        if (ok) {
          f.input.removeAttribute('aria-invalid');
          f.input.removeAttribute('aria-describedby');
        } else {
          f.input.setAttribute('aria-invalid', 'true');
          f.input.setAttribute('aria-describedby', f.error.id);
          if (!firstInvalid) firstInvalid = f.input;
        }
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      var text = 'Olá! Me chamo ' + form.elements.nome.value.trim() + '. ' + form.elements.mensagem.value.trim();
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  }
})();
