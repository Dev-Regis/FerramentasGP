// Atualizar timestamp
function updateTimestamp() {
    const now = new Date();
    // Formata a data (dd/mm/aaaa)
    const date = now.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    // Formata o horário com segundos (HH:MM:SS)
    const time = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('timestamp').textContent = `${date} - ${time}`;
}

// Função de compartilhamento
function shareProfile() {
    const url = window.location.href;
    // Atualiza o título de compartilhamento para refletir a nova marca
    const title = 'Ferramentas GP - Bio Link';
    
    if (navigator.share) {
        navigator.share({
            title: title,
            // Texto descritivo que será exibido ao compartilhar
            text: 'Ferramentas GP – sua central de produtividade do Grupo Petrópolis TRS. Encontre em um único link as Ferramentas TPM, os formulários de envase e o registro/RH para facilitar o seu dia a dia.',
            url: url
        }).catch(console.error);
    } else {
        // Fallback para navegadores que não suportam Web Share API
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copiado para a área de transferência!');
        }).catch(() => {
            // Fallback manual
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Link copiado para a área de transferência!');
        });
    }
}

// Toggle do painel de configurações
function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    panel.classList.toggle('active');
}

// Fechar painel ao clicar fora
document.addEventListener('click', function(event) {
    const panel = document.getElementById('settingsPanel');
    const toggle = document.querySelector('.settings-toggle');
    
    if (!panel.contains(event.target) && !toggle.contains(event.target)) {
        panel.classList.remove('active');
    }
});

// Configurar cores de fundo
document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
        const color = this.dataset.color;
        // Remover classes de tema
        const themes = ['theme-minimalist','theme-contrast','theme-pastel'];
        themes.forEach(t => document.body.classList.remove(t));
        // Aplicar classe de cor
        document.body.className = color;

        // Remover classe active de todas as opções
        document.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('active');
        });
        document.querySelectorAll('.theme-option').forEach(opt => {
            opt.classList.remove('active');
        });

        // Adicionar classe active à opção selecionada
        this.classList.add('active');

        // Salvar preferência de cor e remover preferência de tema
        localStorage.setItem('backgroundColor', color);
        localStorage.removeItem('selectedTheme');

        // Ajustar a cor do texto com base no novo fundo
        updateTextColorBasedOnBackground();
        // Ajustar a opacidade do painel com base no novo fundo
        applyPanelOpacity();
    });
});

// Configurar seleção de temas
document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', function() {
        const theme = this.dataset.theme;
        const themes = ['theme-minimalist','theme-contrast','theme-pastel'];
        const gradients = ['gradient1','gradient2','gradient3','gradient4','gradient5','gradient6','gradient7','gradient8','gradient9','gradient10','gradient11','gradient12','gradient13','gradient14'];
        // Remover todas as classes de tema
        themes.forEach(t => document.body.classList.remove(t));
        // Remover todas as classes de gradiente
        gradients.forEach(g => document.body.classList.remove(g));
        // Remover estados ativos das opções de cor e tema
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
        document.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
        // Adicionar classe do tema selecionado
        document.body.classList.add(theme);
        this.classList.add('active');
        // Salvar preferência
        localStorage.setItem('selectedTheme', theme);
        // Remover preferência de cor de fundo (caso exista)
        localStorage.removeItem('backgroundColor');

        // Ajustar a cor do texto com base no novo tema
        updateTextColorBasedOnBackground();
        // Ajustar a opacidade do painel com base no novo tema
        applyPanelOpacity();
    });
});


// Configurar transparência dos botões
document.getElementById('buttonOpacity').addEventListener('input', function() {
    const opacity = this.value;
    document.querySelectorAll('.link-button, .sub-menu-item').forEach(button => {
        button.style.background = `rgba(255, 255, 255, ${opacity})`;
    });
    
    // Salvar preferência
    localStorage.setItem('buttonOpacity', opacity);
});

// Configurar tamanho da logo
document.getElementById('logoSize').addEventListener('input', function() {
    const size = this.value;
    const logo = document.getElementById('profileImg');
    logo.style.width = size + 'px';
    logo.style.height = size + 'px';
    
    // Salvar preferência
    localStorage.setItem('logoSize', size);
});

// Carregar preferências salvas
function loadPreferences() {
    // Tema e cor de fundo
    const themes = ['theme-minimalist','theme-contrast','theme-pastel'];
    const gradients = ['gradient1','gradient2','gradient3','gradient4','gradient5','gradient6','gradient7','gradient8','gradient9','gradient10','gradient11','gradient12','gradient13','gradient14'];
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        // Remover classes de gradiente
        gradients.forEach(g => document.body.classList.remove(g));
        // Adicionar tema salvo
        document.body.classList.add(savedTheme);
        // Marcar opção de tema ativa
        const themeOpt = document.querySelector(`[data-theme="${savedTheme}"]`);
        if (themeOpt) themeOpt.classList.add('active');
    } else {
        // Carregar cor de fundo
        const savedColor = localStorage.getItem('backgroundColor');
        if (savedColor) {
            document.body.className = savedColor;
            document.querySelector(`[data-color="${savedColor}"]`)?.classList.add('active');
        } else {
            document.querySelector('[data-color="gradient1"]').classList.add('active');
        }
    }
    // Após aplicar tema ou cor de fundo, ajustar cor do texto
    updateTextColorBasedOnBackground();
    // Ajustar opacidade do painel com base na cor de fundo ou tema
    applyPanelOpacity();
    

    
    // Transparência dos botões
    const savedOpacity = localStorage.getItem('buttonOpacity');
    if (savedOpacity) {
        let op = parseFloat(savedOpacity);
        // Garante que a opacidade mínima seja 0.5 para preservar contraste
        if (op < 0.5) op = 0.5;
        document.getElementById('buttonOpacity').value = op;
        document.querySelectorAll('.link-button, .sub-menu-item').forEach(button => {
            button.style.background = `rgba(255, 255, 255, ${op})`;
        });
    }
    
    // Tamanho da logo
    const savedSize = localStorage.getItem('logoSize');
    if (savedSize) {
        document.getElementById('logoSize').value = savedSize;
        const logo = document.getElementById('profileImg');
        logo.style.width = savedSize + 'px';
        logo.style.height = savedSize + 'px';
    }
}

// === Lógica do Modal de Senha ===
function showPasswordModal() {
    const modal = document.getElementById('passwordModal');
    if (modal) modal.style.display = 'flex';
}

function hidePasswordModal() {
    const modal = document.getElementById('passwordModal');
    if (modal) modal.style.display = 'none';
}

function checkPasswordExpiry() {
    const expiration = localStorage.getItem('passwordExpiration');
    const now = Date.now();
    if (!expiration || isNaN(parseInt(expiration)) || now > parseInt(expiration)) {
        // Exibir modal para senha (não registra acesso até validação)
        showPasswordModal();
    } else {
        // Senha ainda válida: esconder o modal e registrar visita
        hidePasswordModal();
        // Registrar visita para fins analíticos somente quando o acesso é autorizado
        recordVisit();
    }
}

function setupPasswordModal() {
    const submitBtn = document.getElementById('passwordSubmit');
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('passwordError');
    if (!submitBtn || !input) return;
    submitBtn.addEventListener('click', function() {
        const entered = input.value.trim();
        if (entered === '2006') {
            // Senha correta, definir expiração para 30 dias
            const expiry = Date.now() + 30 * 24 * 60 * 60 * 1000;
            localStorage.setItem('passwordExpiration', expiry.toString());
            hidePasswordModal();
            // Registrar visita após o desbloqueio da senha
            recordVisit();
            error.style.display = 'none';
            input.value = '';
        } else {
            // Senha incorreta
            if (error) error.style.display = 'block';
        }
    });
    // Permitir submit com Enter
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
}

// Garantir que apenas um sub-menu (<details>) esteja aberto por vez
function setupAccordionBehavior() {
    const detailsList = document.querySelectorAll('details.link-item');
    detailsList.forEach(detail => {
        detail.addEventListener('toggle', function() {
            if (this.open) {
                detailsList.forEach(other => {
                    if (other !== this && other.open) {
                        other.removeAttribute('open');
                    }
                });
            }
        });
    });
}

// Configurar links dos botões e sub-menus
function setupButtonLinks() {
    // Sub-menu items abrem seus links em nova aba
    document.querySelectorAll('.sub-menu-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const link = this.dataset.link;
            if (link && link !== '#') {
                window.open(link, '_blank');
            } else {
                alert('Link não configurado ainda. Configure o link no código HTML.');
            }
        });
    });
    // Não é necessário configurar evento nos botões principais quando usamos <details>.
}

// Adicionar efeitos de hover personalizados
function addHoverEffects() {
    // Hover para botões principais
    document.querySelectorAll('.link-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    // Hover para itens de sub-menu
    document.querySelectorAll('.sub-menu-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Função para personalizar ícones dos botões
function customizeButtonIcons() {
    // Esta função pode ser expandida para permitir mudança de ícones
    // Por enquanto, apenas define cores específicas para cada rede social
    const buttons = document.querySelectorAll('.link-button');
    
    buttons.forEach((button, index) => {
        const icon = button.querySelector('.icon');
        switch(index) {
            case 0: // Instagram
                icon.style.background = 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)';
                break;
            case 1: // Facebook
                icon.style.background = '#1877f2';
                break;
            case 2: // YouTube
                icon.style.background = '#ff0000';
                break;
            case 3: // WhatsApp
                icon.style.background = '#25d366';
                break;
            case 4: // Website
                icon.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                break;
        }
    });
}

// Configura a opacidade do painel de configurações.
// O valor do slider é aplicado dinamicamente ao fundo do painel e persistido.
function applyPanelOpacity() {
    const panel = document.getElementById('settingsPanel');
    const slider = document.getElementById('panelOpacity');
    if (!panel || !slider) return;
    const val = parseFloat(slider.value);
    /*
     * Quando o controle deslizante de opacidade é movido para valores muito baixos,
     * o painel de configurações deve desaparecer completamente. Para isso, usamos
     * um limite de 0.1: qualquer valor igual ou menor é considerado totalmente
     * transparente. Nesse caso removemos a cor de fundo, borda, sombra e
     * desfocagem para que apenas os conteúdos internos fiquem visíveis sobre
     * a página. Acima desse limite, restauramos todos os estilos visuais e
     * aplicamos a cor de fundo (clara ou escura) proporcional à opacidade.
     */
    if (val <= 0.1) {
        // Painel totalmente invisível
        panel.style.background = 'transparent';
        panel.style.backdropFilter = 'none';
        panel.style.border = 'none';
        panel.style.boxShadow = 'none';
    } else {
        // Restaurar desfoque, borda e sombra padrão
        panel.style.backdropFilter = 'blur(20px)';
        panel.style.border = '1px solid rgba(255, 255, 255, 0.3)';
        panel.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        // Determinar se o painel deve usar fundo claro ou escuro com base no tema atual
        const isDarkPanel = document.body.classList.contains('theme-contrast') || document.body.classList.contains('dark-mode');
        if (isDarkPanel) {
            panel.style.background = `rgba(0, 0, 0, ${val})`;
        } else {
            panel.style.background = `rgba(255, 255, 255, ${val})`;
        }
    }
}

function setupPanelOpacitySlider() {
    const slider = document.getElementById('panelOpacity');
    const panel = document.getElementById('settingsPanel');
    if (!slider || !panel) return;
    // Carregar preferência salva
    const saved = localStorage.getItem('panelOpacity');
    if (saved !== null) {
        slider.value = saved;
    }
    // Aplicar opacidade inicial
    applyPanelOpacity();
    // Listener para mudanças
    slider.addEventListener('input', function() {
        applyPanelOpacity();
        localStorage.setItem('panelOpacity', this.value);
    });
}

/**
 * Ajusta dinamicamente a cor do texto do cabeçalho e do timestamp de acordo com
 * o plano de fundo selecionado ou tema aplicado. Planos de fundo mais escuros
 * exigem texto claro (quase branco) para cumprir as regras de contraste, enquanto
 * fundos claros podem usar texto escuro. A detecção considera tanto classes
 * de gradiente escuras quanto o modo escuro e o tema contrastante.
 */
function updateTextColorBasedOnBackground() {
    // Classes de gradiente ou tema que são consideradas de fundo escuro
    const darkClasses = ['gradient1', 'gradient8', 'gradient9', 'theme-contrast'];
    let isDark = document.body.classList.contains('dark-mode');
    // Verifica se o corpo contém alguma classe de fundo escuro
    darkClasses.forEach(cls => {
        if (document.body.classList.contains(cls)) {
            isDark = true;
        }
    });

    const title = document.querySelector('.profile-name h1');
    const timestampEl = document.getElementById('timestamp');
    if (title && timestampEl) {
        if (isDark) {
            // Texto claro para fundos escuros
            title.style.color = '#f5f5f5';
            timestampEl.style.color = 'rgba(255, 255, 255, 0.8)';
        } else {
            // Texto escuro para fundos claros
            title.style.color = '#333';
            timestampEl.style.color = '#333';
        }
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateTimestamp();
    loadPreferences();
    setupButtonLinks();
    addHoverEffects();
    customizeButtonIcons();

    // Ajustar a cor do texto ao carregar a página
    updateTextColorBasedOnBackground();

    // Configurar controle de opacidade do painel de configurações
    setupPanelOpacitySlider();

    // Configuração do modal de senha
    setupPasswordModal();
    checkPasswordExpiry();

    // Configurar comportamento do acordeão para sub-menus
    setupAccordionBehavior();

    // Redimensionar o canvas e iniciar a animação de partículas. Na versão
    // anterior estes comandos estavam em uma segunda rotina de inicialização,
    // ocasionando a duplicação de ouvintes de eventos e a abertura de duas
    // abas ao clicar nos itens de sub‑menu. Agora eles são executados aqui
    // uma única vez.
    resizeCanvas();
    animateParticles();

    // Remover quaisquer preferências de modo escuro gravadas anteriormente.
    // O botão de alternância foi removido da interface, portanto a página
    // sempre deve ser carregada no modo padrão. Caso exista a chave
    // 'darkMode' no localStorage, eliminamos para evitar que a classe
    // 'dark-mode' seja aplicada inadvertidamente.
    localStorage.removeItem('darkMode');

    
    // Atualizar timestamp a cada segundo para exibir também os segundos
    setInterval(updateTimestamp, 1000);
});

// Função para adicionar novos botões (pode ser expandida)
function addNewButton(iconClass, text, link) {
    const container = document.querySelector('.links-container');
    const newButton = document.createElement('a');
    newButton.href = '#';
    newButton.className = 'link-button';
    newButton.dataset.link = link;
    
    newButton.innerHTML = `
        <div class="icon">
            <i class="${iconClass}"></i>
        </div>
        <span>${text}</span>
    `;
    
    container.appendChild(newButton);
    
    // Reconfigurar eventos
    setupButtonLinks();
    addHoverEffects();
}

// Função para remover botão
function removeButton(index) {
    const buttons = document.querySelectorAll('.link-button');
    if (buttons[index]) {
        buttons[index].remove();
    }
}

// Sistema de música de fundo removido

// Lógica para Modo Escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    // Atualizar ícone do botão de modo escuro
    const darkModeToggleBtn = document.querySelector('.dark-mode-toggle i');
    if (isDarkMode) {
        darkModeToggleBtn.classList.remove('fa-moon');
        darkModeToggleBtn.classList.add('fa-sun');
    } else {
        darkModeToggleBtn.classList.remove('fa-sun');
        darkModeToggleBtn.classList.add('fa-moon');
    }

    // Ajustar cor do texto após alternar o modo
    updateTextColorBasedOnBackground();

    // Ajustar opacidade do painel com base no novo modo
    applyPanelOpacity();
}

// Lógica para Efeitos Visuais Interativos (Partículas)
const canvas = document.getElementById('interactiveCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
}

canvas.addEventListener('mousemove', function(e) {
    for (let i = 0; i < 3; i++) {
        particles.push(new Particle(e.x, e.y));
    }
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animateParticles);
}

// === Funções de Análise de Visitas ===
// Detecta o tipo de dispositivo com base no user agent. Retorna 'Celular' ou 'Desktop'.
function detectDeviceType() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    // Detecta smartphones e tablets
    if (/android/i.test(ua) || /ipad|iphone|ipod/i.test(ua) || /mobile/i.test(ua)) {
        return 'Celular';
    }
    return 'Desktop';
}

// Detecta o sistema operacional a partir do user agent.
function detectOS() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(ua)) return 'Windows Phone';
    if (/windows/i.test(ua)) return 'Windows';
    if (/android/i.test(ua)) return 'Android';
    if (/iphone|ipad|ipod/i.test(ua)) return 'iOS';
    if (/mac/i.test(ua)) return 'MacOS';
    if (/linux/i.test(ua)) return 'Linux';
    return 'Desconhecido';
}

// Detecta o navegador a partir do user agent.
function detectBrowser() {
    const ua = navigator.userAgent;
    if (/edg/i.test(ua)) return 'Edge';
    if (/chrome/i.test(ua)) return 'Chrome';
    if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari';
    if (/firefox/i.test(ua)) return 'Firefox';
    if (/opera|opr/i.test(ua)) return 'Opera';
    return 'Desconhecido';
}

// Obtém cidade e país aproximados a partir do fuso horário.
// Esta abordagem utiliza a propriedade Intl.DateTimeFormat().resolvedOptions().timeZone,
// que retorna valores como 'America/Sao_Paulo'. Desmembra a região em país e cidade.
function getLocationFromTimeZone() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    let country = 'Desconhecido';
    let city = 'Desconhecido';
    if (tz.includes('/')) {
        const parts = tz.split('/');
        country = parts[0];
        city = parts[1].replace(/_/g, ' ');
    }
    return { country, city };
}

// Registra um acesso no localStorage para análise posterior. Cada registro inclui
// informações sobre dispositivo, sistema operacional, navegador, idioma, referenciador,
// localização aproximada (país/cidade) e carimbo de data/hora.
function recordVisit() {
    try {
        const analytics = JSON.parse(localStorage.getItem('analyticsData')) || [];
        const deviceType = detectDeviceType();
        const os = detectOS();
        const browser = detectBrowser();
        const language = navigator.language || navigator.userLanguage || 'desconhecido';
        let referrer = document.referrer;
        if (!referrer) referrer = 'Direto';
        const { country, city } = getLocationFromTimeZone();
        const timestamp = Date.now();
        analytics.push({ deviceType, os, browser, language, referrer, country, city, timestamp });
        localStorage.setItem('analyticsData', JSON.stringify(analytics));
    } catch (e) {
        console.error('Erro ao registrar visita:', e);
    }
}

// Exportar funções para uso global
window.addNewButton = addNewButton;
window.removeButton = removeButton;
window.shareProfile = shareProfile;
window.toggleSettings = toggleSettings;
window.toggleDarkMode = toggleDarkMode;

// Inicialização
/*
 * A segunda rotina de inicialização duplicava eventos e adicionava handlers
 * redundantes, o que fazia com que os cliques nos sub‑menus abrissem duas
 * abas. Essa duplicação é removida para evitar a criação de ouvintes
 * duplicados. As chamadas necessárias (como redimensionar o canvas, iniciar
 * a animação de partículas e limpar o modo escuro) foram movidas para a
 * primeira rotina de inicialização.
 */

window.addEventListener('resize', resizeCanvas);

// Registrar o Service Worker para habilitar funcionalidades de PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .catch(err => console.error('Falha ao registrar o service worker:', err));
    });
}

