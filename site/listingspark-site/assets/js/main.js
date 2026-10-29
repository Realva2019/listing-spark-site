// Listing Spark — interactions (no dependencies)
(function () {
  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      menu.hidden = open;
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) { menu.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  // Before/after compare sliders
  document.querySelectorAll('[data-compare]').forEach(function (el) {
    var range = el.querySelector('.compare__range');
    var set = function (v) { el.style.setProperty('--pos', v + '%'); };
    range.addEventListener('input', function () { set(range.value); });
  });

  // Gallery tabs, dynamic dataset, hover / tap behavior and load more
  var galleryTabs = document.querySelectorAll('.gallery-tab');
  var galleryNode = document.querySelector('[data-gallery]');
  var galleryMoreButton = document.querySelector('.gallery-more');
  var galleryState = { filter: 'all', visible: 11 };
  var galleryItems = [];
  var galleryMeta = {
    twilight: 46,
    staging: 11,
    declutter: 4,
    finish: 5,
    refresh: 7
  };

  function makeCategoryCards(category, count, names) {
    for (var i = 0; i < count; i += 1) {
      var index = i + 1;
      galleryItems.push({
        category: category,
        before: 'assets/img/gallery/' + category + '/' + index + '-before.jpg',
        after: 'assets/img/gallery/' + category + '/' + index + '-after.jpg',
        label: (names && names[i]) || category,
        wide: i % 5 === 0
      });
    }
  }

  function buildGalleryDataset() {
    galleryItems = [];

    var names = {
      twilight: ['Cedar Heights','Maple Crest','Harbor Point','Oak Lane','Pineview','Elm Terrace','Riverbend','Sunset Place','Willow Run','Westfield','North Ridge','Riverside','Hillside','South Park','Lakeside','Skyline','Crestview','Mason Row','Maple Grove','Briar Hill','Cypress','Aster','Summit','Stone Creek','Briarwood','Cottonwood','Franklin','Garfield','Hawthorn','Northwood','Old Mill','Parkview','Pebble Creek','Redwood','Riverview','Rosewood','Sage','Sherwood','Southfield','Stonegate','Tamarack','Valley','Winding Creek','Willow Creek','Winter Park','Wren','Yarrow','Raven Hill'],
      staging: ['Open Plan','Great Room','Primary Suite','Sunroom','Dining Nook','Office','Living Room','Kitchen','Family Room','Hallway','Entryway'],
      declutter: ['Living Room','Kitchen','Entryway','Primary Bath'],
      finish: ['Primary Bath','Media Room','Dining Nook','Office','Family Room'],
      refresh: ['Family Room','Dining','Backyard','Office','Primary Suite','Kitchen','Entryway']
    };

    Object.keys(galleryMeta).forEach(function (category) {
      makeCategoryCards(category, galleryMeta[category], names[category] || []);
    });
  }

  function getVisibleGalleryItems() {
    var filtered = galleryState.filter === 'all'
      ? galleryItems.slice()
      : galleryItems.filter(function (item) { return item.category === galleryState.filter; });
    return filtered.slice(0, galleryState.visible);
  }

  function attachGalleryInteractions() {
    var cardNodes = document.querySelectorAll('.mosaic-card');

    cardNodes.forEach(function (card) {
      var image = card.querySelector('img');
      var before = card.dataset.before || '';
      var after = card.dataset.after || '';
      var isPinnedBefore = false;

      var setImage = function (src) {
        if (!src || !image) return;
        image.src = src;
      };

      var setBeforeState = function (showBefore) {
        card.classList.toggle('is-before', showBefore);
      };

      var syncImage = function () {
        if (isPinnedBefore) {
          setImage(before);
          setBeforeState(true);
          return;
        }
        setImage(after);
        setBeforeState(false);
      };

      card.addEventListener('pointerenter', function () {
        if (!isPinnedBefore) {
          setImage(before);
          setBeforeState(true);
        }
      });
      card.addEventListener('pointerleave', function () {
        syncImage();
      });
      card.addEventListener('mouseenter', function () {
        if (!isPinnedBefore) {
          setImage(before);
          setBeforeState(true);
        }
      });
      card.addEventListener('mouseleave', function () {
        syncImage();
      });
      card.addEventListener('focusin', function () {
        setImage(before);
        setBeforeState(true);
      });
      card.addEventListener('focusout', function () {
        syncImage();
      });
      card.addEventListener('click', function () {
        isPinnedBefore = !isPinnedBefore;
        setBeforeState(isPinnedBefore);
        setImage(isPinnedBefore ? before : after);
      });

      syncImage();
    });
  }

  function renderGallery() {
    if (!galleryNode) return;

    var filtered = galleryState.filter === 'all'
      ? galleryItems.slice()
      : galleryItems.filter(function (item) { return item.category === galleryState.filter; });

    var visibleItems = filtered.slice(0, galleryState.visible);

    galleryNode.innerHTML = visibleItems.map(function (item, index) {
      var wideClass = item.wide && index % 4 === 0 ? ' mosaic-card--wide' : '';
      var spanLabel = item.category === 'staging' ? 'Virtual staging' : item.category === 'declutter' ? 'Declutter' : item.category === 'finish' ? 'Finish the room' : item.category === 'refresh' ? 'Full refresh' : 'Twilight';
      return '<button class="mosaic-card' + wideClass + '" data-category="' + item.category + '" data-before="' + item.before + '" data-after="' + item.after + '" type="button">' +
        '<span class="before-label">Before</span>' +
        '<img src="' + item.after + '" alt="' + item.label + ' property" loading="lazy">' +
        '<span>' + spanLabel + '</span>' +
      '</button>';
    }).join('');

    attachGalleryInteractions();

    if (galleryMoreButton) {
      var remaining = filtered.length - visibleItems.length;
      galleryMoreButton.hidden = remaining <= 0;
      galleryMoreButton.textContent = remaining > 0 ? 'Load more' : 'You’re all caught up';
    }
  }

  function applyGalleryFilter(filter) {
    galleryState.filter = filter;
    galleryState.visible = 11;
    renderGallery();
  }

  buildGalleryDataset();
  renderGallery();

  galleryTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      galleryTabs.forEach(function (item) { item.classList.toggle('is-active', item === tab); });
      applyGalleryFilter(tab.dataset.filter);
    });
  });

  if (galleryMoreButton) {
    galleryMoreButton.addEventListener('click', function () {
      var filtered = galleryState.filter === 'all'
        ? galleryItems.slice()
        : galleryItems.filter(function (item) { return item.category === galleryState.filter; });
      galleryState.visible = Math.min(galleryState.visible + 9, filtered.length);
      renderGallery();
    });
  }

  // Service category pills
  var serviceData = {
    twilight: {
      label: 'Day to dusk',
      title: 'Twilight',
      description: 'Your daytime exterior becomes the golden-hour shot buyers stop on: deep blue sky, warm windows, porch lights on. Same house, same angle.',
      features: ['Front exteriors', 'Backyards and pools', 'Listings shot on a gray day'],
      before: 'assets/img/gallery/twilight/1-before.jpg',
      after: 'assets/img/gallery/twilight/1-after.jpg',
      tagLeft: 'Day',
      tagRight: 'Dusk'
    },
    staging: {
      label: 'Before to styled',
      title: 'Virtual staging',
      description: 'Turn empty rooms into warm, lived-in spaces that help buyers picture life in the home without changing the architecture.',
      features: ['Living rooms', 'Primary suites', 'Open concept spaces'],
      before: 'assets/img/gallery/staging/1-before.jpg',
      after: 'assets/img/gallery/staging/1-after.jpg',
      tagLeft: 'Before',
      tagRight: 'Styled'
    },
    declutter: {
      label: 'Busy to clean',
      title: 'Declutter',
      description: 'Remove visual noise, smooth surfaces, and tidy layouts so every room feels brighter, calmer, and more premium.',
      features: ['Tidy rooms', 'Clean surfaces', 'Sharper photography'],
      before: 'assets/img/gallery/declutter/1-before.jpg',
      after: 'assets/img/gallery/declutter/1-after.jpg',
      tagLeft: 'Before',
      tagRight: 'Clean'
    },
    finish: {
      label: 'Raw to refined',
      title: 'Finish the room',
      description: 'Add the details that make a room feel complete: fresh finishes, better lighting, and a polished look that sells faster.',
      features: ['Luxury finishing', 'Room styling', 'High-end details'],
      before: 'assets/img/gallery/finish/1-before.jpg',
      after: 'assets/img/gallery/finish/1-after.jpg',
      tagLeft: 'Raw',
      tagRight: 'Refined'
    },
    refresh: {
      label: 'Aging to refreshed',
      title: 'Full refresh',
      description: 'Give dated spaces a clean, updated look with brighter finishes, improved styling, and a modern listing presentation.',
      features: ['Updated finishes', 'Brighter rooms', 'Modern styling'],
      before: 'assets/img/gallery/refresh/1-before.jpg',
      after: 'assets/img/gallery/refresh/1-after.jpg',
      tagLeft: 'Aging',
      tagRight: 'Fresh'
    }
  };

  function applyService(serviceName) {
    var compare = document.querySelector('.showcase-compare');
    var beforeImage = compare ? compare.querySelector('img') : null;
    var afterImage = compare ? compare.querySelector('.compare__after img') : null;
    var tagLeft = compare ? compare.querySelector('.tag-left') : null;
    var tagRight = compare ? compare.querySelector('.tag-right') : null;
    var range = compare ? compare.querySelector('.compare__range') : null;
    var label = document.querySelector('.showcase-label');
    var title = document.querySelector('.showcase-copy h3');
    var description = document.querySelector('.showcase-copy h3 + p');
    var list = document.querySelector('.feature-list');
    var config = serviceData[serviceName] || serviceData.twilight;

    if (beforeImage) beforeImage.setAttribute('src', config.before);
    if (afterImage) afterImage.setAttribute('src', config.after);
    if (tagLeft) tagLeft.textContent = config.tagLeft;
    if (tagRight) tagRight.textContent = config.tagRight;
    if (range) {
      range.value = '58';
      compare.style.setProperty('--pos', '58%');
    }
    if (label) label.textContent = config.label;
    if (title) title.textContent = config.title;
    if (description) description.textContent = config.description;
    if (list) {
      list.innerHTML = config.features.map(function (item) { return '<li>' + item + '</li>'; }).join('');
    }
  }

  document.querySelectorAll('.category-pill').forEach(function (pill) {
    pill.addEventListener('click', function () {
      document.querySelectorAll('.category-pill').forEach(function (item) {
        item.classList.toggle('is-active', item === pill);
      });
      applyService(pill.dataset.service || 'twilight');
    });
  });

  applyService('twilight');

  // Tabs (WAI-ARIA tabs pattern with arrow-key support)
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t); });
    t.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (n) { e.preventDefault(); n.focus(); select(n); }
    });
  });

  // Reveal on scroll
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.section__head, .step, .card, .promise, .price-card, .tile, .faq__list');
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (t) { t.classList.add('reveal'); io.observe(t); });
  }

  // Footer year
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
