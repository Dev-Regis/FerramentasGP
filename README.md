# Bio Link - Ferramentas GP

Uma Bio Link moderna e personalizável inspirada no design fornecido, com funcionalidades avançadas de customização.

## 🚀 Características

- **Design Moderno**: Interface limpa com efeitos de glassmorphism
- **Totalmente Responsivo**: Funciona perfeitamente em desktop e mobile
- **Personalizável**: Múltiplas opções de customização
- **Funcionalidade de Compartilhamento**: Botão para compartilhar o perfil
- **Animações Suaves**: Transições e efeitos visuais elegantes

## 🎨 Opções de Personalização

### 1. Cores de Fundo
- 14 gradientes pré-definidos
- Configurações salvas automaticamente

### 2. Botões
- Transparência ajustável
- Ícones coloridos para cada rede social
- Links facilmente editáveis
- Efeitos hover personalizados

### 3. Logo
- Tamanho ajustável
- Formato redondo automático
- Bordas e sombras elegantes

## 📝 Como Personalizar

### Alterando Links dos Botões
Edite o arquivo `index.html` e modifique os atributos `data-link`:

```html
<a href="#" class="link-button" data-link="SEU_LINK_AQUI">
```

### Adicionando Novos Botões
Use a função JavaScript `addNewButton()`:

```javascript
addNewButton('fab fa-twitter', 'Twitter', 'https://twitter.com/seuusuario');
```

### Removendo Botões
Use a função `removeButton()` com o índice do botão:

```javascript
removeButton(0); // Remove o primeiro botão
```

### Alterando a Logo
Substitua o arquivo `logo_equipe_alcance.jpeg` por sua própria imagem, mantendo o mesmo nome, ou edite o `src` no HTML.

### Cores Personalizadas
Adicione novos gradientes no CSS:

```css
.gradient5 {
    background: linear-gradient(135deg, #sua_cor1 0%, #sua_cor2 100%) !important;
}
```

E adicione a opção no HTML:

```html
<div class="color-option" data-color="gradient5" style="background: linear-gradient(135deg, #sua_cor1 0%, #sua_cor2 100%)"></div>
```

## 🛠️ Estrutura dos Arquivos

```
bio-link/
├── index.html          # Estrutura principal
├── style.css           # Estilos e animações
├── script.js           # Funcionalidades JavaScript
├── logo_equipe_alcance.jpeg  # Logo do perfil
└── README.md           # Este arquivo
```

## 🎯 Funcionalidades Especiais

### Botão de Compartilhamento
- Localizado no canto superior direito
- Usa Web Share API quando disponível
- Fallback para copiar link para área de transferência

### Painel de Configurações
- Acessível pelo ícone de engrenagem no canto inferior direito
- Configurações salvas no localStorage
- Interface intuitiva e responsiva

### Timestamp Dinâmico
- Atualizado automaticamente
- Formato brasileiro (DD/MM/AAAA - HH:MM)

## 📱 Responsividade

O design se adapta automaticamente a diferentes tamanhos de tela:
- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Ajustes de espaçamento e tamanhos
- **Mobile**: Interface otimizada para toque

## 🔧 Personalização Avançada

### Adicionando Novos Ícones
Use ícones do Font Awesome 6.0:
- Visite: https://fontawesome.com/icons
- Copie a classe do ícone desejado
- Use no formato: `fas fa-nome-do-icone` ou `fab fa-nome-da-marca`

### Modificando Animações
Edite as animações CSS em `style.css`:
- Duração: modifique os valores em `transition` e `animation`
- Efeitos: altere as propriedades `transform` e `opacity`

### Integrações Possíveis
- Google Analytics
- Facebook Pixel
- Sistemas de CRM
- APIs de redes sociais

## 🚀 Deploy

Para colocar online:
1. Faça upload dos arquivos para seu servidor web
2. Certifique-se de que todos os arquivos estão no mesmo diretório
3. Acesse via navegador

## 📞 Suporte

Para dúvidas ou sugestões sobre personalização:
- Edite os links de contato nos botões
- Adicione suas próprias redes sociais
- Personalize as cores conforme sua marca

---

**Desenvolvido com ❤️ para Ferramentas GP**




### Música de Fundo
- Para adicionar uma música, edite o arquivo `index.html` e insira o link da sua música no atributo `src` da tag `<source>` dentro do `<audio>`.
- Use os controles de play/pause e volume no canto inferior esquerdo da página.
- A preferência de reprodução e volume é salva automaticamente.

### Modo Escuro
- Clique no ícone de lua/sol no canto superior esquerdo para alternar entre o modo claro e escuro.
- A preferência do modo é salva automaticamente.

### Efeitos Visuais Interativos
- Passe o mouse sobre a página para ver partículas coloridas reagindo ao movimento do cursor.
- Estes efeitos são puramente visuais e não requerem configuração.


