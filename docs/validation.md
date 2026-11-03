# Validação — Arremate

## Regras e ciclo de vida

- 11 testes Node aprovados: geometria dos três campos, arestas únicas/adjacência, cópia imutável, passagem de vez, fechamento de um/dois retalhos, extra turno, jogada inválida/ocupada inerte, escolhas legais do rival, partidas completas com conservação de áreas, encerramento no número exato de linhas, resultado terminal inerte, reset/primeiro jogador, save e estatísticas isoladas. Empate 8–8 conferido por sequência completa; saturação do contador mantém save válido.
- Harness de navegador: 15 verificações aprovadas. Save corrompido, teclado, bloqueio durante vez rival, pausa de timer nativo pendente por 500 ms, retomada com uma jogada, reinício cancelando callback antigo, blur/pausa, partidas completas Leve/Atento em campo pequeno e dupla em médio/grande, estatísticas por configuração, replay, rival começando e preferências. Usa controles/eventos DOM normais, sem injetar estado de partida. Blur disparado por Event; não alegar troca física de aba. Harness/iframe fora do export.
- Export real: uma linha clicada no SVG desktop do campo grande e outra após resize para 390 × 844. Dupla pequena concluída por seletor e botão no viewport móvel, 8–8 em 30 linhas, empate explícito e registro único. Documento útil 375 px, scrollWidth 375 px, SVG ~324,3 px e botão Costurar com 46 px de altura. Os traços têm alvo de 22 px no móvel; controles por número oferecem alternativa maior. Não são todos alvos SVG de 44 px. Override temporário restaurado.
- Arte/regras mantidas em movimento reduzido. Som opcional e histórico persistidos no harness, sem avaliação auditiva humana ou medição física de FPS. Sem loop permanente; rival usa um timer cancelável por vez.
- Percursos calculados no modelo e executados nos controles não são prova de diversão, dificuldade estratégica humana ou solução ótima.

## Segurança e publicação

Typecheck, build e `npm audit` aprovados, sem vulnerabilidades informadas em 02/11/2026. Export apenas HTML, favicon, JS/CSS e licença, sem source maps, testes, `.git`, ambientes ou configuração local. Sem backend, APIs, dados pessoais, contas, fontes/imagens externas, telemetria ou compras.

GitHub Pages de repositório público disponível no GitHub Free, conforme https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages. Sem cartão, faturamento ou trial. Partidas públicas, autoria e scanner serão registrados antes da entrega.

## Limites

Sem telefone físico, Safari, gamepad, toque físico ou auditoria integral de leitor de tela. Viewport/clique não comprovam hardware touch. Teclado, rótulos DOM/SVG e alternativa numérica ajudam o acesso, sem alegar acessibilidade integral. Rivais são heurísticas determinísticas. Sem garantia offline, disponibilidade/gratuidade permanente, FPS universal ou ausência absoluta de vulnerabilidades. Histórico local é modificável e tentativa atual não é salva.
