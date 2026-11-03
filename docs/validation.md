# Validação — Arremate

## Regras e ciclo de vida

- 11 testes Node aprovados: geometria dos três campos, arestas únicas/adjacência, cópia imutável, passagem de vez, fechamento de um/dois retalhos, extra turno, jogada inválida/ocupada inerte, escolhas legais do rival, partidas completas com conservação de áreas, encerramento no número exato de linhas, resultado terminal inerte, reset/primeiro jogador, save e estatísticas isoladas. Empate 8–8 conferido por sequência completa; saturação do contador mantém save válido.
- Harness de navegador: 16 verificações aprovadas. Save corrompido, foco real no SVG, teclado, bloqueio durante vez rival, pausa de timer nativo pendente por 500 ms, retomada com uma jogada, reinício cancelando callback antigo, blur/pausa, partidas completas Leve/Atento em campo pequeno e dupla em médio/grande, estatísticas por configuração, replay, rival começando e preferências. Usa controles/eventos DOM normais, sem injetar estado de partida. Blur disparado por Event; não alegar troca física de aba. Harness/iframe fora do export.
- Export real: uma linha clicada no SVG desktop do campo grande e outra após resize para 390 × 844. Dupla pequena concluída por seletor e botão no viewport móvel, 8–8 em 30 linhas, empate explícito e registro único. Documento útil 375 px, scrollWidth 375 px, SVG ~324,3 px e botão Costurar com 46 px de altura. Os traços têm alvo de 22 px no móvel; controles por número oferecem alternativa maior. Não são todos alvos SVG de 44 px. Override temporário restaurado.
- Arte/regras mantidas em movimento reduzido. Som opcional e histórico persistidos no harness, sem avaliação auditiva humana ou medição física de FPS. Sem loop permanente; rival usa um timer cancelável por vez.
- Percursos calculados no modelo e executados nos controles não são prova de diversão, dificuldade estratégica humana ou solução ótima.

- Corrigido o atributo SVG de `tabIndex` para `tabindex`: foco real e teclas não funcionavam só com o atributo de capitalização incorreta. Teste de regressão chama foco nativo e confere `activeElement`. No export corrigido, setas/Enter/P e Escape foram executados pelo navegador; Escape devolveu foco ao campo. Timer rival permaneceu parado em uma linha durante pausa.

## Segurança e publicação

Typecheck, build e `npm audit` aprovados, sem vulnerabilidades informadas em 02/11/2026. Export apenas HTML, favicon, JS/CSS e licença, sem source maps, testes, `.git`, ambientes ou configuração local. Sem backend, APIs, dados pessoais, contas, fontes/imagens externas, telemetria ou compras.

GitHub Pages de repositório público disponível no GitHub Free, conforme https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages. Sem cartão, faturamento ou trial.

## Publicação verificada em 02/11/2026

- Implementação `bcc499650cb4ef7439629592efc38ddbbf4005f1`; correção de foco `dee8628a315d80e7437b3cf15ac5c92278b50a51`. CI `41551919742` e `41552349145` concluídos com testes, auditoria, typecheck, build e deploy aprovados.
- No runtime público corrigido: Leve concluído com vitória 16–0, Atento com derrota 7–9, dupla com empate 8–8. Cada partida pequena percorreu as 30 linhas. Percursos derivados do modelo e executados por teclado, clique SVG e controles por número, sem editar save ou injetar estado. Primeiro par de jogadas normal; restante em Menos movimento. Evidências `public-leve-win.png`, `public-atento-loss.png`, `public-draw.png` e `public-gameplay.png`.
- Foco real publicado conferido após recarregar o HTML para evitar cache da versão anterior: `tabindex="0"`, Enter costurou e P pausou com uma linha e timer rival pendente. Escape retomou e devolveu foco ao campo. Manual reabrível, som/mute e histórico por modo após reload conferidos; tentativa reiniciou e preferência de movimento persistiu.
- Empate público revisado em viewport 390 × 844, sem overflow (375 px úteis/scrollWidth 375 px). Captura móvel por screenshot de viewport; captura de página inteira com override apresentou recomposição incorreta na ferramenta e foi substituída. Isso não foi tratado como prova de layout do jogo. Override restaurado e aba própria fechada.
- Cinco arquivos públicos idênticos byte a byte ao build corrigido: HTML, favicon, licença, JS e CSS; 40.264 bytes totais. Bundle principal ~11,8 kB gzip. Sem promessa de FPS universal.
- Gitleaks 8.30.1 com configuração externa confiável sem achados no staged, histórico, export e clone remoto novo. Sem supressões locais. Secret scanning, push protection e alertas/atualizações de dependências gratuitos habilitados.
- API do GitHub confirmou somente `gustapaz` como contribuidor. Autor e committer `Gustavo Paz <96732649+gustapaz@users.noreply.github.com>`, sem coautor adicional; licença de terceiros preservada.
- Mensagens de extensão do navegador separadas dos erros do jogo. Nenhuma falha do código de gameplay ou violação CSP identificada nas partidas públicas corrigidas; não alegar console universalmente limpo.

## Limites

Sem telefone físico, Safari, gamepad, toque físico ou auditoria integral de leitor de tela. Viewport/clique não comprovam hardware touch. Teclado, rótulos DOM/SVG e alternativa numérica ajudam o acesso, sem alegar acessibilidade integral. Rivais são heurísticas determinísticas. Sem garantia offline, disponibilidade/gratuidade permanente, FPS universal ou ausência absoluta de vulnerabilidades. Histórico local é modificável e tentativa atual não é salva.
