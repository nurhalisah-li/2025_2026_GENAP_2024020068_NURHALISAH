/**
 * Universitas Handayani Makassar (UHM)
 * Client-side Simulated API Endpoint Layer
 * Returns Promises & JSON payloads for static consumption
 */

const UHM_API = {
  // GET /api/v1/news
  getNews: function(category = 'all') {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data = UHM_DB.getNews();
        if (category !== 'all') {
          data = data.filter(n => n.category.toLowerCase() === category.toLowerCase());
        }
        resolve({
          status: 200,
          message: "Success fetching news list",
          total: data.length,
          data: data
        });
      }, 150);
    });
  },

  // GET /api/v1/news/:id
  getNewsById: function(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const item = UHM_DB.getNewsById(id);
        if (item) {
          resolve({ status: 200, data: item });
        } else {
          reject({ status: 404, message: "News article not found" });
        }
      }, 100);
    });
  },

  // GET /api/v1/events
  getEvents: function() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = UHM_DB.getEvents();
        resolve({
          status: 200,
          message: "Success fetching events list",
          total: data.length,
          data: data
        });
      }, 150);
    });
  },

  // GET /api/v1/events/:id
  getEventById: function(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const item = UHM_DB.getEventById(id);
        if (item) {
          resolve({ status: 200, data: item });
        } else {
          reject({ status: 404, message: "Event not found" });
        }
      }, 100);
    });
  },

  // GET /api/v1/gallery
  getGallery: function(category = 'all') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = UHM_DB.getGallery(category);
        resolve({
          status: 200,
          message: "Success fetching gallery media items",
          category: category,
          total: data.length,
          data: data
        });
      }, 150);
    });
  },

  // POST /api/v1/admissions
  submitAdmission: function(formData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const record = UHM_DB.addAdmission(formData);
        resolve({
          status: 201,
          message: "Pendaftaran berhasil disimpan!",
          data: record
        });
      }, 300);
    });
  },

  // POST /api/v1/contact
  sendMessage: function(formData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const record = UHM_DB.addMessage(formData);
        resolve({
          status: 201,
          message: "Pesan anda telah berhasil terkirim ke Tim UHM!",
          data: record
        });
      }, 300);
    });
  }
};
