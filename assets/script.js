/* ============================================================
   卢岚 · 个人简历网站 — 交互脚本
   ============================================================ */

/* ------------------------------------------------------------
   竞赛照片（assets/img/comp-*.jpg）
   顺序与「项目与竞赛」板块从上到下的顺序一致。
   如需修改标题，直接改下面每项的 caption 文本即可。
   ------------------------------------------------------------ */
var COMPETITION_PHOTOS = [
  { src: "assets/img/comp-siemens.jpg",  caption: "「西门子杯」中国智能制造挑战赛 · 安徽省一等奖" },
  { src: "assets/img/comp-apply7.jpg",   caption: "第七届安徽省大学生工业机器人应用大赛 · 省级一等奖" },
  { src: "assets/img/comp-skill8.jpg",   caption: "第八届安徽省工业机器人技术应用技能大赛 · 省级二等奖" },
  { src: "assets/img/comp-creative.jpg", caption: "第三届安徽省高校智能机器人创意大赛 · 省级二等奖" },
  { src: "assets/img/comp-jaka.jpg",     caption: "嘉克杯国际焊接大赛 · 焊接机器人赛道 · 学生组三等奖" }
];

/* ------------------------------------------------------------
   证书 / 获奖佐证照片（assets/img/cert-*.jpg，共 16 张）
   如需修改标题，直接改下面每项的 caption 文本即可。
   图片顺序与原文件夹「我的证书」中按文件名排序一致。
   ------------------------------------------------------------ */
var EVIDENCE_PHOTOS = [
  { src: "assets/img/cert-1.jpg",  caption: "证书 / 获奖佐证 · 1" },
  { src: "assets/img/cert-2.jpg",  caption: "证书 / 获奖佐证 · 2" },
  { src: "assets/img/cert-3.jpg",  caption: "证书 / 获奖佐证 · 3" },
  { src: "assets/img/cert-4.jpg",  caption: "证书 / 获奖佐证 · 4" },
  { src: "assets/img/cert-5.jpg",  caption: "证书 / 获奖佐证 · 5" },
  { src: "assets/img/cert-6.jpg",  caption: "证书 / 获奖佐证 · 6" },
  { src: "assets/img/cert-7.jpg",  caption: "证书 / 获奖佐证 · 7" },
  { src: "assets/img/cert-8.jpg",  caption: "证书 / 获奖佐证 · 8" },
  { src: "assets/img/cert-9.jpg",  caption: "证书 / 获奖佐证 · 9" },
  { src: "assets/img/cert-10.jpg", caption: "证书 / 获奖佐证 · 10" },
  { src: "assets/img/cert-11.jpg", caption: "证书 / 获奖佐证 · 11" },
  { src: "assets/img/cert-12.jpg", caption: "证书 / 获奖佐证 · 12" },
  { src: "assets/img/cert-13.jpg", caption: "证书 / 获奖佐证 · 13" },
  { src: "assets/img/cert-14.jpg", caption: "证书 / 获奖佐证 · 14" },
  { src: "assets/img/cert-15.jpg", caption: "证书 / 获奖佐证 · 15" },
  { src: "assets/img/cert-16.jpg", caption: "证书 / 获奖佐证 · 16" }
];

/* 生活照（assets/img/life.jpg） */
var LIFE_PHOTOS = [
  { src: "assets/img/life.jpg", caption: "生活照" }
];

var ALBUMS = {
  comp: COMPETITION_PHOTOS,
  evidence: EVIDENCE_PHOTOS,
  life: LIFE_PHOTOS
};

/* ---- 灯箱 ---- */
var lightbox = document.getElementById("lightbox");
var lightboxImg = document.getElementById("lightbox-img");
var lightboxCaption = document.getElementById("lightbox-caption");
var lightboxCount = document.getElementById("lightbox-count");
var currentAlbum = "evidence";
var currentIndex = 0;

function openLightbox(album, index) {
  currentAlbum = album;
  currentIndex = index;
  updateLightbox();
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
}

function updateLightbox() {
  var photos = ALBUMS[currentAlbum];
  var photo = photos[currentIndex];
  lightboxImg.src = photo.src;
  lightboxImg.alt = photo.caption;
  lightboxCaption.textContent = photo.caption;
  lightboxCount.textContent = (currentIndex + 1) + " / " + photos.length;
}

function stepLightbox(delta) {
  var photos = ALBUMS[currentAlbum];
  currentIndex = (currentIndex + delta + photos.length) % photos.length;
  updateLightbox();
}

document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
document.getElementById("lightbox-prev").addEventListener("click", function () { stepLightbox(-1); });
document.getElementById("lightbox-next").addEventListener("click", function () { stepLightbox(1); });

lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", function (e) {
  if (lightbox.hidden) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "ArrowRight") stepLightbox(1);
});

/* ---- 生成「照片佐证」相册缩略图 ---- */
(function renderGallery() {
  var gallery = document.getElementById("gallery");
  if (!gallery) return;

  EVIDENCE_PHOTOS.forEach(function (photo, index) {
    var item = document.createElement("div");
    item.className = "gallery-item";
    item.setAttribute("data-index", index);
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", photo.caption);

    var img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.caption;
    img.loading = "lazy";

    var cap = document.createElement("span");
    cap.className = "gallery-cap";
    cap.textContent = photo.caption;

    item.appendChild(img);
    item.appendChild(cap);
    item.addEventListener("click", function () { openLightbox("evidence", index); });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox("evidence", index); }
    });

    gallery.appendChild(item);
  });
})();

/* ---- 绑定所有可点击照片（竞赛照片 + 生活照） ---- */
(function bindClickablePhotos() {
  var figures = document.querySelectorAll("figure[data-album]");
  figures.forEach(function (fig) {
    fig.setAttribute("role", "button");
    fig.setAttribute("tabindex", "0");
    fig.addEventListener("click", function () {
      openLightbox(fig.getAttribute("data-album"), parseInt(fig.getAttribute("data-index"), 10));
    });
    fig.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(fig.getAttribute("data-album"), parseInt(fig.getAttribute("data-index"), 10));
      }
    });
  });
})();

/* ---- 访客登记 ---- */
(function initRegister() {
  var modal = document.getElementById("register");
  var form = document.getElementById("register-form");
  var submitBtn = document.getElementById("register-submit");
  var errorEl = document.getElementById("register-error");
  var skipEl = document.getElementById("register-skip");
  var skipLink = document.getElementById("register-skip-link");

  if (!modal || !form) return;

  function dismissAndRemember() {
    document.body.style.overflow = "";
    localStorage.setItem("lulan_resume_registered", "1");
    modal.hidden = true;
  }

  // 本浏览器已登记/跳过过的，不再弹窗
  if (localStorage.getItem("lulan_resume_registered")) {
    modal.hidden = true;
    return;
  }

  modal.hidden = false;
  document.body.style.overflow = "hidden";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    var company = (fd.get("公司名称") || "").trim();
    var name = (fd.get("姓名") || "").trim();

    if (!company || !name) {
      errorEl.textContent = "请填写公司名称和姓名";
      errorEl.hidden = false;
      return;
    }
    errorEl.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "提交中…";

    var payload = {
      _subject: "新访客登记 · 卢岚简历网站",
      _template: "table",
      "公司名称": company,
      "姓名": name,
      "职位": (fd.get("职位") || "").trim(),
      "联系电话": (fd.get("联系电话") || "").trim()
    };

    fetch("https://formsubmit.co/ajax/1591293446@qq.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data && data.success === "false") {
          throw new Error("rejected");
        }
        form.innerHTML = '<p class="register-thanks">感谢登记，正在进入简历…</p>';
        setTimeout(dismissAndRemember, 700);
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = "提交并查看简历";
        errorEl.textContent = "提交失败，请稍后重试";
        errorEl.hidden = false;
        skipEl.hidden = false;
      });
  });

  skipLink.addEventListener("click", function (e) {
    e.preventDefault();
    dismissAndRemember();
  });
})();
