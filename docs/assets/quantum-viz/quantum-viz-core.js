/**
 * 量子力学可视化引擎 - 核心模块
 * 包含颜色常量、公式/层级数据、绘图工具函数
 */

var QuantumVizCore = (function() {
  'use strict';

  // 颜色方案
  var COLORS = {
    purple: '#9d4edd',
    cyan: '#4ecdc4',
    red: '#ff6b6b',
    yellow: '#ffe66d',
    bg: '#0a0a1a',
    bgLight: '#12122a',
    white: '#ffffff',
    gray: '#888899',
    gridLine: 'rgba(255,255,255,0.06)',
    textDim: 'rgba(255,255,255,0.5)',
  };

  // 16个公式数据
  var FORMULAS = [
    { id: 'schrodinger', name: '薛定谔方程', symbol: 'iℏ∂ψ/∂t = Ĥψ', category: '基础公设' },
    { id: 'dirac', name: '狄拉克方程', symbol: '(iγ^μ∂_μ − m)ψ = 0', category: '基础公设' },
    { id: 'uncertainty', name: '不确定性原理', symbol: 'Δx·Δp ≥ ℏ/2', category: '基础公设' },
    { id: 'superposition', name: '叠加原理', symbol: '|ψ⟩ = α|0⟩ + β|1⟩', category: '态与算符' },
    { id: 'commutator', name: '对易关系', symbol: '[x̂,p̂] = iℏ', category: '态与算符' },
    { id: 'density', name: '密度矩阵', symbol: 'ρ = Σ p_i|ψ_i⟩⟨ψ_i|', category: '态与算符' },
    { id: 'born', name: '玻恩规则', symbol: 'P = |⟨φ|ψ⟩|²', category: '测量与概率' },
    { id: 'expectation', name: '期望值', symbol: '⟨A⟩ = ⟨ψ|Â|ψ⟩', category: '测量与概率' },
    { id: 'heisenberg', name: '海森堡方程', symbol: 'dÂ/dt = (i/ℏ)[Ĥ,Â]', category: '动力学' },
    { id: 'path', name: '路径积分', symbol: 'K = ∫ e^(iS/ℏ) Dx', category: '动力学' },
    { id: 'pauli', name: '泡利不相容原理', symbol: 'ψ(x₁,x₂) = −ψ(x₂,x₁)', category: '多粒子系统' },
    { id: 'entangle', name: '量子纠缠', symbol: '|Φ⁺⟩ = (|00⟩+|11⟩)/√2', category: '多粒子系统' },
    { id: 'second', name: '二次量子化', symbol: 'ψ̂(x) = Σ a_k φ_k(x)', category: '量子场论' },
    { id: 'decoherence', name: '退相干', symbol: 'ρ → diag(ρ)', category: '退相干与经典极限' },
    { id: 'lindblad', name: '林布拉德方程', symbol: 'dρ/dt = −(i/ℏ)[H,ρ] + L(ρ)', category: '退相干与经典极限' },
    { id: 'correspondence', name: '对应原理', symbol: '量子 → 经典 (n→∞)', category: '退相干与经典极限' },
  ];

  // 4个层级数据
  var LEVELS = [
    { id: 'quantum', name: '量子层', icon: '⚛' },
    { id: 'atomic', name: '原子层', icon: '🔬' },
    { id: 'molecular', name: '分子层', icon: '🧬' },
    { id: 'macro', name: '宏观层', icon: '🌍' },
  ];

  // ====== 绘图工具函数 ======

  // 清空背景并绘制网格
  function clearBg(ctx, W, H, COLORS) {
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = COLORS.gridLine;
    ctx.lineWidth = 0.5;
    for (var x = 0; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (var y = 0; y < H; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  }

  // 绘制坐标轴
  function drawAxis(ctx, COLORS, x, y, w, h, xLabel, yLabel) {
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h); ctx.stroke();
    // 箭头
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath(); ctx.moveTo(x + w, y); ctx.lineTo(x + w - 6, y - 3); ctx.lineTo(x + w - 6, y + 3); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x, y - h); ctx.lineTo(x - 3, y - h + 6); ctx.lineTo(x + 3, y - h + 6); ctx.fill();
    // 标签
    ctx.fillStyle = COLORS.textDim;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(xLabel, x + w / 2, y + 16);
    ctx.save();
    ctx.translate(x - 14, y - h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(yLabel, 0, 0);
    ctx.restore();
  }

  // 绘制文字标签
  function drawLabel(ctx, text, x, y, color, size) {
    ctx.fillStyle = color || '#ffffff';
    ctx.font = (size || 12) + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
  }

  // 十六进制颜色转 RGBA
  function hexToRgba(hex, a) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  // 绘制粒子（带发光效果）
  function drawParticle(ctx, x, y, r, color) {
    var rr = Math.max(1, r);
    var grad = ctx.createRadialGradient(x, y, 0, x, y, rr);
    grad.addColorStop(0, hexToRgba(color, 1));
    grad.addColorStop(0.5, hexToRgba(color, 0.4));
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, rr, 0, Math.PI * 2);
    ctx.fill();
  }

  // 绘制概率云（随机采样点）
  function drawProbabilityCloud(ctx, cx, cy, maxR, n, color, probFunc) {
    for (var i = 0; i < n; i++) {
      var r = Math.random() * 3;
      var theta = Math.random() * Math.PI * 2;
      var prob = probFunc(r, theta);
      if (Math.random() < prob) {
        ctx.fillStyle = hexToRgba(color, prob * 0.6);
        ctx.beginPath();
        ctx.arc(cx + r * Math.cos(theta) * maxR, cy + r * Math.sin(theta) * maxR, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // 绘制能级线
  function drawEnergyLevel(ctx, x, y, w, color, label, labelX) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w, y);
    ctx.stroke();
    if (label) {
      drawLabel(ctx, label, labelX || x + w + 10, y + 4, color, 10);
    }
  }

  // 绘制波形
  function drawWave(ctx, startX, endX, baseY, amp, color, waveFunc) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (var px = startX; px < endX; px++) {
      var val = waveFunc(px);
      var y = baseY - val * amp;
      px === startX ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
    }
    ctx.stroke();
  }

  // 导出
  return {
    COLORS: COLORS,
    FORMULAS: FORMULAS,
    LEVELS: LEVELS,
    clearBg: clearBg,
    drawAxis: drawAxis,
    drawLabel: drawLabel,
    hexToRgba: hexToRgba,
    drawParticle: drawParticle,
    drawProbabilityCloud: drawProbabilityCloud,
    drawEnergyLevel: drawEnergyLevel,
    drawWave: drawWave,
  };
})();

// 兼容非模块环境
if (typeof window !== 'undefined') {
  window.QuantumVizCore = QuantumVizCore;
}
