/**
 * 量子力学可视化引擎 - 主入口模块
 * 负责初始化、动画循环、事件绑定
 */

var QuantumVizMain = (function() {
  'use strict';

  // 获取核心模块和公式模块
  var core = typeof QuantumVizCore !== 'undefined' ? QuantumVizCore : null;
  var vizFormulas = typeof QuantumVizFormulas !== 'undefined' ? QuantumVizFormulas : null;

  // 内部状态
  var currentFormula = 'schrodinger';
  var currentLevel = 'quantum';
  var animFrameId = null;
  var canvas = null;
  var ctx = null;
  var W = 0;
  var H = 0;
  var startTime = Date.now();

  // 获取时间
  function t() {
    return (Date.now() - startTime) / 1000;
  }

  // 调整画布大小
  function resizeCanvas() {
    if (!canvas) return;
    var container = canvas.parentElement;
    var w = container.clientWidth;
    var h = Math.min(w * 0.6, 520);
    var dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    W = w;
    H = h;
  }

  // 清空背景并绘制网格
  function clearBg() {
    if (!ctx || !core) return;
    core.clearBg(ctx, W, H, core.COLORS);
  }

  // 绘制标签
  function drawLabel(text, x, y, color, size) {
    if (!ctx || !core) return;
    core.drawLabel(ctx, text, x, y, color, size);
  }

  // 动画循环
  function animate() {
    if (!ctx || !core || !vizFormulas) return;

    var time = t();
    var key = currentFormula + '_' + currentLevel;

    if (vizFormulas[key]) {
      vizFormulas[key](ctx, W, H, time, core.COLORS, core);
    } else {
      clearBg();
      drawLabel('可视化开发中...', W/2, H/2, core.COLORS.textDim, 16);
    }

    animFrameId = requestAnimationFrame(animate);
  }

  // 更新信息显示
  function updateInfo() {
    if (!core) return;

    var formula = core.FORMULAS.filter(function(f) { return f.id === currentFormula; })[0];
    if (formula) {
      var symEl = document.getElementById('formula-symbol');
      var catEl = document.getElementById('formula-category');
      if (symEl) symEl.textContent = formula.symbol;
      if (catEl) catEl.textContent = formula.category;
    }

    core.FORMULAS.forEach(function(f) {
      var btn = document.getElementById('ftab-' + f.id);
      if (btn) {
        btn.style.background = f.id === currentFormula ? core.COLORS.purple + '33' : core.COLORS.bgLight;
        btn.style.color = f.id === currentFormula ? core.COLORS.purple : core.COLORS.gray;
      }
    });

    core.LEVELS.forEach(function(l) {
      var btn = document.getElementById('ltab-' + l.id);
      if (btn) {
        btn.style.background = l.id === currentLevel ? core.COLORS.cyan + '33' : core.COLORS.bgLight;
        btn.style.color = l.id === currentLevel ? core.COLORS.cyan : core.COLORS.gray;
      }
    });
  }

  // 切换公式
  function setFormula(id) {
    currentFormula = id;
    updateInfo();
  }

  // 切换层级
  function setLevel(id) {
    currentLevel = id;
    updateInfo();
  }

  // 停止动画
  function stop() {
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  }

  // 初始化并渲染
  function init(containerEl) {
    if (!core || !vizFormulas) {
      console.error('QuantumViz: 缺少核心模块或公式模块');
      return;
    }

    // 停止之前的动画
    stop();

    // 重置时间
    startTime = Date.now();

    // 渲染 HTML
    containerEl.innerHTML = '<div style="padding:16px;max-width:1200px;margin:0 auto;">'
      + '<div style="text-align:center;margin-bottom:16px;">'
      + '<h2 style="color:' + core.COLORS.purple + ';margin:0 0 4px;font-size:22px;">量子力学可视化实验室</h2>'
      + '<p style="color:' + core.COLORS.textDim + ';margin:0;font-size:13px;">选择公式与层级，探索量子世界的不同尺度</p></div>'
      + '<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:12px;" id="formula-tabs">'
      + core.FORMULAS.map(function(f) {
        return '<button onclick="window._qf_setFormula(\'' + f.id + '\')" id="ftab-' + f.id + '" '
          + 'style="padding:6px 12px;border-radius:6px;border:1px solid ' + core.COLORS.purple + '33;'
          + 'background:' + (f.id === currentFormula ? core.COLORS.purple + '33' : core.COLORS.bgLight) + ';'
          + 'color:' + (f.id === currentFormula ? core.COLORS.purple : core.COLORS.gray) + ';cursor:pointer;'
          + 'font-size:12px;transition:all .2s;white-space:nowrap;" title="' + f.symbol + '">' + f.name + '</button>';
      }).join('') + '</div>'
      + '<div style="display:flex;gap:8px;justify-content:center;margin-bottom:12px;" id="level-tabs">'
      + core.LEVELS.map(function(l) {
        return '<button onclick="window._qf_setLevel(\'' + l.id + '\')" id="ltab-' + l.id + '" '
          + 'style="padding:5px 16px;border-radius:20px;border:1px solid ' + core.COLORS.cyan + '33;'
          + 'background:' + (l.id === currentLevel ? core.COLORS.cyan + '33' : core.COLORS.bgLight) + ';'
          + 'color:' + (l.id === currentLevel ? core.COLORS.cyan : core.COLORS.gray) + ';cursor:pointer;'
          + 'font-size:12px;transition:all .2s;">' + l.icon + ' ' + l.name + '</button>';
      }).join('') + '</div>'
      + '<div id="formula-info" style="text-align:center;margin-bottom:12px;">'
      + '<span style="color:' + core.COLORS.yellow + ';font-size:16px;font-family:serif;" id="formula-symbol"></span>'
      + '<span style="color:' + core.COLORS.textDim + ';font-size:12px;margin-left:8px;" id="formula-category"></span></div>'
      + '<div style="position:relative;border-radius:12px;overflow:hidden;border:1px solid ' + core.COLORS.purple + '22;background:' + core.COLORS.bg + ';">'
      + '<canvas id="quantum-canvas" style="display:block;width:100%;"></canvas></div>'
      + '<div id="viz-legend" style="text-align:center;margin-top:10px;color:' + core.COLORS.textDim + ';font-size:11px;min-height:20px;"></div></div>';

    // 获取 canvas
    canvas = document.getElementById('quantum-canvas');
    ctx = canvas.getContext('2d');

    // 调整大小
    resizeCanvas();

    // 监听窗口大小变化
    window.addEventListener('resize', resizeCanvas);

    // 暴露全局切换函数
    window._qf_setFormula = setFormula;
    window._qf_setLevel = setLevel;

    // 更新信息
    updateInfo();

    // 启动动画
    animate();
  }

  // 导出
  return {
    init: init,
    stop: stop,
    setFormula: setFormula,
    setLevel: setLevel,
    getCurrentFormula: function() { return currentFormula; },
    getCurrentLevel: function() { return currentLevel; }
  };
})();

// 兼容非模块环境
if (typeof window !== 'undefined') {
  window.QuantumVizMain = QuantumVizMain;
}
