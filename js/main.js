/**
 * Universitas Handayani Makassar (UHM)
 * Main Interactive Script using jQuery
 */

$(document).ready(function () {
  console.log("UHM Script Initialized with jQuery", $.fn.jquery);

  // 1. Header scroll effect
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 30) {
      $(".header").addClass("scrolled");
    } else {
      $(".header").removeClass("scrolled");
    }
  });

  // 2. Mobile Menu Toggle with Backdrop Overlay
  function toggleMobileMenu() {
    $(".nav-menu").toggleClass("active");
    $(".hamburger").toggleClass("is-open");

    if ($("#mobileOverlay").length === 0) {
      $("body").append('<div class="mobile-overlay" id="mobileOverlay"></div>');
    }

    $("#mobileOverlay").toggleClass("active");
  }

  $(".hamburger").on("click", function (e) {
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Close mobile drawer on overlay click
  $(document).on("click", "#mobileOverlay", function () {
    toggleMobileMenu();
  });

  // Close nav menu on link click (mobile)
  $(".nav-link").on("click", function () {
    if ($(".nav-menu").hasClass("active")) {
      toggleMobileMenu();
    }
  });

  // 3. Render Announcements in Ticker if ticker element exists
  if ($("#tickerContainer").length > 0 && typeof UHM_DATA !== "undefined") {
    const tickerItems = UHM_DATA.announcements
      .map((ann) => `<span>${ann}</span> &nbsp;&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;&nbsp; `)
      .join("");
    $("#tickerContainer").html(tickerItems);
  }

  // 4. Render Stats Cards if statsGrid exists
  if ($("#statsGrid").length > 0 && typeof UHM_DATA !== "undefined") {
    const statsHtml = UHM_DATA.stats
      .map(
        (stat) => `
      <div class="stat-card">
        <div class="stat-icon">★</div>
        <div>
          <div class="stat-number">${stat.value}</div>
          <div class="stat-label">${stat.label}</div>
        </div>
      </div>
    `
      )
      .join("");
    $("#statsGrid").html(statsHtml);
  }

  // 5. Render Programs Preview on Homepage
  if ($("#featuredProgramsGrid").length > 0 && typeof UHM_DATA !== "undefined") {
    const allDepts = [];
    UHM_DATA.faculties.forEach((fac) => {
      fac.departments.forEach((dept) => {
        allDepts.push({ ...dept, facultyName: fac.name });
      });
    });

    const displayDepts = allDepts.slice(0, 3);
    const programsHtml = displayDepts
      .map(
        (dept) => `
      <div class="program-card">
        <span class="program-tag">${dept.facultyName}</span>
        <h3>${dept.name}</h3>
        <p>Program Studi jenjang ${dept.degree} terakreditasi <strong>${dept.accreditation}</strong> dengan lama studi normal ${dept.duration}. Berfokus pada keahlian praktis dan kesiapan karir.</p>
        <div class="program-meta">
          <span>Gelar: <strong>${dept.degree}</strong></span>
          <span class="accreditation">Akreditasi: ${dept.accreditation}</span>
        </div>
      </div>
    `
      )
      .join("");
    $("#featuredProgramsGrid").html(programsHtml);
  }

  // 6. Render Latest News Preview on Homepage
  if ($("#newsGridPreview").length > 0 && typeof UHM_DATA !== "undefined") {
    const newsHtml = UHM_DATA.news
      .map(
        (news) => `
      <div class="news-card">
        <div class="news-img">
          <img src="${news.image}" alt="${news.title}" loading="lazy">
          <span class="news-cat">${news.category}</span>
        </div>
        <div class="news-content">
          <div class="news-date">${news.date} | Oleh ${news.author}</div>
          <h3 class="news-title">${news.title}</h3>
          <p class="news-snippet">${news.snippet}</p>
          <a href="news.html?id=${news.id}" class="news-link">Baca Selengkapnya &rarr;</a>
        </div>
      </div>
    `
      )
      .join("");
    $("#newsGridPreview").html(newsHtml);
  }
});
