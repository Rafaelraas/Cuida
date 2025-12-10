# Plano de Implementação por Sprints - Plataforma Cuida

## Visão Geral

Este documento detalha o plano de implementação da Plataforma Cuida dividido em sprints de 2 semanas cada. Cada sprint tem objetivos claros e entregáveis específicos.

---

## Sprint 1: Fundação e Autenticação (2 semanas)

### Objetivos
- Estabelecer a base do projeto
- Implementar sistema de autenticação completo
- Configurar ambiente de desenvolvimento

### Tarefas

#### Semana 1: Setup e Infraestrutura
- [x] Configurar projeto AdonisJS
- [x] Configurar banco de dados PostgreSQL
- [x] Criar modelos base (User, Professional, Patient)
- [x] Criar migrações de banco de dados
- [x] Configurar ambiente de testes
- [x] Configurar CI/CD básico

#### Semana 2: Autenticação
- [x] Implementar registro de usuários
  - Endpoint: `POST /api/auth/register`
  - Validações de dados
  - Hash de senha
  - Criação de sessão
- [x] Implementar login
  - Endpoint: `POST /api/auth/login`
  - Autenticação via session
  - Retorno de dados do usuário
- [x] Implementar logout
  - Endpoint: `POST /api/auth/logout`
- [x] Implementar middleware de autenticação
- [x] Testes de autenticação

### Entregáveis
- API de autenticação funcional
- Documentação dos endpoints
- Testes unitários e de integração
- README atualizado

---

## Sprint 2: Perfis de Profissionais e Pacientes (2 semanas)

### Objetivos
- Criar sistema de perfis completo
- Implementar CRUD de profissionais e pacientes
- Adicionar validações de dados

### Tarefas

#### Semana 1: Perfil de Profissionais
- [x] Criar controlador de profissionais
- [x] Implementar registro de profissional
  - Endpoint: `POST /api/professionals`
  - Validação de especialidades
  - Validação de registro profissional
- [x] Implementar atualização de perfil
  - Endpoint: `PUT /api/professionals/:id`
  - Atualização de localização
- [x] Implementar visualização de perfil
  - Endpoint: `GET /api/professionals/:id`
- [x] Validadores personalizados

#### Semana 2: Perfil de Pacientes
- [x] Criar controlador de pacientes
- [x] Implementar registro de paciente
  - Endpoint: `POST /api/patients`
  - Validação de dados pessoais
  - Contatos de emergência
- [x] Implementar atualização de perfil
  - Endpoint: `PUT /api/patients/:id`
  - Histórico médico
  - Preferências de cuidado
- [x] Implementar visualização de perfil
  - Endpoint: `GET /api/patients/:id`
- [x] Testes de perfis

### Entregáveis
- API de perfis completa
- Validações implementadas
- Testes de CRUD
- Documentação atualizada

---

## Sprint 3: Sistema de Busca e Geolocalização (2 semanas)

### Objetivos
- Implementar busca de profissionais por localização
- Adicionar filtros de busca
- Integrar serviço de geolocalização

### Tarefas

#### Semana 1: Geolocalização
- [ ] Integrar Google Maps API ou alternativa
- [ ] Implementar serviço de geocoding
  - Converter endereços em coordenadas
  - Validar endereços
- [ ] Implementar cálculo de distância
  - Fórmula de Haversine
  - Otimização de queries
- [ ] Adicionar índices geográficos no banco
- [ ] Testes de geolocalização

#### Semana 2: Sistema de Busca
- [ ] Criar controlador de busca
- [ ] Implementar busca por proximidade
  - Endpoint: `GET /api/professionals/search`
  - Parâmetros: latitude, longitude, raio
- [ ] Implementar filtros
  - Por especialidade
  - Por avaliação mínima
  - Por preço
  - Por disponibilidade
- [ ] Implementar paginação
- [ ] Implementar ordenação
  - Por distância
  - Por avaliação
  - Por preço
- [ ] Testes de busca

### Entregáveis
- Sistema de busca funcional
- Integração com API de mapas
- Filtros e ordenação implementados
- Performance otimizada
- Documentação de endpoints de busca

---

## Sprint 4: Sistema de Agendamentos (2 semanas)

### Objetivos
- Implementar sistema de reservas/agendamentos
- Gerenciar disponibilidade de profissionais
- Implementar notificações

### Tarefas

#### Semana 1: CRUD de Agendamentos
- [ ] Criar controlador de agendamentos
- [ ] Implementar criação de agendamento
  - Endpoint: `POST /api/bookings`
  - Validação de disponibilidade
  - Cálculo de preço
- [ ] Implementar listagem de agendamentos
  - Endpoint: `GET /api/bookings`
  - Filtros por status
  - Filtros por data
- [ ] Implementar atualização de status
  - Endpoint: `PATCH /api/bookings/:id/status`
  - pending → confirmed
  - confirmed → in_progress
  - in_progress → completed
  - * → cancelled
- [ ] Implementar cancelamento
  - Regras de cancelamento
  - Política de reembolso

#### Semana 2: Disponibilidade e Notificações
- [ ] Criar modelo de disponibilidade
- [ ] Implementar gerenciamento de horários
  - Endpoint: `POST /api/professionals/:id/availability`
- [ ] Implementar verificação de conflitos
- [ ] Configurar sistema de notificações
  - Email (via SMTP)
  - SMS (opcional)
- [ ] Enviar notificações de agendamento
- [ ] Testes de agendamentos

### Entregáveis
- Sistema de agendamentos completo
- Gerenciamento de disponibilidade
- Notificações funcionais
- Testes de fluxo completo
- Documentação atualizada

---

## Sprint 5: Sistema de Avaliações e Reviews (2 semanas)

### Objetivos
- Implementar sistema de avaliações
- Calcular médias de avaliações
- Moderar conteúdo de reviews

### Tarefas

#### Semana 1: CRUD de Avaliações
- [ ] Criar controlador de avaliações
- [ ] Implementar criação de avaliação
  - Endpoint: `POST /api/reviews`
  - Validação: apenas após serviço completado
  - Rating de 1 a 5
  - Comentário opcional
- [ ] Implementar listagem de avaliações
  - Endpoint: `GET /api/professionals/:id/reviews`
  - Paginação
  - Ordenação por data
- [ ] Implementar resposta a avaliações
  - Endpoint: `POST /api/reviews/:id/response`
  - Apenas pelo profissional avaliado
- [ ] Implementar denúncia de avaliações
  - Endpoint: `POST /api/reviews/:id/report`

#### Semana 2: Cálculo e Moderação
- [ ] Implementar cálculo de média
  - Atualizar automaticamente ao criar review
  - Considerar peso de reviews recentes
- [ ] Implementar estatísticas
  - Endpoint: `GET /api/professionals/:id/stats`
  - Total de atendimentos
  - Distribuição de ratings
  - Taxa de recomendação
- [ ] Implementar moderação básica
  - Filtro de palavras ofensivas
  - Sistema de flags
- [ ] Testes de avaliações

### Entregáveis
- Sistema de reviews completo
- Cálculo de métricas
- Sistema de moderação básico
- Testes implementados
- Documentação atualizada

---

## Sprint 6: Dashboard e Frontend Inicial (2 semanas)

### Objetivos
- Criar interface web básica
- Implementar dashboards para profissionais e pacientes
- Integrar com API backend

### Tarefas

#### Semana 1: Setup Frontend
- [ ] Configurar Inertia.js com React/Vue
- [ ] Configurar Tailwind CSS
- [ ] Criar componentes base
  - Layout principal
  - Header
  - Footer
  - Navegação
- [ ] Criar páginas de autenticação
  - Login
  - Registro
  - Recuperação de senha
- [ ] Integrar com API de autenticação

#### Semana 2: Dashboards
- [ ] Criar dashboard de profissional
  - Visualizar agendamentos
  - Gerenciar disponibilidade
  - Ver estatísticas
  - Responder avaliações
- [ ] Criar dashboard de paciente
  - Buscar profissionais
  - Ver agendamentos
  - Avaliar serviços
- [ ] Implementar navegação entre páginas
- [ ] Testes E2E básicos

### Entregáveis
- Interface web funcional
- Páginas de autenticação
- Dashboards básicos
- Integração com backend
- Testes E2E

---

## Sprint 7: Busca Avançada e Mapas (2 semanas)

### Objetivos
- Criar interface de busca avançada
- Integrar mapas interativos
- Melhorar UX de busca

### Tarefas

#### Semana 1: Interface de Busca
- [ ] Criar página de busca
- [ ] Implementar filtros visuais
  - Especialidade (dropdown)
  - Raio de distância (slider)
  - Preço (range)
  - Avaliação mínima
  - Disponibilidade
- [ ] Implementar autocomplete de endereço
- [ ] Implementar lista de resultados
  - Card com informações do profissional
  - Foto, nome, especialidade
  - Avaliação e preço
  - Distância
- [ ] Implementar ordenação

#### Semana 2: Integração de Mapas
- [ ] Integrar Google Maps no frontend
- [ ] Exibir profissionais no mapa
  - Marcadores com fotos
  - Info window com dados básicos
- [ ] Sincronizar lista com mapa
  - Hover na lista destaca marcador
  - Click no marcador mostra na lista
- [ ] Implementar geolocalização do usuário
- [ ] Implementar desenho de raio de busca
- [ ] Otimizar performance
- [ ] Testes de interface

### Entregáveis
- Interface de busca completa
- Mapas interativos
- UX otimizada
- Performance adequada
- Testes implementados

---

## Sprint 8: Perfis Públicos e Sistema de Mensagens (2 semanas)

### Objetivos
- Criar páginas de perfil público
- Implementar chat/mensagens básico
- Melhorar interação usuário-profissional

### Tarefas

#### Semana 1: Perfis Públicos
- [ ] Criar página de perfil de profissional
  - Informações completas
  - Galeria de fotos
  - Avaliações
  - Disponibilidade
  - Botão de agendamento
- [ ] Implementar SEO básico
  - Meta tags
  - URLs amigáveis
- [ ] Implementar compartilhamento social
- [ ] Otimizar carregamento de imagens

#### Semana 2: Sistema de Mensagens
- [ ] Criar modelo de mensagens
- [ ] Implementar API de mensagens
  - Endpoint: `POST /api/conversations`
  - Endpoint: `GET /api/conversations`
  - Endpoint: `POST /api/messages`
  - Endpoint: `GET /api/messages/:conversationId`
- [ ] Criar interface de chat
  - Lista de conversas
  - Janela de mensagens
  - Notificações em tempo real (opcional)
- [ ] Implementar notificações de mensagens
- [ ] Testes de mensagens

### Entregáveis
- Perfis públicos completos
- Sistema de mensagens funcional
- SEO básico implementado
- Testes implementados

---

## Sprint 9: Pagamentos e Finalização (2 semanas)

### Objetivos
- Integrar gateway de pagamento
- Implementar sistema de pagamentos
- Finalizar funcionalidades principais

### Tarefas

#### Semana 1: Integração de Pagamento
- [ ] Escolher gateway (Stripe, PagSeguro, Mercado Pago)
- [ ] Configurar ambiente de testes
- [ ] Implementar API de pagamentos
  - Endpoint: `POST /api/payments/intent`
  - Endpoint: `POST /api/payments/confirm`
- [ ] Implementar fluxo de pagamento no frontend
  - Formulário de cartão
  - Confirmação de pagamento
  - Feedback de sucesso/erro
- [ ] Implementar webhooks
  - Atualizar status de pagamento
  - Atualizar status de agendamento

#### Semana 2: Refinamentos
- [ ] Implementar histórico de pagamentos
- [ ] Implementar recibos/faturas
- [ ] Adicionar métodos de pagamento salvos
- [ ] Implementar reembolsos
- [ ] Testes de pagamento (sandbox)
- [ ] Revisar e otimizar toda a aplicação

### Entregáveis
- Sistema de pagamentos funcional
- Webhooks configurados
- Histórico de transações
- Testes em ambiente sandbox
- Aplicação completa e funcional

---

## Sprint 10: Testes, Documentação e Deploy (2 semanas)

### Objetivos
- Realizar testes completos
- Finalizar documentação
- Preparar e realizar deploy

### Tarefas

#### Semana 1: Testes e Qualidade
- [ ] Revisar cobertura de testes
  - Unitários
  - Integração
  - E2E
- [ ] Corrigir bugs encontrados
- [ ] Realizar testes de performance
  - Load testing
  - Stress testing
- [ ] Otimizações finais
  - Cache
  - Queries do banco
  - Bundle size
- [ ] Auditoria de segurança
  - Dependency check
  - Penetration testing básico

#### Semana 2: Documentação e Deploy
- [ ] Finalizar documentação técnica
  - API completa
  - Guias de desenvolvimento
  - Troubleshooting
- [ ] Criar documentação de usuário
  - Manual do profissional
  - Manual do paciente
- [ ] Configurar ambiente de produção
  - Servidor
  - Banco de dados
  - CDN para assets
- [ ] Configurar monitoramento
  - Logs
  - Métricas
  - Alertas
- [ ] Realizar deploy
- [ ] Validação em produção
- [ ] Apresentação final

### Entregáveis
- Aplicação com alta cobertura de testes
- Documentação completa
- Ambiente de produção configurado
- Sistema em produção
- Monitoramento ativo

---

## Pós-Lançamento: Backlog de Melhorias

### Funcionalidades Futuras

1. **Mobile App**
   - App nativo React Native
   - Push notifications
   - Geolocalização em tempo real

2. **Funcionalidades Avançadas**
   - Vídeo chamadas integradas
   - Agendamento recorrente
   - Sistema de fidelidade/pontos
   - Programa de indicação
   - Cupons de desconto

3. **Analytics e BI**
   - Dashboard administrativo
   - Relatórios financeiros
   - Análise de comportamento
   - Previsão de demanda

4. **Integrações**
   - Calendário (Google, Outlook)
   - WhatsApp Business
   - Redes sociais
   - Telemedicina

5. **Melhorias de UX**
   - Onboarding interativo
   - Tutorial guiado
   - Personalização de interface
   - Modo escuro

---

## Recursos Necessários por Sprint

### Time Recomendado
- 1 Product Owner
- 1 Scrum Master
- 2-3 Desenvolvedores Backend
- 2-3 Desenvolvedores Frontend
- 1 UX/UI Designer
- 1 QA Engineer

### Infraestrutura
- Servidor de desenvolvimento
- Servidor de staging
- Servidor de produção
- Banco de dados PostgreSQL
- CDN para assets
- Serviço de email
- Gateway de pagamento
- Ferramenta de CI/CD

---

## Métricas de Sucesso

- Cobertura de testes > 80%
- Performance: tempo de resposta < 200ms
- Disponibilidade > 99.5%
- 0 vulnerabilidades críticas
- SEO score > 90
- Lighthouse score > 90
- Tempo de carregamento < 3s

---

## Notas Importantes

1. Cada sprint inclui tempo para code review e refinamento
2. Daily standups de 15 minutos
3. Sprint planning no início de cada sprint
4. Sprint review e retrospective no final
5. Documentação deve ser atualizada continuamente
6. Testes devem ser escritos junto com o código
7. Deploy contínuo após Sprint 6
