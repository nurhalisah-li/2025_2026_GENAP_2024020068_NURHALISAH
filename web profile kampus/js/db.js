/**
 * Universitas Handayani Makassar (UHM)
 * Client-Side Database & Migration Layer (LocalStorage Static Store)
 */

const UHM_DB = {
  KEYS: {
    NEWS: 'uhm_db_news',
    EVENTS: 'uhm_db_events',
    GALLERY: 'uhm_db_gallery',
    ADMISSIONS: 'uhm_db_admissions',
    MESSAGES: 'uhm_db_messages',
    MIGRATED: 'uhm_db_migrated_v1'
  },

  // Migration & Seed Function
  init: function() {
    if (!localStorage.getItem(this.KEYS.MIGRATED)) {
      console.log("[DB] Running static database migration & initial seeding...");
      
      if (typeof UHM_DATA !== 'undefined') {
        localStorage.setItem(this.KEYS.NEWS, JSON.stringify(UHM_DATA.news || []));
        localStorage.setItem(this.KEYS.EVENTS, JSON.stringify(UHM_DATA.events || []));
        localStorage.setItem(this.KEYS.GALLERY, JSON.stringify(UHM_DATA.gallery || []));
      }
      
      localStorage.setItem(this.KEYS.ADMISSIONS, JSON.stringify([]));
      localStorage.setItem(this.KEYS.MESSAGES, JSON.stringify([]));
      localStorage.setItem(this.KEYS.MIGRATED, 'true');
      console.log("[DB] Migration completed successfully!");
    } else {
      console.log("[DB] LocalStorage Database initialized & ready.");
    }
  },

  // News Table Operations
  getNews: function() {
    this.init();
    if (typeof UHM_DATA !== 'undefined' && UHM_DATA.news) {
      return UHM_DATA.news;
    }
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.NEWS)) || [];
    } catch(e) {
      return [];
    }
  },

  getNewsById: function(id) {
    const list = this.getNews();
    return list.find(n => n.id === id) || list[0];
  },

  // Events Table Operations
  getEvents: function() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.EVENTS)) || UHM_DATA.events;
    } catch(e) {
      return UHM_DATA.events;
    }
  },

  getEventById: function(id) {
    const list = this.getEvents();
    return list.find(e => e.id === id) || list[0];
  },

  // Gallery Table Operations
  getGallery: function(category = 'all') {
    this.init();
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem(this.KEYS.GALLERY)) || UHM_DATA.gallery;
    } catch(e) {
      list = UHM_DATA.gallery;
    }
    if (category !== 'all') {
      list = list.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }
    return list;
  },

  // Admissions Table Operations
  getAdmissions: function() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.ADMISSIONS)) || [];
    } catch(e) {
      return [];
    }
  },

  addAdmission: function(data) {
    const list = this.getAdmissions();
    const newItem = {
      id: 'ADM-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'TERDAFTAR (Simulasi)',
      ...data
    };
    list.push(newItem);
    localStorage.setItem(this.KEYS.ADMISSIONS, JSON.stringify(list));
    return newItem;
  },

  // Messages Table Operations
  getMessages: function() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.MESSAGES)) || [];
    } catch(e) {
      return [];
    }
  },

  addMessage: function(data) {
    const list = this.getMessages();
    const newItem = {
      id: 'MSG-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'TERKIRIM',
      ...data
    };
    list.push(newItem);
    localStorage.setItem(this.KEYS.MESSAGES, JSON.stringify(list));
    return newItem;
  }
};

// Auto run init on script load
UHM_DB.init();
