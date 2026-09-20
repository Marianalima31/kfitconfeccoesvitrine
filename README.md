# K-Fit Confecções – site institucional

Site responsivo e acessível (HTML5, CSS3 e JavaScript puro, sem dependências) com: apresentação do negócio, produtos (camisetas e regatas dry-fit), galeria, localização e contato via WhatsApp. Publicado gratuitamente no GitHub Pages.

Site publicado: <https://marianalima31.github.io/kfitconfeccoesvitrine/>

## Estrutura

```
index.html          página única (semântica HTML5 + SEO + JSON-LD)
css/style.css       estilos (mobile first)
js/main.js          menu, galeria (lightbox), formulário → WhatsApp
images/             fotos dos produtos e ícones
robots.txt          permite indexação e aponta o sitemap
sitemap.xml         mapa do site para o Google
site.webmanifest    metadados do site
404.html            página de erro
```

## Dados do negócio usados no site

| Item | Valor | Onde alterar |
|---|---|---|
| WhatsApp | (11) 96640-9902 (`5511966409902`) | `index.html` (links `wa.me`, JSON-LD) e `js/main.js` (`WHATSAPP`) |
| Endereço | Rua São Cristóvão, 115 – Jardim Patrícia, Itaquaquecetuba – SP | seção "Onde estamos", mapa e JSON-LD |
| Shopee | <https://shopee.com.br/klotsfitness> | `index.html` |
| Fotos | `images/foto-NN.jpg` (800 px) e `foto-NN-thumb.jpg` (480×600) | trocar mantendo os nomes |

Para trocar o número do WhatsApp em todos os lugares de uma vez (exemplo com 11 99999-8888):

```bash
sed -i '' 's/5511966409902/5511999998888/g; s/(11) 96640-9902/(11) 99999-8888/g' index.html js/main.js
```

O horário de atendimento **não** foi incluído por não ter sido informado. Se quiser, adicione na seção "Onde estamos" e no JSON-LD (`openingHoursSpecification`).

`og-image.jpg` (1200×630) é a imagem que aparece ao compartilhar o link.

## Publicar no GitHub Pages

1. Envie o código: `git add . && git commit -m "Site K-Fit" && git push -u origin master`
2. No GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Escolha a branch `master` (pasta `/ (root)`) e clique em **Save**.
4. O site ficará disponível em `https://marianalima31.github.io/kfitconfeccoesvitrine/`.

## SEO aplicado

- `<title>` e `meta description` únicos e com palavras-chave; `canonical`; `robots`
- Open Graph e Twitter Cards para pré-visualização em redes sociais e WhatsApp
- Estrutura semântica: `header`, `nav`, `main`, `section`, `article`, `address`, `footer`, um único `h1` e hierarquia `h2` → `h3`
- Dados estruturados **JSON-LD** (`ClothingStore`) com endereço, telefone, horários e catálogo para SEO local
- `robots.txt`, `sitemap.xml`, imagens com `alt`, `width`/`height` e `loading="lazy"` (desempenho e CLS)
- Sem bibliotecas nem fontes externas: carregamento rápido

### Depois de publicar

1. Crie/otimize o **Perfil da Empresa no Google** (Google Business Profile) com o mesmo nome, endereço e telefone do site: é o fator mais importante para busca local.
2. Cadastre o site no **Google Search Console** e envie o `sitemap.xml`.
3. Atualize as URLs `canonical`, `og:url`, `og:image`, `sitemap.xml` e `robots.txt` se usar domínio próprio.

## Acessibilidade

`lang="pt-BR"`, link "pular para o conteúdo", navegação por teclado, foco visível, menu com `aria-expanded`, galeria em `<dialog>` (Esc fecha, setas navegam), formulário com `label` e mensagens de erro anunciadas, contraste AA e respeito a `prefers-reduced-motion`.
