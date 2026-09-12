# 🐾 Mundo Pet

Mundo Pet é uma aplicação de agenda para petshop, desenvolvida com HTML, CSS e JavaScript puro. O projeto foi criado como exercício prático de lógica de programação, manipulação do DOM e organização de dados em memória.

## 📌 Sobre o Projeto

O Mundo Pet permite visualizar e gerenciar os agendamentos de um petshop ao longo do dia, organizados por período (Manhã, Tarde e Noite). É possível cadastrar novos atendimentos através de um modal, informando tutor, pet, telefone, serviço, data e horário — com validação de campos, prevenção de conflitos de horário e ordenação automática dos agendamentos.

## 🛠️ Tecnologias e Ferramentas

Este projeto foi construído utilizando:

- **HTML5**: estruturação semântica da página, incluindo o elemento nativo `<dialog>` para o modal
- **CSS3**: estilização com Flexbox, variáveis CSS (custom properties), transições e posicionamento para o alerta flutuante
- **JavaScript**: manipulação do DOM, criação dinâmica de elementos, delegação de eventos e organização de dados com `data-*` attributes
- **Day.js**: biblioteca externa (via CDN) utilizada para obter e formatar a data atual
- **Figma**: utilizado para referência do layout e design da interface

## ✨ Funcionalidades

- **Novo agendamento**: modal acessível pelo botão "Novo agendamento", com bloqueio do fundo da página e foco automático no primeiro campo
- **Validação de campos**: impede o envio do formulário caso algum campo obrigatório (tutor, pet, telefone, serviço, data ou hora) esteja vazio, exibindo um alerta
- **Janelas de horário**: cada período (Manhã 09h-12h, Tarde 13h-18h, Noite 19h-21h) tem sua própria faixa válida; horários fora dessas faixas são bloqueados e sinalizados
- **Ordenação automática**: novos agendamentos são inseridos na seção correta já na posição certa, respeitando a ordem cronológica dos horários existentes
- **Prevenção de conflito**: não permite dois agendamentos no mesmo horário para a mesma data, avisando o usuário
- **Filtro por data**: ao alterar a data no topo da página, apenas os agendamentos daquele dia são exibidos, escondendo os demais
- **Remoção de agendamento**: exclusão imediata de qualquer atendimento (fixo ou criado dinamicamente) através de delegação de eventos, sem precisar recarregar a página
- **Data atual por padrão**: a agenda já abre exibindo os compromissos do dia atual, calculado dinamicamente com o Day.js

## 🎨 Estrutura de Estilos

O projeto utiliza variáveis CSS centralizadas em `:root` para cores de conteúdo, fundo e bordas, facilitando a manutenção e consistência visual em toda a aplicação. Estados de interação (`:hover`, `:focus-within`) e o alerta de erro são tratados via classes e transições dedicadas.

## 📂 Estrutura dos Agendamentos

Cada agendamento é representado por um `<li class="list-info">`, composto por:
- Um horário (`.appointment-time`)
- Um bloco com nome do pet e tutor (`.pet-info`)
- A descrição do serviço (`.service`)
- Um botão de remoção (`.remove-appointment`)

A data do agendamento é armazenada de forma invisível no próprio elemento através do atributo `data-date`, permitindo comparações de conflito e filtragem por data sem alterar o conteúdo exibido na tela.
