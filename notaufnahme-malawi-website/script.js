// ============ Gemeinsames Script ============

// Mobile-Menü
document.addEventListener('DOMContentLoaded', function(){
  var t = document.querySelector('.menu-toggle');
  var m = document.getElementById('navmenu');
  if(t && m){ t.addEventListener('click', function(){ m.classList.toggle('open'); }); }

  var y = document.getElementById('year');
  if(y){ y.textContent = new Date().getFullYear(); }

  // Fortschrittsbalken (nur auf Landing vorhanden)
  var bar = document.getElementById('bar');
  var raised = document.getElementById('raisedAmount');
  if(bar && typeof SPENDENSTAND !== 'undefined' && typeof SPENDENZIEL !== 'undefined'){
    var fmt = function(n){ return n.toLocaleString('de-DE') + ' €'; };
    if(raised){ raised.textContent = fmt(SPENDENSTAND); }
    var pct = Math.max(0, Math.min(100, (SPENDENSTAND / SPENDENZIEL) * 100));
    setTimeout(function(){ bar.style.width = pct + '%'; }, 300);
  }

  // Sanftes Einblenden der Abschnitte beim Scrollen
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce && 'IntersectionObserver' in window){
    var blocks = document.querySelectorAll('section:not(.subhero):not(.hero) > .wrap');
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('reveal-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    for(var i=0;i<blocks.length;i++){ io.observe(blocks[i]); }
  }
});
