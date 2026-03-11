// Externalized JS from index.html
(function() {
    const projects = [
        {
            id: 1,
            title: "website kalkulator",
            category: "kalkulator",
            year: "2025",
            description: "website kalkulator menggunakan javascript.",
            features: ["dapat menghitung perhtungan matematika dasar"],
            image: "img2.png",
            demoUrl: "https://kalkulator-rff707.netlify.app/", /* contoh link demo lokal */
            codeUrl: "https://github.com/your-username/kalkulator" /* contoh link repositori */,
            imageLabel: "website kalkulator menggunakan javascript"
        },
        {
            id: 2,
            title: "Game tebak angka",
            category: "Game",
            year: "2025",
            description: "Game tebak angka sederhana menggunakan html, css, dan JavaScript.",
            features: ["Tebak angka"],
            image: "img3.png",
            demoUrl: "https://kosi123672.github.io/tebak-angka/",
            codeUrl: "https://github.com/Kosi123672/tebak-angka.git",
            imageLabel: "Game Tebak Angka Preview"
        },
        {
            id: 3,
            title: "website landing page produk",
            cetegory: "website",
            year:"2026",
            description:"website ini hanya menggunakan html dan css ",
            features: ["hero section", "navigasi menu", "section produk",],
            image: "img4.png",
            demoUrl: "https://kosi123672.github.io/web-landing-page-produk-RFF707/",
            codeUrl: "https://github.com/Kosi123672/web-landing-page-produk-RFF707",
            imageLabel: "website landing page sederhana hanya pakai html dan css"
        }
    ];

    // helper: jika project.image adalah nama file lokal (mis. img1.png), gunakan folder ./image/
    function resolveImagePath(path) {
        if (!path) return '';
        if (/^(https?:)?\/\//.test(path) || path.startsWith('/') || path.startsWith('./') || path.startsWith('../')) {
            return path;
        }
        return './image/' + path;
    }
    const projectListEl = document.getElementById('project-list');
    
    function renderProjects() {
        let htmlString = '';
        projects.forEach(proj => {
            const imgSrc = resolveImagePath(proj.image) || `https://via.placeholder.com/400x200?text=${encodeURIComponent(proj.title)}`;
            htmlString += `
                <div class="project-card bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                    <!-- GAMBAR PROJECT -->
                    <div class="w-full h-48 overflow-hidden bg-indigo-100">
                        <img src="${imgSrc}" 
                             alt="${proj.title}" 
                             class="w-full h-full object-cover"
                             onerror="this.onerror=null; this.src='https://via.placeholder.com/400x200?text=${encodeURIComponent(proj.title)}';">
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                        <h3 class="text-xl font-bold text-slate-800 mb-1">${proj.title}</h3>
                        <p class="text-sm text-indigo-500 mb-3">${proj.category} · ${proj.year}</p>
                        <p class="text-slate-500 text-sm flex-grow mb-5">${proj.description.substring(0, 70)}...</p>
                        <button class="view-project-btn mt-auto bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition px-4 py-2 rounded-full text-sm font-medium text-center w-full"
                                data-id="${proj.id}">
                            <i class="fa-regular fa-eye mr-1"></i> Lihat Project
                        </button>
                    </div>
                </div>
            `;
        });
        projectListEl.innerHTML = htmlString;
    }

    renderProjects();

    // ===== MODAL LOGIC =====
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalYear = document.getElementById('modalYear');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalImagePlaceholder = document.getElementById('modalImagePlaceholder');
    const modalDemoLink = document.getElementById('modalDemoLink');
    const modalCodeLink = document.getElementById('modalCodeLink');
    
    // tombol close
    const closeBtn = document.getElementById('closeModalBtn');
    const closeBtn2 = document.getElementById('modalCloseBtn2');

    // function tampilkan modal dengan data proyek
    function showProjectModal(projectId) {
        // cari proyek berdasarkan id
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        // isi konten modal
        modalTitle.textContent = project.title;
        modalCategory.textContent = project.category;
        modalYear.textContent = project.year;
        modalDescription.textContent = project.description;
        
        // update gambar di modal (mengganti placeholder dengan gambar project)
        modalImagePlaceholder.innerHTML = ''; // kosongkan
        modalImagePlaceholder.className = 'w-full h-48 rounded-xl overflow-hidden'; // reset class
        if (project.image) {
            const img = document.createElement('img');
            img.src = resolveImagePath(project.image) || `https://via.placeholder.com/400x200?text=${encodeURIComponent(project.title)}`;
             img.alt = project.title;
             img.className = 'w-full h-full object-cover';
             img.onerror = function() {
                 this.onerror = null;
                 this.src = 'https://via.placeholder.com/400x200?text=Preview';
             };
             modalImagePlaceholder.appendChild(img);
        } else {
            // tampilkan placeholder yang sama seperti markup awal
            modalImagePlaceholder.innerHTML = `<div class="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium"><i class="fa-regular fa-image text-3xl"></i><span class="ml-2">${project.imageLabel || 'Preview Project'}</span></div>`;
        }

        // buat list fitur
        let featuresList = '';
        project.features.forEach(f => {
            featuresList += `<li><i class="fa-regular fa-circle-check text-indigo-400 mr-2 text-xs"></i>${f}</li>`;
        });
        modalFeatures.innerHTML = featuresList;

        // update demo & code links (tampilkan jika ada)
        if (modalDemoLink) {
            if (project.demoUrl) {
                modalDemoLink.href = project.demoUrl;
                modalDemoLink.classList.remove('hidden');
            } else {
                modalDemoLink.removeAttribute('href');
                modalDemoLink.classList.add('hidden');
            }
        }
        if (modalCodeLink) {
            if (project.codeUrl) {
                modalCodeLink.href = project.codeUrl;
                modalCodeLink.classList.remove('hidden');
            } else {
                modalCodeLink.removeAttribute('href');
                modalCodeLink.classList.add('hidden');
            }
        }

        // tampilkan modal & tambah class ke body
        modal.classList.remove('hidden');
        document.body.classList.add('modal-open');
    }

    // tutup modal
    function closeProjectModal() {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }

    // event listener untuk semua tombol "Lihat Project"
    document.addEventListener('click', function(e) {
        if (e.target.closest('.view-project-btn')) {
            const btn = e.target.closest('.view-project-btn');
            const projectId = parseInt(btn.getAttribute('data-id'));
            showProjectModal(projectId);
        }
    });

    // close modal via tombol
    closeBtn.addEventListener('click', closeProjectModal);
    closeBtn2.addEventListener('click', closeProjectModal);

    // klik di luar modal (overlay) tutup modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProjectModal();
        }
    });

    // escape key untuk tutup modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeProjectModal();
        }
    });

})();

// optional smooth tambahan
console.log('Portfolio siap — dengan gambar profile dan preview gambar project.');
(function(){
    // Theme toggle logic
    const themeToggle = document.getElementById('theme-toggle');
    const bodyEl = document.body;
    const spans = themeToggle ? themeToggle.querySelectorAll('span') : [];

    function setTheme(theme){
        bodyEl.setAttribute('data-theme', theme);
        spans.forEach(s => s.classList.toggle('active', s.dataset.theme === theme));
        // persist
        try { localStorage.setItem('site-theme', theme); } catch(e){}
    }

    // initialize from localStorage or prefers-color-scheme
    const saved = (function(){ try { return localStorage.getItem('site-theme'); } catch(e) { return null; } })();
    if (saved) setTheme(saved);
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark');
    else setTheme('light');

    if (themeToggle) {
        themeToggle.addEventListener('click', function(e){
            const target = e.target.closest('span');
            if (!target) return;
            const theme = target.dataset.theme;
            setTheme(theme);
        });
    }

    // Simple particle background (canvas)
    try {
        const container = document.getElementById('particles-container');
        if (container) {
            const canvas = document.createElement('canvas');
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            container.appendChild(canvas);
            const ctx = canvas.getContext('2d');
            const particles = [];
            const count = Math.min(80, Math.max(20, Math.floor(innerWidth/20)));
            for (let i=0;i<count;i++) particles.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, vx:(Math.random()-0.5)*0.6, vy:(Math.random()-0.5)*0.6, r: Math.random()*1.8+0.6 });
            function loop(){
                ctx.clearRect(0,0,canvas.width,canvas.height);
                particles.forEach(p=>{
                    p.x+=p.vx; p.y+=p.vy;
                    if (p.x<0||p.x>canvas.width) p.vx*=-1;
                    if (p.y<0||p.y>canvas.height) p.vy*=-1;
                    ctx.beginPath(); ctx.fillStyle = 'rgba(99,102,241,0.08)'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
                });
                requestAnimationFrame(loop);
            }
            loop();
            window.addEventListener('resize', function(){ canvas.width = innerWidth; canvas.height = innerHeight; });
        }
    } catch(e) { /* gracefully ignore */ }

})();
