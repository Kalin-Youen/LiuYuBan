/**
 * 量子力学可视化引擎 - 公式可视化模块
 * 包含16个公式 × 4个层级 = 64个可视化函数
 */

var QuantumVizFormulas = (function() {
  'use strict';

  var viz = {};

  // ==================== 1. 薛定谔方程 ====================
  viz.schrodinger_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2, amp = H*0.3;
    ctx.strokeStyle = COLORS.cyan; ctx.lineWidth = 2; ctx.beginPath();
    for (var px = 0; px < W; px++) {
      var x = (px/W)*4*Math.PI;
      var psi = Math.sin(x - time*2) * Math.exp(-Math.pow((x - 2*Math.PI)/3, 2));
      px === 0 ? ctx.moveTo(px, cy - psi*amp) : ctx.lineTo(px, cy - psi*amp);
    } ctx.stroke();
    ctx.fillStyle = core.hexToRgba(COLORS.purple, 0.3); ctx.beginPath(); ctx.moveTo(0, cy);
    for (var px2 = 0; px2 < W; px2++) {
      var x2 = (px2/W)*4*Math.PI;
      var psi2 = Math.sin(x2 - time*2) * Math.exp(-Math.pow((x2 - 2*Math.PI)/3, 2));
      ctx.lineTo(px2, cy - psi2*psi2*amp*1.5);
    } ctx.lineTo(W, cy); ctx.fill();
    core.drawAxis(ctx, COLORS, 40, cy+amp+20, W-80, amp*2+20, '位置 x', 'ψ(x,t)');
    core.drawLabel(ctx, 'ψ(x,t)', W*0.2, cy-amp-10, COLORS.cyan);
    core.drawLabel(ctx, '|ψ|²', W*0.7, cy-amp*0.8, COLORS.purple);
  };

  viz.schrodinger_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2, maxR = Math.min(W,H)*0.38;
    for (var i = 0; i < 2000; i++) {
      var r = -Math.log(1-Math.random())*0.5, theta = Math.random()*Math.PI*2;
      var prob = Math.exp(-2*r);
      if (Math.random() < prob) {
        ctx.fillStyle = core.hexToRgba(COLORS.cyan, prob*0.6);
        ctx.beginPath(); ctx.arc(cx+r*Math.cos(theta)*maxR*0.3, cy+r*Math.sin(theta)*maxR*0.3, 1.2, 0, Math.PI*2); ctx.fill();
      }
    }
    for (var i2 = 0; i2 < 1500; i2++) {
      var r2 = -Math.log(1-Math.random())*1.0, theta2 = Math.random()*Math.PI*2;
      var prob2 = r2*r2*Math.exp(-r2)*Math.pow(Math.cos(theta2),2);
      if (Math.random() < prob2*0.5) {
        ctx.fillStyle = core.hexToRgba(COLORS.purple, prob2*0.5);
        ctx.beginPath(); ctx.arc(cx+r2*Math.cos(theta2+time*0.3)*maxR*0.2, cy+r2*Math.sin(theta2+time*0.3)*maxR*0.2, 1.5, 0, Math.PI*2); ctx.fill();
      }
    }
    core.drawParticle(ctx, cx, cy, 8, COLORS.yellow);
    core.drawLabel(ctx, '氢原子轨道概率云 (1s + 2p)', cx, 24, COLORS.white, 13);
  };

  viz.schrodinger_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2, sep = W*0.15;
    ctx.strokeStyle = COLORS.gray; ctx.lineWidth = 2; ctx.beginPath();
    for (var px = 0; px < W; px++) {
      var x = (px-W/2)/(W*0.2);
      var V = Math.min(Math.pow(x-1.5,2), Math.pow(x+1.5,2))*0.5;
      px === 0 ? ctx.moveTo(px, cy+60-V*30) : ctx.lineTo(px, cy+60-V*30);
    } ctx.stroke();
    ctx.strokeStyle = COLORS.cyan; ctx.lineWidth = 2; ctx.beginPath();
    for (var px2 = 0; px2 < W; px2++) {
      var x2 = (px2-W/2)/(W*0.15);
      var psi = Math.exp(-Math.pow(x2-1.5,2)) + Math.exp(-Math.pow(x2+1.5,2));
      px2 === 0 ? ctx.moveTo(px2, cy-20-psi*40*Math.cos(time)) : ctx.lineTo(px2, cy-20-psi*40*Math.cos(time));
    } ctx.stroke();
    ctx.strokeStyle = COLORS.red; ctx.lineWidth = 2; ctx.beginPath();
    for (var px3 = 0; px3 < W; px3++) {
      var x3 = (px3-W/2)/(W*0.15);
      var psi3 = Math.exp(-Math.pow(x3-1.5,2)) - Math.exp(-Math.pow(x3+1.5,2));
      px3 === 0 ? ctx.moveTo(px3, cy-20-psi3*40*Math.cos(time)) : ctx.lineTo(px3, cy-20-psi3*40*Math.cos(time));
    } ctx.stroke();
    core.drawParticle(ctx, cx-sep, cy+40, 10, COLORS.yellow);
    core.drawParticle(ctx, cx+sep, cy+40, 10, COLORS.yellow);
    core.drawLabel(ctx, '双势阱波函数', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, '对称态(成键)', cx-W*0.2, cy-80, COLORS.cyan, 11);
    core.drawLabel(ctx, '反对称态(反键)', cx+W*0.2, cy-80, COLORS.red, 11);
  };

  viz.schrodinger_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2;
    ctx.strokeStyle = core.hexToRgba(COLORS.yellow, 0.3); ctx.lineWidth = 1; ctx.beginPath();
    for (var i = 0; i < 300; i++) {
      var tt = i*0.02;
      var x = cx+Math.cos(tt*2+time*0.5)*W*0.3, y = cy+Math.sin(tt*3+time*0.3)*H*0.25;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    } ctx.stroke();
    var ppx = cx+Math.cos(time)*W*0.3, ppy = cy+Math.sin(time*1.5)*H*0.25;
    core.drawParticle(ctx, ppx, ppy, 12, COLORS.yellow);
    ctx.strokeStyle = COLORS.red; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ppx, ppy); ctx.lineTo(ppx-Math.sin(time)*W*0.045, ppy+Math.cos(time*1.5)*H*0.038); ctx.stroke();
    core.drawLabel(ctx, '经典极限：确定性轨迹', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, 'Δx·Δp → 0', cx, H-12, COLORS.yellow, 12);
  };

  // ==================== 2. 狄拉克方程 ====================
  viz.dirac_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2, amp = H*0.25;
    var comps = [{c:COLORS.cyan,l:'ψ₁(上自旋)',p:0},{c:COLORS.purple,l:'ψ₂(下自旋)',p:Math.PI/2},{c:COLORS.red,l:'ψ₃',p:Math.PI},{c:COLORS.yellow,l:'ψ₄',p:Math.PI*1.5}];
    comps.forEach(function(comp, idx) {
      var yOff = cy-amp+idx*amp*0.7;
      ctx.strokeStyle = comp.c; ctx.lineWidth = 1.5; ctx.beginPath();
      for (var px = 40; px < W-40; px++) {
        var x = (px-40)/(W-80)*4*Math.PI;
        var val = Math.sin(x*2-time*3+comp.p)*0.8;
        px === 40 ? ctx.moveTo(px, yOff-val*amp*0.3) : ctx.lineTo(px, yOff-val*amp*0.3);
      } ctx.stroke();
      core.drawLabel(ctx, comp.l, 90, yOff-amp*0.35, comp.c, 10);
    });
    core.drawLabel(ctx, '狄拉克四分量旋量', cx, 24, COLORS.white, 13);
  };

  viz.dirac_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2, R = Math.min(W,H)*0.3;
    ctx.strokeStyle = core.hexToRgba(COLORS.gray,0.3); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(cx, cy, R, R*0.3, 0, 0, Math.PI*2); ctx.stroke();
    var sx = Math.sin(time*1.5)*R*0.8, sy = -Math.cos(time*1.5)*R*0.3;
    ctx.strokeStyle = COLORS.cyan; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx+sx, cy+sy); ctx.stroke();
    core.drawParticle(ctx, cx+sx, cy+sy, 6, COLORS.cyan);
    ctx.strokeStyle = core.hexToRgba(COLORS.purple,0.4); ctx.lineWidth = 1; ctx.beginPath();
    for (var a = 0; a < Math.PI*2; a += 0.05) {
      var ppx = cx+Math.sin(a)*R*0.8, ppy = cy-Math.cos(a)*R*0.3;
      a === 0 ? ctx.moveTo(ppx, ppy) : ctx.lineTo(ppx, ppy);
    } ctx.stroke();
    core.drawParticle(ctx, cx, cy, 5, COLORS.yellow);
    core.drawLabel(ctx, '电子自旋进动', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, 'S⃗', cx+sx+12, cy+sy, COLORS.cyan, 12);
  };

  viz.dirac_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2;
    var lvls = [{n:'S₁/₂',e:0.8,c:COLORS.cyan,s:0},{n:'P₁/₂',e:0.5,c:COLORS.purple,s:-0.05},{n:'P₃/₂',e:0.35,c:COLORS.red,s:0.05},{n:'D₃/₂',e:0.15,c:COLORS.yellow,s:-0.03},{n:'D₅/₂',e:0.0,c:COLORS.cyan,s:0.03}];
    var lx = W*0.3, rx = W*0.7;
    core.drawLabel(ctx, '无耦合', lx, 40, COLORS.textDim, 11);
    lvls.forEach(function(l) { var y = cy-100+l.e*200; ctx.strokeStyle=l.c; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(lx-40,y); ctx.lineTo(lx+40,y); ctx.stroke(); });
    core.drawLabel(ctx, '有耦合', rx, 40, COLORS.textDim, 11);
    lvls.forEach(function(l) { var y = cy-100+(l.e+l.s)*200; ctx.strokeStyle=l.c; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(rx-40,y); ctx.lineTo(rx+40,y); ctx.stroke(); core.drawLabel(ctx, l.n, rx+50, y+4, l.c, 10); });
    ctx.strokeStyle = core.hexToRgba(COLORS.gray,0.2); ctx.lineWidth=1; ctx.setLineDash([4,4]);
    lvls.forEach(function(l) { ctx.beginPath(); ctx.moveTo(lx+40, cy-100+l.e*200); ctx.lineTo(rx-40, cy-100+(l.e+l.s)*200); ctx.stroke(); });
    ctx.setLineDash([]);
    core.drawLabel(ctx, '自旋-轨道耦合能级分裂', cx, 24, COLORS.white, 13);
  };

  viz.dirac_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2, barW = 30, maxH = H*0.35;
    var items = [{l:'经典动能',v:1.0,c:COLORS.cyan},{l:'相对论修正',v:0.15+0.05*Math.sin(time),c:COLORS.red},{l:'精细结构',v:0.03+0.01*Math.sin(time*2),c:COLORS.yellow},{l:'超精细',v:0.005+0.002*Math.sin(time*3),c:COLORS.purple}];
    var startX = cx-items.length*(barW+30)/2;
    items.forEach(function(item, i) {
      var x = startX+i*(barW+30), h = item.v*maxH;
      var grad = ctx.createLinearGradient(x, cy, x, cy-h);
      grad.addColorStop(0, core.hexToRgba(item.c,0.2)); grad.addColorStop(1, item.c);
      ctx.fillStyle = grad; ctx.fillRect(x, cy-h, barW, h);
      ctx.strokeStyle = item.c; ctx.lineWidth = 1; ctx.strokeRect(x, cy-h, barW, h);
      core.drawLabel(ctx, item.l, x+barW/2, cy+16, COLORS.textDim, 9);
    });
    core.drawLabel(ctx, '相对论修正的能量偏差', cx, 24, COLORS.white, 13);
  };

  // ==================== 3. 不确定性原理 ====================
  viz.uncertainty_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2, amp = H*0.25;
    var sigma = 0.5+0.4*Math.sin(time*0.5), sigmaP = 1/(2*sigma);
    ctx.strokeStyle = COLORS.cyan; ctx.lineWidth = 2; ctx.beginPath();
    for (var px = 40; px < W-40; px++) {
      var x = (px-W/2)/(W*0.15), psi = Math.exp(-x*x/(2*sigma*sigma));
      px === 40 ? ctx.moveTo(px, cy-40-psi*amp) : ctx.lineTo(px, cy-40-psi*amp);
    } ctx.stroke();
    ctx.strokeStyle = COLORS.red; ctx.lineWidth = 2; ctx.beginPath();
    for (var px2 = 40; px2 < W-40; px2++) {
      var k = (px2-W/2)/(W*0.15), phi = Math.exp(-k*k*sigmaP*sigmaP*2);
      px2 === 40 ? ctx.moveTo(px2, cy+40+phi*amp*0.8) : ctx.lineTo(px2, cy+40+phi*amp*0.8);
    } ctx.stroke();
    ctx.strokeStyle = core.hexToRgba(COLORS.cyan,0.4); ctx.lineWidth=1; ctx.setLineDash([4,4]);
    var dx = sigma*W*0.15;
    ctx.beginPath(); ctx.moveTo(cx-dx, cy-40-amp); ctx.lineTo(cx-dx, cy-20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx+dx, cy-40-amp); ctx.lineTo(cx+dx, cy-20); ctx.stroke();
    ctx.setLineDash([]);
    core.drawLabel(ctx, 'Δx', cx, cy-20, COLORS.cyan, 11);
    core.drawLabel(ctx, 'Δp', cx, cy+20, COLORS.red, 11);
    core.drawLabel(ctx, 'Δx·Δp = '+(sigma*sigmaP).toFixed(2)+' (≥ 0.50)', cx, H-16, COLORS.yellow, 12);
    core.drawLabel(ctx, '高斯波包不确定性', cx, 24, COLORS.white, 13);
  };

  viz.uncertainty_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2;
    core.drawLabel(ctx, '位置空间', W*0.25, 50, COLORS.cyan, 12);
    for (var i = 0; i < 1500; i++) {
      var r = -Math.log(1-Math.random())*0.8, theta = Math.random()*Math.PI*2, prob = Math.exp(-2*r);
      if (Math.random() < prob) { ctx.fillStyle = core.hexToRgba(COLORS.cyan, prob*0.5); ctx.beginPath(); ctx.arc(W*0.25+r*Math.cos(theta)*30, cy+r*Math.sin(theta)*30, 1.2, 0, Math.PI*2); ctx.fill(); }
    }
    core.drawLabel(ctx, '动量空间', W*0.75, 50, COLORS.red, 12);
    for (var i2 = 0; i2 < 1500; i2++) {
      var r2 = -Math.log(1-Math.random())*0.5, theta2 = Math.random()*Math.PI*2, prob2 = Math.exp(-r2*r2*0.5);
      if (Math.random() < prob2) { ctx.fillStyle = core.hexToRgba(COLORS.red, prob2*0.5); ctx.beginPath(); ctx.arc(W*0.75+r2*Math.cos(theta2)*50, cy+r2*Math.sin(theta2)*50, 1.2, 0, Math.PI*2); ctx.fill(); }
    }
    core.drawLabel(ctx, '电子云分布 vs 动量分布', cx, 24, COLORS.white, 13);
  };

  viz.uncertainty_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2, a = W*0.2, b = H*0.2;
    ctx.strokeStyle = core.hexToRgba(COLORS.gray,0.2); ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(60,cy); ctx.lineTo(W-60,cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx,40); ctx.lineTo(cx,H-40); ctx.stroke();
    ctx.strokeStyle = COLORS.cyan; ctx.lineWidth=2; ctx.beginPath(); ctx.ellipse(cx,cy,a,b,0,0,Math.PI*2); ctx.stroke();
    var angle = time*2;
    core.drawParticle(ctx, cx+Math.cos(angle)*a, cy-Math.sin(angle)*b, 6, COLORS.yellow);
    for (var i = 0; i < 200; i++) {
      ctx.fillStyle = core.hexToRgba(COLORS.purple,0.05);
      ctx.beginPath(); ctx.arc(cx+Math.random()*a*0.9*Math.cos(Math.random()*Math.PI*2), cy-Math.random()*b*0.9*Math.sin(Math.random()*Math.PI*2), 2, 0, Math.PI*2); ctx.fill();
    }
    core.drawLabel(ctx, '分子振动相空间', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, '位置 x', W-50, cy+16, COLORS.textDim, 11);
    core.drawLabel(ctx, '动量 p', cx+16, 50, COLORS.textDim, 11);
  };

  viz.uncertainty_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2, amp = H*0.3;
    ctx.strokeStyle = COLORS.cyan; ctx.lineWidth=2; ctx.beginPath();
    for (var px = 40; px < W-40; px++) { var x=(px-cx)/5; px===40?ctx.moveTo(px,cy-Math.exp(-x*x/20000)*amp):ctx.lineTo(px,cy-Math.exp(-x*x/20000)*amp); } ctx.stroke();
    ctx.strokeStyle = COLORS.red; ctx.lineWidth=2; ctx.beginPath();
    for (var px2 = 40; px2 < W-40; px2++) { var x2=(px2-cx)/5; px2===40?ctx.moveTo(px2,cy+Math.exp(-x2*x2/20000)*amp*0.5):ctx.lineTo(px2,cy+Math.exp(-x2*x2/20000)*amp*0.5); } ctx.stroke();
    core.drawParticle(ctx, cx, cy, 20, COLORS.yellow);
    core.drawLabel(ctx, '宏观物体', cx, cy+4, COLORS.bg, 10);
    core.drawLabel(ctx, 'Δx·Δp → 0 (可忽略)', cx, H-16, COLORS.yellow, 12);
    core.drawLabel(ctx, '宏观极限：不确定性可忽略', cx, 24, COLORS.white, 13);
  };

  // ==================== 4. 叠加原理 ====================
  viz.superposition_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2, amp = H*0.3;
    var slitY1 = cy-30, slitY2 = cy+30;
    ctx.fillStyle = core.hexToRgba(COLORS.gray,0.5);
    ctx.fillRect(W*0.35, 0, 4, slitY1-4); ctx.fillRect(W*0.35, slitY1+4, 4, slitY2-slitY1-8); ctx.fillRect(W*0.35, slitY2+4, 4, H-slitY2-4);
    for (var px = W*0.4; px < W*0.95; px++) {
      var x = px-W*0.35, d=60, lambda=20;
      var intensity = Math.pow(Math.cos(Math.PI*d*(cy-(cy-amp)+(px-W*0.5)*0.5)/(lambda*x*0.1+1)),2);
      ctx.fillStyle = core.hexToRgba(COLORS.cyan, Math.max(0,Math.min(1,intensity*0.8)));
      ctx.fillRect(px, cy-amp, 2, amp*2);
    }
    for (var i = 0; i < 20; i++) { var phase = (time*0.5+i*0.3)%3; if (phase<1) core.drawParticle(ctx, W*0.1+phase*W*0.25, cy+Math.sin(time+i)*5, 3, COLORS.yellow); }
    core.drawLabel(ctx, '双缝干涉图样', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, '缝1', W*0.35-20, slitY1, COLORS.textDim, 10);
    core.drawLabel(ctx, '缝2', W*0.35-20, slitY2, COLORS.textDim, 10);
  };

  viz.superposition_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2, R = Math.min(W,H)*0.3;
    ctx.strokeStyle = core.hexToRgba(COLORS.cyan,0.3); ctx.lineWidth=1; ctx.beginPath(); ctx.arc(cx,cy,R*0.3,0,Math.PI*2); ctx.stroke();
    [COLORS.purple, COLORS.red, COLORS.yellow].forEach(function(color, idx) {
      var a = (idx+1)*Math.PI/3+time*0.3;
      ctx.strokeStyle = core.hexToRgba(color,0.6); ctx.lineWidth=2; ctx.beginPath();
      for (var tt = 0; tt < Math.PI; tt += 0.05) {
        var r = Math.cos(tt)*R*0.6;
        var ppx = cx+Math.cos(a)*r*Math.cos(tt), ppy = cy+Math.sin(a)*r*Math.cos(tt)+Math.sin(tt)*R*0.2;
        tt === 0 ? ctx.moveTo(ppx, ppy) : ctx.lineTo(ppx, ppy);
      } ctx.stroke();
    });
    ctx.strokeStyle = core.hexToRgba(COLORS.yellow,0.5); ctx.lineWidth=2;
    for (var i = 0; i < 4; i++) { var a2 = i*Math.PI/2+time*0.2; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(a2)*R*0.7, cy+Math.sin(a2)*R*0.7); ctx.stroke(); core.drawParticle(ctx, cx+Math.cos(a2)*R*0.7, cy+Math.sin(a2)*R*0.7, 4, COLORS.yellow); }
    core.drawParticle(ctx, cx, cy, 6, COLORS.white);
    core.drawLabel(ctx, '杂化轨道叠加', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, 'sp³ 杂化', cx, H-16, COLORS.yellow, 12);
  };

  viz.superposition_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2, atomR = W*0.12;
    core.drawParticle(ctx, cx-atomR, cy, 20, core.hexToRgba(COLORS.cyan,0.3));
    core.drawParticle(ctx, cx-atomR, cy, 8, COLORS.cyan);
    core.drawParticle(ctx, cx+atomR, cy, 20, core.hexToRgba(COLORS.red,0.3));
    core.drawParticle(ctx, cx+atomR, cy, 8, COLORS.red);
    ctx.strokeStyle = COLORS.cyan; ctx.lineWidth=2; ctx.beginPath();
    for (var px = cx-atomR*2; px <= cx+atomR*2; px++) { var x=(px-cx)/(atomR*0.5); var psi=Math.exp(-x*x*0.3)*Math.cos(x*0.5+time); px===cx-atomR*2?ctx.moveTo(px,cy-80-psi*40):ctx.lineTo(px,cy-80-psi*40); } ctx.stroke();
    core.drawLabel(ctx, 'σ(成键)', cx, cy-140, COLORS.cyan, 11);
    ctx.strokeStyle = COLORS.red; ctx.lineWidth=2; ctx.beginPath();
    for (var px2 = cx-atomR*2; px2 <= cx+atomR*2; px2++) { var x2=(px2-cx)/(atomR*0.5); var psi2=Math.exp(-x2*x2*0.3)*Math.sin(x2*0.5+time); px2===cx-atomR*2?ctx.moveTo(px2,cy+80+psi2*40):ctx.lineTo(px2,cy+80+psi2*40); } ctx.stroke();
    core.drawLabel(ctx, 'σ*(反键)', cx, cy+140, COLORS.red, 11);
    core.drawLabel(ctx, '分子轨道（成键/反键）', cx, 24, COLORS.white, 13);
  };

  viz.superposition_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx = W/2, cy = H/2, amp = H*0.2;
    ctx.strokeStyle = core.hexToRgba(COLORS.cyan,0.5); ctx.lineWidth=1.5; ctx.beginPath();
    for (var px=40;px<W-40;px++){var x=(px/W)*4*Math.PI;px===40?ctx.moveTo(px,cy-30-Math.sin(x-time)*amp):ctx.lineTo(px,cy-30-Math.sin(x-time)*amp);}ctx.stroke();
    ctx.strokeStyle = core.hexToRgba(COLORS.red,0.5); ctx.lineWidth=1.5; ctx.beginPath();
    for (var px2=40;px2<W-40;px2++){var x2=(px2/W)*4*Math.PI;px2===40?ctx.moveTo(px2,cy-30-Math.sin(x2*1.5-time*1.2)*amp):ctx.lineTo(px2,cy-30-Math.sin(x2*1.5-time*1.2)*amp);}ctx.stroke();
    ctx.strokeStyle = COLORS.yellow; ctx.lineWidth=2; ctx.beginPath();
    for (var px3=40;px3<W-40;px3++){var x3=(px3/W)*4*Math.PI;px3===40?ctx.moveTo(px3,cy+50-(Math.sin(x3-time)+Math.sin(x3*1.5-time*1.2))*amp*0.5):ctx.lineTo(px3,cy+50-(Math.sin(x3-time)+Math.sin(x3*1.5-time*1.2))*amp*0.5);}ctx.stroke();
    core.drawLabel(ctx, '经典叠加（无干涉）', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, '波1', 70, cy-30-amp-10, COLORS.cyan, 11);
    core.drawLabel(ctx, '波2', 70, cy-30-amp+4, COLORS.red, 11);
  };

  // ==================== 5. 对易关系 ====================
  viz.commutator_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, amp=H*0.25;
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=2; ctx.beginPath();
    for(var px=40;px<W-40;px++){var x=(px-W/2)/(W*0.12);px===40?ctx.moveTo(px,cy-40-Math.exp(-x*x/2)*Math.cos(time*0.5)*amp):ctx.lineTo(px,cy-40-Math.exp(-x*x/2)*Math.cos(time*0.5)*amp);}ctx.stroke();
    ctx.strokeStyle=COLORS.red; ctx.lineWidth=2; ctx.beginPath();
    for(var px2=40;px2<W-40;px2++){var k=(px2-W/2)/(W*0.12);px2===40?ctx.moveTo(px2,cy+40+Math.exp(-k*k/2)*Math.cos(time*0.5)*amp):ctx.lineTo(px2,cy+40+Math.exp(-k*k/2)*Math.cos(time*0.5)*amp);}ctx.stroke();
    ctx.strokeStyle=COLORS.yellow; ctx.lineWidth=2; ctx.setLineDash([6,4]); ctx.beginPath(); ctx.moveTo(cx,cy-20); ctx.lineTo(cx,cy+20); ctx.stroke(); ctx.setLineDash([]);
    core.drawLabel(ctx, 'ℱ', cx+10, cy, COLORS.yellow, 14);
    core.drawLabel(ctx, 'x 空间', W*0.12, cy-40-amp-10, COLORS.cyan, 12);
    core.drawLabel(ctx, 'p 空间(k)', W*0.12, cy+40+amp+16, COLORS.red, 12);
    core.drawLabel(ctx, '[x̂,p̂] = iℏ → 傅里叶变换对', cx, 24, COLORS.white, 13);
  };

  viz.commutator_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, R=Math.min(W,H)*0.25, L=R*0.8;
    var lx=Math.sin(time*0.8)*L, ly=-Math.cos(time*0.8)*L*0.3;
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+lx,cy+ly); ctx.stroke();
    core.drawParticle(ctx, cx+lx, cy+ly, 5, COLORS.cyan);
    ctx.fillStyle=core.hexToRgba(COLORS.purple,0.1); ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,L,-0.5,0.5); ctx.fill();
    ctx.strokeStyle=COLORS.yellow; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx,cy-L); ctx.stroke();
    core.drawLabel(ctx, 'L⃗', cx+lx+10, cy+ly, COLORS.cyan, 12);
    core.drawLabel(ctx, 'Lz(确定)', cx+10, cy-L, COLORS.yellow, 11);
    core.drawLabel(ctx, '[Lx,Ly] = iℏLz', cx, 24, COLORS.white, 13);
  };

  viz.commutator_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, R=Math.min(W,H)*0.25;
    var bondLen=R*(1+0.1*Math.sin(time*4)), angle=time*1.5;
    var ax=cx+Math.cos(angle)*bondLen*0.5, ay=cy+Math.sin(angle)*bondLen*0.3;
    var bx=cx-Math.cos(angle)*bondLen*0.5, by=cy-Math.sin(angle)*bondLen*0.3;
    ctx.strokeStyle=COLORS.gray; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by); ctx.stroke();
    core.drawParticle(ctx, ax,ay,12,COLORS.cyan); core.drawParticle(ctx, bx,by,12,COLORS.red);
    ctx.strokeStyle=core.hexToRgba(COLORS.yellow,0.3); ctx.lineWidth=1;
    for(var i=0;i<30;i++){var tt=i*0.1,r=R*(1+0.1*Math.sin(tt*4)),a2=angle+tt*0.05;ctx.beginPath();ctx.moveTo(cx+Math.cos(a2)*r*0.5,cy+Math.sin(a2)*r*0.3);ctx.lineTo(cx-Math.cos(a2)*r*0.5,cy-Math.sin(a2)*r*0.3);ctx.stroke();}
    core.drawLabel(ctx, '振动-转动耦合', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, '[J²,V] ≠ 0', cx, H-16, COLORS.yellow, 12);
  };

  viz.commutator_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, amp=H*0.3;
    ctx.strokeStyle=core.hexToRgba(COLORS.gray,0.15); ctx.lineWidth=1;
    for(var i=-5;i<=5;i++){ctx.beginPath();for(var j=0;j<100;j++){var tt=j*0.05;j===0?ctx.moveTo(cx+(i*40+Math.cos(tt+time)*20),cy+Math.sin(tt+time)*amp):ctx.lineTo(cx+(i*40+Math.cos(tt+time)*20),cy+Math.sin(tt+time)*amp);}ctx.stroke();}
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=2; ctx.beginPath();
    for(var i2=0;i2<200;i2++){var tt2=i2*0.03;i2===0?ctx.moveTo(cx+Math.cos(tt2*2+time)*W*0.3,cy+Math.sin(tt2*3+time*0.7)*amp):ctx.lineTo(cx+Math.cos(tt2*2+time)*W*0.3,cy+Math.sin(tt2*3+time*0.7)*amp);}ctx.stroke();
    core.drawLabel(ctx, '经典泊松括号 {f,g}', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, '{q,p} = 1 → 经典极限', cx, H-16, COLORS.yellow, 12);
  };

  // ==================== 6. 密度矩阵 ====================
  viz.density_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, R=Math.min(W,H)*0.3;
    ctx.strokeStyle=core.hexToRgba(COLORS.gray,0.3); ctx.lineWidth=1;
    ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx,cy,R,R*0.3,0,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx,cy,R*0.3,R,0,0,Math.PI*2); ctx.stroke();
    var theta=time*0.5, phi=time*0.8;
    var sx=R*Math.sin(theta)*Math.cos(phi), sy=-R*Math.cos(theta);
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+sx,cy+sy); ctx.stroke();
    core.drawParticle(ctx, cx+sx,cy+sy,5,COLORS.cyan);
    var mixR=R*0.5, mx=mixR*Math.sin(theta+1)*Math.cos(phi+0.5), my=-mixR*Math.cos(theta+1);
    ctx.strokeStyle=COLORS.red; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+mx,cy+my); ctx.stroke();
    core.drawParticle(ctx, cx+mx,cy+my,5,COLORS.red);
    core.drawLabel(ctx, '|0⟩',cx,cy-R-10,COLORS.textDim,11);
    core.drawLabel(ctx, '|1⟩',cx,cy+R+16,COLORS.textDim,11);
    core.drawLabel(ctx, '纯态',cx+sx+10,cy+sy,COLORS.cyan,10);
    core.drawLabel(ctx, '混合态',cx+mx+10,cy+my,COLORS.red,10);
    core.drawLabel(ctx, '布洛赫球', cx, 24, COLORS.white, 13);
  };

  viz.density_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2;
    var states=[{l:'|1⟩',p:0.6,c:COLORS.cyan},{l:'|2⟩',p:0.3,c:COLORS.purple},{l:'|3⟩',p:0.1,c:COLORS.red}];
    var barW=50, startX=cx-states.length*(barW+40)/2;
    states.forEach(function(s,i){var x=startX+i*(barW+40),h=s.p*H*0.4,y=cy+40-h;var grad=ctx.createLinearGradient(x,cy+40,x,y);grad.addColorStop(0,core.hexToRgba(s.c,0.2));grad.addColorStop(1,s.c);ctx.fillStyle=grad;ctx.fillRect(x,y,barW,h);core.drawLabel(ctx, s.l,x+barW/2,cy+56,s.c,11);core.drawLabel(ctx, 'P='+s.p,x+barW/2,y-8,COLORS.textDim,10);});
    core.drawLabel(ctx, '统计混合的原子态 ρ = Σ pᵢ|ψᵢ⟩⟨ψᵢ|', cx, 24, COLORS.white, 13);
  };

  viz.density_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, n=4, cellW=60, cellH=60;
    var startX=cx-n*cellW/2, startY=cy-n*cellH/2;
    var T=0.5+0.3*Math.sin(time*0.3), Z=1+Math.exp(-T)+Math.exp(-2*T)+Math.exp(-3*T);
    for(var i=0;i<n;i++) for(var j=0;j<n;j++){
      var val=i===j?Math.exp(-i*T)/Z:0.05*Math.exp(-Math.abs(i-j)*2/T);
      var x=startX+j*cellW, y=startY+i*cellH, absV=Math.abs(val);
      ctx.fillStyle=core.hexToRgba(COLORS.purple,absV*0.8); ctx.fillRect(x+2,y+2,cellW-4,cellH-4);
      ctx.strokeStyle=core.hexToRgba(COLORS.gray,0.3); ctx.lineWidth=1; ctx.strokeRect(x,y,cellW,cellH);
      ctx.fillStyle=absV>0.2?COLORS.white:COLORS.textDim; ctx.font='11px monospace'; ctx.textAlign='center';
      ctx.fillText(val.toFixed(2),x+cellW/2,y+cellH/2+4);
    }
    core.drawLabel(ctx, '热平衡态密度矩阵 (对角占优)', cx, startY-20, COLORS.white, 13);
    core.drawLabel(ctx, 'T = '+T.toFixed(2), cx, startY+n*cellH+20, COLORS.yellow, 12);
  };

  viz.density_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, amp=H*0.3;
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=2; ctx.beginPath();
    for(var px=40;px<W-40;px++){var x=(px-cx)/(W*0.1);var p=(Math.exp(-x*x/2)+0.5*Math.exp(-(x-2)*(x-2)/2)+0.3*Math.exp(-(x+2.5)*(x+2.5)))/1.8;px===40?ctx.moveTo(px,cy-p*amp):ctx.lineTo(px,cy-p*amp);}ctx.stroke();
    ctx.fillStyle=core.hexToRgba(COLORS.cyan,0.15); ctx.beginPath(); ctx.moveTo(40,cy);
    for(var px2=40;px2<W-40;px2++){var x2=(px2-cx)/(W*0.1);var p2=(Math.exp(-x2*x2/2)+0.5*Math.exp(-(x2-2)*(x2-2)/2)+0.3*Math.exp(-(x2+2.5)*(x2+2.5)))/1.8;ctx.lineTo(px2,cy-p2*amp);}ctx.lineTo(W-40,cy);ctx.fill();
    core.drawAxis(ctx, COLORS, 40,cy+10,W-80,amp+20,'状态空间','概率 P(x)');
    core.drawLabel(ctx, '经典概率分布', cx, 24, COLORS.white, 13);
  };

  // ==================== 7. 玻恩规则 ====================
  viz.born_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, amp=H*0.25;
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=2; ctx.beginPath();
    for(var px=40;px<W-40;px++){var x=(px-W/2)/(W*0.12);var psi=Math.sin(x*2+time)*Math.exp(-x*x/4);px===40?ctx.moveTo(px,cy-30-psi*amp):ctx.lineTo(px,cy-30-psi*amp);}ctx.stroke();
    ctx.fillStyle=core.hexToRgba(COLORS.purple,0.3); ctx.beginPath(); ctx.moveTo(40,cy+30);
    for(var px2=40;px2<W-40;px2++){var x2=(px2-W/2)/(W*0.12);var psi2=Math.sin(x2*2+time)*Math.exp(-x2*x2/4);ctx.lineTo(px2,cy+30-psi2*psi2*amp*1.5);}ctx.lineTo(W-40,cy+30);ctx.fill();
    ctx.strokeStyle=COLORS.yellow; ctx.lineWidth=1; ctx.setLineDash([4,4]);
    for(var i=0;i<8;i++){var ppx=80+i*(W-160)/7;ctx.beginPath();ctx.moveTo(ppx,cy-10);ctx.lineTo(ppx,cy+10);ctx.stroke();}ctx.setLineDash([]);
    core.drawLabel(ctx, 'ψ(x)',W*0.15,cy-30-amp-10,COLORS.cyan,12);
    core.drawLabel(ctx, 'P(x)=|ψ(x)|²',W*0.15,cy+30+amp+16,COLORS.purple,12);
    core.drawLabel(ctx, '玻恩规则：|ψ|² → 概率', cx, 24, COLORS.white, 13);
  };

  viz.born_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2;
    var lvls=[{n:3,y:cy-H*0.3,c:COLORS.red},{n:2,y:cy,c:COLORS.yellow},{n:1,y:cy+H*0.3,c:COLORS.cyan}];
    lvls.forEach(function(l){ctx.strokeStyle=l.c;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx-80,l.y);ctx.lineTo(cx+80,l.y);ctx.stroke();core.drawLabel(ctx, 'n='+l.n,cx+90,l.y+4,l.c,11);});
    var ta=(Math.sin(time*2)+1)/2;
    ctx.strokeStyle=core.hexToRgba(COLORS.purple,ta); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cx-30,lvls[0].y+5); ctx.lineTo(cx-30,lvls[1].y-5); ctx.stroke();
    ctx.fillStyle=core.hexToRgba(COLORS.purple,ta); ctx.beginPath(); ctx.moveTo(cx-30,lvls[1].y-5); ctx.lineTo(cx-34,lvls[1].y-12); ctx.lineTo(cx-26,lvls[1].y-12); ctx.fill();
    core.drawLabel(ctx, 'P='+(ta*0.42).toFixed(2),cx-60,(lvls[0].y+lvls[1].y)/2,COLORS.purple,11);
    core.drawLabel(ctx, '跃迁概率', cx, 24, COLORS.white, 13);
  };

  viz.born_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, R=Math.min(W,H)*0.3;
    for(var i=0;i<8;i++){var phase=((time*0.5+i*0.4)%2);if(phase<1.5)core.drawParticle(ctx, cx-R-50+phase*(R+50),cy+(i-3.5)*15,3,COLORS.yellow);}
    core.drawParticle(ctx, cx,cy,15,COLORS.purple);
    for(var r=20;r<R;r+=20){var alpha=Math.max(0,0.3-r/R*0.3)*(0.5+0.5*Math.sin(time*3-r*0.1));ctx.strokeStyle=core.hexToRgba(COLORS.cyan,alpha);ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,r+(time*30)%20,0,Math.PI*2);ctx.stroke();}
    ctx.strokeStyle=core.hexToRgba(COLORS.red,0.4); ctx.lineWidth=1.5; ctx.beginPath();
    for(var a=0;a<Math.PI*2;a+=0.05){var ds=Math.pow(1+Math.cos(a),2)*0.5;a===0?ctx.moveTo(cx+Math.cos(a)*ds*R*1.5,cy+Math.sin(a)*ds*R*1.5):ctx.lineTo(cx+Math.cos(a)*ds*R*1.5,cy+Math.sin(a)*ds*R*1.5);}ctx.closePath();ctx.stroke();
    core.drawLabel(ctx, '散射截面 dσ/dΩ', cx, 24, COLORS.white, 13);
  };

  viz.born_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, N=500, bins=20, counts=[];
    for(var b=0;b<bins;b++)counts.push(0);
    for(var i=0;i<N;i++){counts[Math.floor(Math.random()*bins)]++;}
    var barW=(W-100)/bins, maxC=Math.max.apply(null,counts);
    counts.forEach(function(c,i){var h=(c/maxC)*H*0.5;ctx.fillStyle=core.hexToRgba(COLORS.cyan,0.5);ctx.fillRect(50+i*barW+1,cy+40-h,barW-2,h);});
    ctx.strokeStyle=COLORS.red; ctx.lineWidth=2; ctx.beginPath();
    for(var px=50;px<W-50;px++){var x=(px-50)/(W-100);var p=Math.exp(-Math.pow(x-0.5,2)/0.05)/0.5;px===50?ctx.moveTo(px,cy+40-p*H*0.45):ctx.lineTo(px,cy+40-p*H*0.45);}ctx.stroke();
    core.drawLabel(ctx, 'N = '+N+' 次测量', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, '频率 → 概率 (大数定律)', cx, H-16, COLORS.yellow, 12);
  };

  // ==================== 8. 期望值 ====================
  viz.expectation_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, amp=H*0.25;
    for(var s=0;s<5;s++){ctx.strokeStyle=core.hexToRgba(COLORS.cyan,0.2);ctx.lineWidth=1;ctx.beginPath();for(var px=40;px<W-40;px++){var x=(px-40)/(W-80)*4*Math.PI;px===40?ctx.moveTo(px,cy-(Math.sin(x-time+s)+Math.sin(x*3+s*2+time)*0.3)*amp*0.4):ctx.lineTo(px,cy-(Math.sin(x-time+s)+Math.sin(x*3+s*2+time)*0.3)*amp*0.4);}ctx.stroke();}
    ctx.strokeStyle=COLORS.yellow; ctx.lineWidth=3; ctx.beginPath();
    for(var px2=40;px2<W-40;px2++){var x2=(px2-40)/(W-80)*4*Math.PI;px2===40?ctx.moveTo(px2,cy-Math.sin(x2-time)*amp*0.4):ctx.lineTo(px2,cy-Math.sin(x2-time)*amp*0.4);}ctx.stroke();
    core.drawLabel(ctx, '⟨A⟩ = ⟨ψ|Â|ψ⟩ 系综平均', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, '单次测量',W*0.15,cy-amp-10,COLORS.cyan,11);
    core.drawLabel(ctx, '期望值',W*0.7,cy-amp*0.5,COLORS.yellow,11);
  };

  viz.expectation_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, scale=H*0.35/15;
    var lvls=[{n:1,E:-13.6,c:COLORS.cyan},{n:2,E:-3.4,c:COLORS.purple},{n:3,E:-1.51,c:COLORS.red},{n:4,E:-0.85,c:COLORS.yellow}];
    lvls.forEach(function(l){var y=cy-l.E*scale;ctx.strokeStyle=l.c;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx-60,y);ctx.lineTo(cx+60,y);ctx.stroke();core.drawLabel(ctx, 'n='+l.n+' E='+l.E+'eV',cx+70,y+4,l.c,10);});
    var mixE=-13.6*0.5+(-3.4)*0.3+(-1.51)*0.15+(-0.85)*0.05, ey=cy-mixE*scale;
    ctx.strokeStyle=COLORS.yellow; ctx.lineWidth=2; ctx.setLineDash([6,4]); ctx.beginPath(); ctx.moveTo(cx-80,ey); ctx.lineTo(cx+80,ey); ctx.stroke(); ctx.setLineDash([]);
    core.drawLabel(ctx, '⟨E⟩ = '+mixE.toFixed(1)+' eV', cx, ey-10, COLORS.yellow, 11);
    core.drawLabel(ctx, '原子能级期望值', cx, 24, COLORS.white, 13);
  };

  viz.expectation_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2;
    var atoms=[{x:cx-60,y:cy,ch:-0.5,c:COLORS.red,r:18},{x:cx+60,y:cy,ch:0.5,c:COLORS.cyan,r:18}];
    for(var i=0;i<12;i++){var angle=(i/12)*Math.PI*2;ctx.strokeStyle=core.hexToRgba(COLORS.yellow,0.2);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(atoms[0].x+Math.cos(angle)*23,atoms[0].y+Math.sin(angle)*23);ctx.quadraticCurveTo(cx,cy+Math.sin(angle)*40,atoms[1].x+Math.cos(angle)*23,atoms[1].y+Math.sin(angle)*23);ctx.stroke();}
    atoms.forEach(function(a){core.drawParticle(ctx, a.x,a.y,a.r,a.c);core.drawLabel(ctx, a.ch>0?'δ+':'δ-',a.x,a.y+4,COLORS.white,12);});
    ctx.strokeStyle=COLORS.yellow; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(atoms[0].x,cy+40); ctx.lineTo(atoms[1].x,cy+40); ctx.stroke();
    ctx.fillStyle=COLORS.yellow; ctx.beginPath(); ctx.moveTo(atoms[1].x,cy+40); ctx.lineTo(atoms[1].x-8,cy+36); ctx.lineTo(atoms[1].x-8,cy+44); ctx.fill();
    core.drawLabel(ctx, 'μ⃗ = ⟨ψ|e·r|ψ⟩', cx, cy+60, COLORS.yellow, 12);
    core.drawLabel(ctx, '分子偶极矩', cx, 24, COLORS.white, 13);
  };

  viz.expectation_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, amp=H*0.25;
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=1.5; ctx.beginPath();
    for(var px=40;px<W-40;px++){var tt=(px-40)/(W-80)*10;var val=Math.sin(tt*2)+0.5*Math.sin(tt*5)+0.3*Math.cos(tt*3);px===40?ctx.moveTo(px,cy-val*amp*0.3):ctx.lineTo(px,cy-val*amp*0.3);}ctx.stroke();
    ctx.strokeStyle=COLORS.yellow; ctx.lineWidth=2; ctx.setLineDash([8,4]); ctx.beginPath(); ctx.moveTo(40,cy); ctx.lineTo(W-40,cy); ctx.stroke(); ctx.setLineDash([]);
    core.drawLabel(ctx, 'f(t)',W*0.1,cy-amp-10,COLORS.cyan,11);
    core.drawLabel(ctx, '⟨f⟩_T = (1/T)∫f(t)dt', cx, H-16, COLORS.yellow, 12);
    core.drawLabel(ctx, '经典时间平均', cx, 24, COLORS.white, 13);
  };

  // ==================== 9. 海森堡方程 ====================
  viz.heisenberg_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, amp=H*0.25;
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=2; ctx.beginPath();
    for(var px=40;px<W-40;px++){var tt=(px-40)/(W-80)*4*Math.PI;px===40?ctx.moveTo(px,cy-30-Math.cos(tt+time)*Math.cos(tt*0.5)*amp):ctx.lineTo(px,cy-30-Math.cos(tt+time)*Math.cos(tt*0.5)*amp);}ctx.stroke();
    ctx.strokeStyle=COLORS.red; ctx.lineWidth=2; ctx.beginPath();
    for(var px2=40;px2<W-40;px2++){var tt2=(px2-40)/(W-80)*4*Math.PI;px2===40?ctx.moveTo(px2,cy+30+Math.sin(tt2+time)*Math.cos(tt2*0.5)*amp):ctx.lineTo(px2,cy+30+Math.sin(tt2+time)*Math.cos(tt2*0.5)*amp);}ctx.stroke();
    core.drawLabel(ctx, 'x̂(t)',W*0.1,cy-30-amp-10,COLORS.cyan,12);
    core.drawLabel(ctx, 'p̂(t)',W*0.1,cy+30+amp+16,COLORS.red,12);
    core.drawLabel(ctx, 'dÂ/dt = (i/ℏ)[Ĥ,Â]', cx, 24, COLORS.white, 13);
  };

  viz.heisenberg_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, R=Math.min(W,H)*0.3, precA=time*0.6;
    ctx.strokeStyle=core.hexToRgba(COLORS.cyan,0.4); ctx.lineWidth=1; ctx.beginPath();
    for(var a=0;a<Math.PI*2;a+=0.05){var r=R*0.91/(1+0.3*Math.cos(a));var ppx=cx+r*Math.cos(a+precA),ppy=cy+r*Math.sin(a+precA)*0.6;a===0?ctx.moveTo(ppx,ppy):ctx.lineTo(ppx,ppy);}ctx.closePath();ctx.stroke();
    var eA=time*2, eR=R*0.91/(1+0.3*Math.cos(eA));
    core.drawParticle(ctx, cx+eR*Math.cos(eA+precA),cy+eR*Math.sin(eA+precA)*0.6,6,COLORS.cyan);
    core.drawParticle(ctx, cx,cy,10,COLORS.yellow);
    ctx.strokeStyle=core.hexToRgba(COLORS.red,0.3); ctx.lineWidth=1; ctx.beginPath(); ctx.ellipse(cx,cy,R*1.1,R*0.1,0,0,Math.PI*2); ctx.stroke();
    core.drawLabel(ctx, '轨道进动', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, 'dL/dt = τ', cx, H-16, COLORS.yellow, 12);
  };

  viz.heisenberg_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2;
    var modes=[{l:'对称伸缩',f:1,c:COLORS.cyan},{l:'反对称伸缩',f:1.5,c:COLORS.red},{l:'弯曲振动',f:0.8,c:COLORS.yellow}];
    modes.forEach(function(mode,idx){
      var baseY=60+idx*(H-100)/3, ax=cx-50, bx=cx+50, ay=baseY, by=baseY;
      if(idx===0){ax-=10*Math.sin(time*mode.f);bx+=10*Math.sin(time*mode.f);}
      else if(idx===1){ax-=10*Math.sin(time*mode.f);bx-=10*Math.sin(time*mode.f);}
      else{ay-=10*Math.sin(time*mode.f);by+=10*Math.sin(time*mode.f);}
      core.drawParticle(ctx, ax,ay,10,mode.c); core.drawParticle(ctx, cx,baseY,10,mode.c); core.drawParticle(ctx, bx,by,10,mode.c);
      ctx.strokeStyle=core.hexToRgba(mode.c,0.5); ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(cx,baseY); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx,baseY); ctx.lineTo(bx,by); ctx.stroke();
      core.drawLabel(ctx, mode.l, 60, baseY+4, mode.c, 11);
    });
    core.drawLabel(ctx, '分子振动模式', cx, 24, COLORS.white, 13);
  };

  viz.heisenberg_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, amp=H*0.3;
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=2; ctx.beginPath();
    for(var i=0;i<300;i++){var tt=i*0.02;i===0?ctx.moveTo(cx+Math.cos(tt+time)*W*0.3,cy+Math.sin(tt+time)*amp):ctx.lineTo(cx+Math.cos(tt+time)*W*0.3,cy+Math.sin(tt+time)*amp);}ctx.stroke();
    core.drawParticle(ctx, cx+Math.cos(time)*W*0.3,cy+Math.sin(time)*amp,6,COLORS.yellow);
    core.drawAxis(ctx, COLORS, 40,cy+amp+20,W-80,amp*2+20,'位置 x','动量 p');
    core.drawLabel(ctx, '经典运动方程 (相空间)', cx, 24, COLORS.white, 13);
  };

  // ==================== 10. 路径积分 ====================
  viz.path_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, startX=60, endX=W-60, paths=8;
    for(var i=0;i<paths;i++){var yOff=(i-paths/2+0.5)*(H*0.6/paths), phase=i*0.8+time, alpha=0.3+0.3*Math.cos(phase);
    ctx.strokeStyle=core.hexToRgba(COLORS.cyan,alpha); ctx.lineWidth=1.5; ctx.beginPath();
    for(var px=startX;px<=endX;px+=2){var tt=(px-startX)/(endX-startX);px===startX?ctx.moveTo(px,cy+yOff*Math.sin(tt*Math.PI)+Math.sin(tt*10+phase)*5):ctx.lineTo(px,cy+yOff*Math.sin(tt*Math.PI)+Math.sin(tt*10+phase)*5);}ctx.stroke();}
    for(var i2=0;i2<50;i2++){var y=cy+(i2-25)*4,amp2=0;for(var j=0;j<paths;j++)amp2+=Math.cos(j*0.8+time+(j-paths/2+0.5)*(H*0.6/paths)*0.1);ctx.fillStyle=core.hexToRgba(COLORS.yellow,(amp2*amp2)/(paths*paths)*0.8);ctx.fillRect(endX-10,y,10,3);}
    core.drawLabel(ctx, '多路径干涉 K = ∫ e^(iS/ℏ) Dx', cx, 24, COLORS.white, 13);
  };

  viz.path_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2;
    var lvls=[{n:3,y:cy-H*0.3,c:COLORS.red},{n:2,y:cy,c:COLORS.yellow},{n:1,y:cy+H*0.3,c:COLORS.cyan}];
    lvls.forEach(function(l){ctx.strokeStyle=l.c;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx-100,l.y);ctx.lineTo(cx+100,l.y);ctx.stroke();core.drawLabel(ctx, 'n='+l.n,cx+110,l.y+4,l.c,11);});
    var pa=(Math.sin(time*1.5)+1)/2;
    ctx.strokeStyle=core.hexToRgba(COLORS.purple,pa); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cx-40,lvls[0].y); ctx.lineTo(cx-40,lvls[2].y); ctx.stroke();
    ctx.strokeStyle=core.hexToRgba(COLORS.yellow,pa*0.7); ctx.lineWidth=1.5; ctx.setLineDash([4,4]);
    ctx.beginPath(); ctx.moveTo(cx+40,lvls[0].y); ctx.lineTo(cx+40,lvls[1].y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx+40,lvls[1].y); ctx.lineTo(cx+40,lvls[2].y); ctx.stroke(); ctx.setLineDash([]);
    core.drawLabel(ctx, '直接',cx-60,(lvls[0].y+lvls[2].y)/2,COLORS.purple,10);
    core.drawLabel(ctx, '间接',cx+55,(lvls[0].y+lvls[1].y)/2,COLORS.yellow,10);
    core.drawLabel(ctx, '电子跃迁路径', cx, 24, COLORS.white, 13);
  };

  viz.path_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, amp=H*0.3;
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=2; ctx.beginPath();
    for(var px=40;px<W-40;px++){var x=(px-40)/(W-80)*6-3;var E=Math.exp(-x*x)-0.5*Math.exp(-(x-2)*(x-2))+0.3*Math.exp(-(x+2)*(x+2));px===40?ctx.moveTo(px,cy-E*amp):ctx.lineTo(px,cy-E*amp);}ctx.stroke();
    ctx.strokeStyle=COLORS.red; ctx.lineWidth=1; ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(cx,cy-amp); ctx.lineTo(cx,cy+20); ctx.stroke(); ctx.setLineDash([]);
    core.drawLabel(ctx, '过渡态 ‡',cx,cy-amp-10,COLORS.red,11);
    core.drawLabel(ctx, '反应物',cx-W*0.3,cy+30,COLORS.cyan,11);
    core.drawLabel(ctx, '产物',cx+W*0.3,cy+30,COLORS.cyan,11);
    core.drawLabel(ctx, '化学反应路径', cx, 24, COLORS.white, 13);
  };

  viz.path_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2;
    for(var i=0;i<6;i++){var yOff=(i-2.5)*30,action=Math.abs(yOff)*0.1,alpha=Math.max(0.05,0.5-action);
    ctx.strokeStyle=core.hexToRgba(COLORS.gray,alpha); ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(60,cy+yOff); ctx.quadraticCurveTo(cx,cy+yOff*0.5+Math.sin(time+i)*10,W-60,cy+yOff*0.3); ctx.stroke();}
    ctx.strokeStyle=COLORS.yellow; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(60,cy); ctx.quadraticCurveTo(cx,cy+10*Math.sin(time*0.5),W-60,cy); ctx.stroke();
    core.drawParticle(ctx, 60,cy,5,COLORS.cyan); core.drawParticle(ctx, W-60,cy,5,COLORS.red);
    core.drawLabel(ctx, 'A',60,cy-12,COLORS.cyan,12);
    core.drawLabel(ctx, 'B',W-60,cy-12,COLORS.red,12);
    core.drawLabel(ctx, '最小作用量路径 δS = 0', cx, 24, COLORS.white, 13);
  };

  // ==================== 11. 泡利不相容原理 ====================
  viz.pauli_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, amp=H*0.25;
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=2; ctx.beginPath();
    for(var px=40;px<W-40;px++){var x=(px-W/2)/(W*0.12);var psiS=(Math.exp(-x*x)+Math.exp(-(x-2)*(x-2)))*Math.cos(time);px===40?ctx.moveTo(px,cy-30-psiS*amp*0.5):ctx.lineTo(px,cy-30-psiS*amp*0.5);}ctx.stroke();
    ctx.strokeStyle=COLORS.red; ctx.lineWidth=2; ctx.beginPath();
    for(var px2=40;px2<W-40;px2++){var x2=(px2-W/2)/(W*0.12);var psiA=(Math.exp(-x2*x2)-Math.exp(-(x2-2)*(x2-2)))*Math.cos(time);px2===40?ctx.moveTo(px2,cy+30+psiA*amp*0.5):ctx.lineTo(px2,cy+30+psiA*amp*0.5);}ctx.stroke();
    var nodeX=cx+W*0.06; ctx.strokeStyle=COLORS.yellow; ctx.lineWidth=1; ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(nodeX,cy+10); ctx.lineTo(nodeX,cy+50); ctx.stroke(); ctx.setLineDash([]);
    core.drawLabel(ctx, '节点(ψ=0)',nodeX+5,cy+60,COLORS.yellow,10);
    core.drawLabel(ctx, 'ψ_S(对称)',W*0.15,cy-30-amp-10,COLORS.cyan,11);
    core.drawLabel(ctx, 'ψ_A(反对称)',W*0.15,cy+30+amp+16,COLORS.red,11);
    core.drawLabel(ctx, '反对称波函数 ψ(x₁,x₂) = −ψ(x₂,x₁)', cx, 24, COLORS.white, 13);
  };

  viz.pauli_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, maxR=Math.min(W,H)*0.35;
    var shells=[{n:1,max:2,elec:2,c:COLORS.cyan},{n:2,max:8,elec:8,c:COLORS.purple},{n:3,max:18,elec:8,c:COLORS.red}];
    shells.forEach(function(shell,si){
      var r=maxR*(si+1)/shells.length;
      ctx.strokeStyle=core.hexToRgba(shell.c,0.3); ctx.lineWidth=1; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke();
      for(var e=0;e<shell.elec;e++){var angle=(e/shell.elec)*Math.PI*2+time*(1+si*0.3);var ex=cx+Math.cos(angle)*r,ey=cy+Math.sin(angle)*r;var up=e%2===0;
      core.drawParticle(ctx, ex,ey,5,up?COLORS.yellow:COLORS.red);ctx.strokeStyle=up?COLORS.yellow:COLORS.red;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(ex,ey-8);ctx.lineTo(ex,ey+(up?-14:2));ctx.stroke();}
      core.drawLabel(ctx, 'n='+shell.n+'('+shell.elec+'/'+shell.max+')',cx+r+10,cy-5,shell.c,10);
    });
    core.drawParticle(ctx, cx,cy,8,COLORS.white);
    core.drawLabel(ctx, '壳层填充', cx, 24, COLORS.white, 13);
  };

  viz.pauli_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, sep=W*0.15;
    core.drawParticle(ctx, cx-sep,cy,25,core.hexToRgba(COLORS.cyan,0.2)); core.drawParticle(ctx, cx-sep,cy,10,COLORS.cyan);
    core.drawParticle(ctx, cx+sep,cy,25,core.hexToRgba(COLORS.red,0.2)); core.drawParticle(ctx, cx+sep,cy,10,COLORS.red);
    for(var i=0;i<4;i++){var phase=time*2+i*Math.PI/2;core.drawParticle(ctx, cx+Math.cos(phase)*sep*0.6,cy+Math.sin(phase)*20,4,COLORS.yellow);}
    for(var i2=0;i2<100;i2++){var r=Math.random()*sep*1.2,a=Math.random()*Math.PI*2,prob=Math.exp(-r*r/(sep*sep*0.3));if(Math.random()<prob){ctx.fillStyle=core.hexToRgba(COLORS.yellow,prob*0.2);ctx.beginPath();ctx.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r*0.4,1.5,0,Math.PI*2);ctx.fill();}}
    core.drawLabel(ctx, '共价键（共享电子对）', cx, 24, COLORS.white, 13);
  };

  viz.pauli_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, gs=6, sp=Math.min(W,H)*0.08, sx=cx-(gs-1)*sp/2, sy=cy-(gs-1)*sp/2;
    for(var i=0;i<gs;i++) for(var j=0;j<gs;j++){
      var x=sx+i*sp, y=sy+j*sp, wb=Math.sin(time*2+i+j)*2;
      core.drawParticle(ctx, x+wb,y+wb,6,COLORS.cyan);
      if(i<gs-1){ctx.strokeStyle=core.hexToRgba(COLORS.purple,0.3);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+wb,y+wb);ctx.lineTo(sx+(i+1)*sp+Math.sin(time*2+i+1+j)*2,y+wb);ctx.stroke();}
      if(j<gs-1){ctx.strokeStyle=core.hexToRgba(COLORS.purple,0.3);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+wb,y+wb);ctx.lineTo(x+wb,sy+(j+1)*sp+Math.sin(time*2+i+j+1)*2);ctx.stroke();}
    }
    core.drawLabel(ctx, '物质稳定性（泡利排斥 → 晶格结构）', cx, 24, COLORS.white, 13);
  };

  // ==================== 12. 量子纠缠 ====================
  viz.entangle_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, R=Math.min(W,H)*0.25;
    var ax=cx-R*1.5, bx=cx+R*1.5;
    core.drawParticle(ctx, ax,cy,15,COLORS.cyan); core.drawLabel(ctx, 'A',ax,cy+4,COLORS.bg,12);
    core.drawParticle(ctx, bx,cy,15,COLORS.red); core.drawLabel(ctx, 'B',bx,cy+4,COLORS.bg,12);
    for(var i=0;i<5;i++){var alpha=0.2+0.2*Math.sin(time*2+i);ctx.strokeStyle=core.hexToRgba(COLORS.purple,alpha);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(ax+15,cy);ctx.bezierCurveTo(cx-30,cy-40+i*20,cx+30,cy+40-i*20,bx-15,cy);ctx.stroke();}
    var mA=Math.sin(time*3)>0?'↑':'↓';
    core.drawLabel(ctx, '自旋A: '+mA,ax,cy-30,COLORS.cyan,11); core.drawLabel(ctx, '自旋B: '+mA,bx,cy-30,COLORS.red,11);
    core.drawLabel(ctx, '|Φ⁺⟩ = (|00⟩+|11⟩)/√2', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, '完美关联：测量A即知B', cx, H-16, COLORS.yellow, 12);
  };

  viz.entangle_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, R=Math.min(W,H)*0.2;
    core.drawParticle(ctx, cx,cy,12,COLORS.yellow); core.drawLabel(ctx, '源',cx,cy+20,COLORS.yellow,11);
    var dist=R*2*((time*0.3)%1);
    if(dist<R*2){core.drawParticle(ctx, cx-dist,cy,6,COLORS.cyan);core.drawParticle(ctx, cx+dist,cy,6,COLORS.red);
    ctx.strokeStyle=core.hexToRgba(COLORS.cyan,0.3);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx-dist,cy);ctx.stroke();
    ctx.strokeStyle=core.hexToRgba(COLORS.red,0.3);ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+dist,cy);ctx.stroke();}
    ctx.strokeStyle=COLORS.gray; ctx.lineWidth=2;
    ctx.strokeRect(cx-R*2.5,cy-20,15,40); ctx.strokeRect(cx+R*2.5-15,cy-20,15,40);
    core.drawLabel(ctx, 'D₁',cx-R*2.5+7,cy+35,COLORS.textDim,10); core.drawLabel(ctx, 'D₂',cx+R*2.5-7,cy+35,COLORS.textDim,10);
    core.drawLabel(ctx, 'EPR 对', cx, 24, COLORS.white, 13);
  };

  viz.entangle_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, m1x=cx-W*0.2, m2x=cx+W*0.2;
    core.drawParticle(ctx, m1x-15,cy,10,COLORS.cyan); core.drawParticle(ctx, m1x+15,cy,10,COLORS.red);
    ctx.strokeStyle=core.hexToRgba(COLORS.gray,0.5); ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(m1x-15,cy); ctx.lineTo(m1x+15,cy); ctx.stroke();
    core.drawParticle(ctx, m2x-15,cy,10,COLORS.cyan); core.drawParticle(ctx, m2x+15,cy,10,COLORS.red);
    ctx.beginPath(); ctx.moveTo(m2x-15,cy); ctx.lineTo(m2x+15,cy); ctx.stroke();
    ctx.strokeStyle=core.hexToRgba(COLORS.purple,0.4); ctx.lineWidth=1; ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(m1x,cy-30); ctx.lineTo(m2x,cy-30); ctx.stroke(); ctx.setLineDash([]);
    core.drawLabel(ctx, '分子A',m1x,cy+30,COLORS.cyan,11); core.drawLabel(ctx, '分子B',m2x,cy+30,COLORS.red,11);
    core.drawLabel(ctx, '纠缠关联',cx,cy-35,COLORS.purple,11);
    core.drawLabel(ctx, '分子纠缠态', cx, 24, COLORS.white, 13);
  };

  viz.entangle_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2;
    core.drawLabel(ctx, '经典关联',W*0.25,50,COLORS.cyan,12);
    for(var i=0;i<100;i++){var x=W*0.1+Math.random()*W*0.3,y=80+Math.random()*(H-120);ctx.fillStyle=core.hexToRgba(Math.random()>0.5?COLORS.cyan:COLORS.red,0.3);ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();}
    core.drawLabel(ctx, '量子关联',W*0.75,50,COLORS.purple,12);
    for(var i2=0;i2<50;i2++){var a=Math.random()*Math.PI*2,r=Math.random()*Math.min(W,H)*0.2;ctx.fillStyle=core.hexToRgba(COLORS.purple,0.3);ctx.beginPath();ctx.arc(W*0.75+Math.cos(a)*r,cy+Math.sin(a)*r,3,0,Math.PI*2);ctx.fill();}
    core.drawLabel(ctx, 'S = '+(2+Math.sqrt(2)).toFixed(3)+' > 2 (违反贝尔不等式)', cx, H-16, COLORS.yellow, 12);
    core.drawLabel(ctx, '经典关联 vs 量子关联', cx, 24, COLORS.white, 13);
  };

  // ==================== 13. 二次量子化 ====================
  viz.second_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2;
    var states=[{n:0,l:'|0⟩',p:0.6,c:COLORS.gray},{n:1,l:'|1⟩',p:0.25,c:COLORS.cyan},{n:2,l:'|2⟩',p:0.1,c:COLORS.purple},{n:3,l:'|3⟩',p:0.04,c:COLORS.red},{n:4,l:'|4⟩',p:0.01,c:COLORS.yellow}];
    var barW=50, startX=cx-states.length*(barW+20)/2;
    states.forEach(function(s,i){var x=startX+i*(barW+20),h=s.p*H*0.5;var grad=ctx.createLinearGradient(x,cy+40,x,cy+40-h);grad.addColorStop(0,core.hexToRgba(s.c,0.2));grad.addColorStop(1,s.c);ctx.fillStyle=grad;ctx.fillRect(x,cy+40-h,barW,h);core.drawLabel(ctx, s.l,x+barW/2,cy+56,s.c,11);for(var p=0;p<s.n;p++)core.drawParticle(ctx, x+barW/2-(s.n-1)*6+p*12,cy+40-h-12,4,s.c);});
    core.drawLabel(ctx, 'Fock 空间粒子数态', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, 'a†|n⟩ = √(n+1)|n+1⟩', cx, H-16, COLORS.yellow, 12);
  };

  viz.second_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, R=Math.min(W,H)*0.25;
    core.drawParticle(ctx, cx,cy,15,COLORS.cyan);
    for(var i=0;i<5;i++){var r=((time*40+i*30)%(R*1.5));ctx.strokeStyle=core.hexToRgba(COLORS.yellow,Math.max(0,0.5-r/(R*1.5)));ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();}
    for(var i2=0;i2<6;i2++){var angle=time*0.5+i2*Math.PI/3,r2=R*0.5+Math.sin(time+i2)*R*0.3;core.drawParticle(ctx, cx+Math.cos(angle)*r2,cy+Math.sin(angle)*r2,4,COLORS.yellow);}
    core.drawLabel(ctx, '光子产生湮灭 a†|0⟩ = |1⟩', cx, 24, COLORS.white, 13);
  };

  viz.second_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, gs=5, sp=Math.min(W,H)*0.1, sx=cx-(gs-1)*sp/2, sy=cy-(gs-1)*sp/2, atoms=[];
    for(var i=0;i<gs;i++) for(var j=0;j<gs;j++){var x=sx+i*sp,y=sy+j*sp,d=Math.sin(time*3-(i+j)*0.8)*8;atoms.push({x:x+d,y:y+d*0.5});core.drawParticle(ctx, x+d,y+d*0.5,5,COLORS.cyan);}
    ctx.strokeStyle=core.hexToRgba(COLORS.yellow,0.3); ctx.lineWidth=1;
    for(var i2=0;i2<gs;i2++){ctx.beginPath();for(var j2=0;j2<gs;j2++){var a=atoms[i2*gs+j2];j2===0?ctx.moveTo(a.x,a.y):ctx.lineTo(a.x,a.y);}ctx.stroke();}
    core.drawLabel(ctx, '声子激发（晶格振动量子）', cx, 24, COLORS.white, 13);
  };

  viz.second_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, amp=H*0.25, N=100;
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=2; ctx.beginPath();
    for(var px=40;px<W-40;px++){var x=(px-40)/(W-80)*4*Math.PI;px===40?ctx.moveTo(px,cy-Math.sqrt(N)*Math.sin(x-time*2)*amp/Math.sqrt(N)):ctx.lineTo(px,cy-Math.sqrt(N)*Math.sin(x-time*2)*amp/Math.sqrt(N));}ctx.stroke();
    for(var i=0;i<N;i++){var phase=(time*0.5+i*0.05)%4;if(phase<3){var ppx=40+phase*(W-80)/3;ctx.fillStyle=core.hexToRgba(COLORS.yellow,0.3);ctx.beginPath();ctx.arc(ppx,cy-Math.sin((ppx-40)/(W-80)*4*Math.PI-time*2)*amp/Math.sqrt(N)+(Math.random()-0.5)*10,1.5,0,Math.PI*2);ctx.fill();}}
    core.drawLabel(ctx, 'N = '+N+' → 经典场极限', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, 'E ∝ √N', cx, H-16, COLORS.yellow, 12);
  };

  // ==================== 14. 退相干 ====================
  viz.decoherence_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, n=4, cellW=55, cellH=55, decay=Math.exp(-0.5*(time%6));
    var startX=cx-n*cellW/2, startY=cy-n*cellH/2;
    for(var i=0;i<n;i++) for(var j=0;j<n;j++){
      var val=i===j?0.5:0.3*decay*Math.cos(time+i+j), absV=Math.abs(val);
      var x=startX+j*cellW, y=startY+i*cellH;
      ctx.fillStyle=core.hexToRgba(i===j?COLORS.cyan:COLORS.purple,absV*0.8); ctx.fillRect(x+2,y+2,cellW-4,cellH-4);
      ctx.strokeStyle=core.hexToRgba(COLORS.gray,0.3); ctx.lineWidth=1; ctx.strokeRect(x,y,cellW,cellH);
      ctx.fillStyle=absV>0.2?COLORS.white:COLORS.textDim; ctx.font='10px monospace'; ctx.textAlign='center';
      ctx.fillText(val.toFixed(2),x+cellW/2,y+cellH/2+4);
    }
    core.drawLabel(ctx, '退相干因子: '+decay.toFixed(3), cx, startY-15, COLORS.yellow, 12);
    core.drawLabel(ctx, '密度矩阵非对角元衰减', cx, 24, COLORS.white, 13);
  };

  viz.decoherence_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, R=Math.min(W,H)*0.25, coh=Math.exp(-(time%6)/3);
    ctx.strokeStyle=core.hexToRgba(COLORS.gray,0.2); ctx.lineWidth=1; ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.stroke();
    var vL=R*coh, angle=time*0.8;
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.sin(angle)*vL,cy-Math.cos(angle)*vL); ctx.stroke();
    core.drawParticle(ctx, cx+Math.sin(angle)*vL,cy-Math.cos(angle)*vL,5,COLORS.cyan);
    core.drawLabel(ctx, 'T₂ = 3s  相干度: '+coh.toFixed(2), cx, 24, COLORS.white, 13);
  };

  viz.decoherence_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, amp=H*0.25, coh=Math.exp(-0.3*(time%8));
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=2; ctx.beginPath();
    for(var px=40;px<W-40;px++){var x=(px-W/2)/(W*0.12);px===40?ctx.moveTo(px,cy-Math.exp(-x*x/2)*Math.cos(x*2-time)*amp):ctx.lineTo(px,cy-Math.exp(-x*x/2)*Math.cos(x*2-time)*amp);}ctx.stroke();
    ctx.strokeStyle=core.hexToRgba(COLORS.purple,coh); ctx.lineWidth=2; ctx.beginPath();
    for(var px2=40;px2<W-40;px2++){var x2=(px2-W/2)/(W*0.12);px2===40?ctx.moveTo(px2,cy+40+Math.exp(-x2*x2)*Math.sin(2*x2)*coh*Math.cos(time)*amp):ctx.lineTo(px2,cy+40+Math.exp(-x2*x2)*Math.sin(2*x2)*coh*Math.cos(time)*amp);}ctx.stroke();
    core.drawLabel(ctx, '相干度: '+coh.toFixed(2), cx, H-16, COLORS.yellow, 12);
    core.drawLabel(ctx, '分子退相干', cx, 24, COLORS.white, 13);
  };

  viz.decoherence_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, R=Math.min(W,H)*0.3;
    for(var i=0;i<8;i++){var angle=time*0.5+i*Math.PI/4;core.drawParticle(ctx, cx+Math.cos(angle)*R*0.8,cy+Math.sin(angle)*R*0.6,6,COLORS.cyan);
    ctx.strokeStyle=core.hexToRgba(COLORS.cyan,0.15);ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(cx,cy,R*0.8,R*0.6,0,0,Math.PI*2);ctx.stroke();}
    core.drawLabel(ctx, '完全经典（退相干完成）', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, '量子叠加 → 经典确定态', cx, H-16, COLORS.yellow, 12);
  };

  // ==================== 15. 林布拉德方程 ====================
  viz.lindblad_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, R=Math.min(W,H)*0.25;
    ctx.strokeStyle=core.hexToRgba(COLORS.gray,0.2); ctx.lineWidth=1; ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.stroke();
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=2; ctx.beginPath();
    for(var i=0;i<200;i++){var tt=i*0.03,decay=Math.exp(-tt*0.5),angle=tt*3+time,r=R*decay;i===0?ctx.moveTo(cx+Math.cos(angle)*r,cy+Math.sin(angle)*r*0.6):ctx.lineTo(cx+Math.cos(angle)*r,cy+Math.sin(angle)*r*0.6);}ctx.stroke();
    var cT=(time*0.5)%6, cD=Math.exp(-cT*0.5), cA=cT*3+time;
    core.drawParticle(ctx, cx+Math.cos(cA)*R*cD,cy+Math.sin(cA)*R*cD*0.6,5,COLORS.yellow);
    core.drawParticle(ctx, cx,cy,4,COLORS.red); core.drawLabel(ctx, '稳态',cx+8,cy+12,COLORS.red,10);
    core.drawLabel(ctx, 'dρ/dt = −(i/ℏ)[H,ρ] + L(ρ)', cx, 24, COLORS.white, 13);
  };

  viz.lindblad_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, R=Math.min(W,H)*0.3, exc=Math.exp(-(time%4));
    var atomC=exc>0.5?COLORS.cyan:COLORS.gray;
    core.drawParticle(ctx, cx,cy,15+exc*10,core.hexToRgba(atomC,0.3)); core.drawParticle(ctx, cx,cy,8,atomC);
    var nP=Math.floor((1-exc)*8);
    for(var i=0;i<nP;i++){var angle=i*Math.PI*2/8+time*0.3,r=R*(1-exc)*(0.5+0.5*Math.sin(time+i));core.drawParticle(ctx, cx+Math.cos(angle)*r,cy+Math.sin(angle)*r,3,COLORS.yellow);}
    ctx.strokeStyle=COLORS.red; ctx.lineWidth=1.5; ctx.beginPath();
    for(var px=W*0.6;px<W-20;px++){var tt=(px-W*0.6)/(W*0.35)*4;px===W*0.6?ctx.moveTo(px,cy+H*0.3-Math.exp(-tt)*H*0.5):ctx.lineTo(px,cy+H*0.3-Math.exp(-tt)*H*0.5);}ctx.stroke();
    core.drawLabel(ctx, '自发辐射', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, 'P(激发)', W*0.75, cy-H*0.2, COLORS.red, 10);
  };

  viz.lindblad_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2;
    var lvls=[{l:'E₃',y:cy-H*0.3,c:COLORS.red},{l:'E₂',y:cy-H*0.1,c:COLORS.yellow},{l:'E₁',y:cy+H*0.15,c:COLORS.cyan},{l:'E₀',y:cy+H*0.35,c:COLORS.purple}];
    lvls.forEach(function(l){ctx.strokeStyle=l.c;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx-80,l.y);ctx.lineTo(cx+80,l.y);ctx.stroke();core.drawLabel(ctx, l.l,cx+90,l.y+4,l.c,11);});
    var rP=(time*0.5)%4, rA=Math.max(0,1-rP/2);
    for(var i=0;i<lvls.length-1;i++){ctx.strokeStyle=core.hexToRgba(COLORS.yellow,rA*(1-i*0.3));ctx.lineWidth=2;var x=cx-40+i*25;ctx.beginPath();ctx.moveTo(x,lvls[i].y+5);ctx.lineTo(x,lvls[i+1].y-5);ctx.stroke();ctx.fillStyle=core.hexToRgba(COLORS.yellow,rA*(1-i*0.3));ctx.beginPath();ctx.moveTo(x,lvls[i+1].y-5);ctx.lineTo(x-4,lvls[i+1].y-12);ctx.lineTo(x+4,lvls[i+1].y-12);ctx.fill();}
    core.drawLabel(ctx, '能量弛豫 T₁', cx, 24, COLORS.white, 13);
  };

  viz.lindblad_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, T_eq=300, T0=600, tau=3;
    var T_curr=T_eq+(T0-T_eq)*Math.exp(-(time%8)/tau), barW=30, barH=H*0.5;
    var grad=ctx.createLinearGradient(cx-barW/2,cy+barH/2,cx-barW/2,cy-barH/2);
    grad.addColorStop(0,core.hexToRgba(COLORS.cyan,0.3));grad.addColorStop(0.5,core.hexToRgba(COLORS.yellow,0.5));grad.addColorStop(1,core.hexToRgba(COLORS.red,0.8));
    ctx.fillStyle=grad; ctx.fillRect(cx-barW/2,cy-barH/2,barW,barH);
    var tempY=cy+barH/2-((T_curr-200)/500)*barH;
    ctx.strokeStyle=COLORS.white; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cx-barW/2-10,tempY); ctx.lineTo(cx+barW/2+10,tempY); ctx.stroke();
    core.drawLabel(ctx, T_curr.toFixed(0)+' K', cx+barW/2+20, tempY+4, COLORS.white, 12);
    core.drawLabel(ctx, 'T_eq = 300 K', cx, cy+barH/2+20, COLORS.textDim, 11);
    core.drawLabel(ctx, '趋近热平衡', cx, 24, COLORS.white, 13);
  };

  // ==================== 16. 对应原理 ====================
  viz.correspondence_quantum = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, amp=H*0.25, hbar=0.1+0.9*(0.5+0.5*Math.cos(time*0.3));
    ctx.strokeStyle=COLORS.cyan; ctx.lineWidth=2; ctx.beginPath();
    for(var px=40;px<W-40;px++){var x=(px-W/2)/(W*0.1);var psi=Math.exp(-x*x/(2*hbar))/Math.sqrt(hbar);px===40?ctx.moveTo(px,cy-20-psi*amp*hbar):ctx.lineTo(px,cy-20-psi*amp*hbar);}ctx.stroke();
    ctx.strokeStyle=COLORS.yellow; ctx.lineWidth=1; ctx.setLineDash([4,4]); ctx.beginPath(); ctx.moveTo(40,cy-20-amp*0.5); ctx.lineTo(W-40,cy-20-amp*0.5); ctx.stroke(); ctx.setLineDash([]);
    core.drawLabel(ctx, 'ℏ = '+hbar.toFixed(2), cx, H-16, COLORS.yellow, 13);
    core.drawLabel(ctx, '量子分布',W*0.15,cy-20-amp-10,COLORS.cyan,11);
    core.drawLabel(ctx, '经典极限',W*0.7,cy-30,COLORS.yellow,11);
    core.drawLabel(ctx, 'ℏ → 0 过渡', cx, 24, COLORS.white, 13);
  };

  viz.correspondence_atomic = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, R=Math.min(W,H)*0.3, n=Math.floor(3+(time*0.5)%12);
    ctx.strokeStyle=core.hexToRgba(COLORS.gray,0.2); ctx.lineWidth=1; ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.stroke();
    for(var i=0;i<500;i++){var r=Math.random()*R,theta=Math.random()*Math.PI*2,prob=r*r*Math.pow(Math.cos(n*theta/2),2)*Math.exp(-r/(R*0.5));
    if(Math.random()<prob*0.01){ctx.fillStyle=core.hexToRgba(COLORS.cyan,prob*0.3);ctx.beginPath();ctx.arc(cx+Math.cos(theta)*r,cy+Math.sin(theta)*r,1,0,Math.PI*2);ctx.fill();}}
    core.drawParticle(ctx, cx+Math.cos(time*2)*R*0.8,cy+Math.sin(time*2)*R*0.8,5,COLORS.yellow);
    core.drawParticle(ctx, cx,cy,8,COLORS.white);
    core.drawLabel(ctx, 'n = '+n+' (大量子数极限)', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, 'n→∞: 量子→经典轨道', cx, H-16, COLORS.yellow, 12);
  };

  viz.correspondence_molecular = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, amp=H*0.15;
    for(var n=0;n<6;n++){var y=cy+60-(n+0.5)*amp*0.5;ctx.strokeStyle=core.hexToRgba(COLORS.cyan,0.3);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx-80,y);ctx.lineTo(cx+80,y);ctx.stroke();if(n<4)core.drawLabel(ctx, 'n='+n,cx+90,y+4,COLORS.textDim,9);}
    var bL=60+20*Math.sin(time*4);
    core.drawParticle(ctx, cx-bL/2,cy-60,12,COLORS.cyan); core.drawParticle(ctx, cx+bL/2,cy-60,12,COLORS.red);
    ctx.strokeStyle=COLORS.gray; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(cx-bL/2,cy-60); ctx.lineTo(cx+bL/2,cy-60); ctx.stroke();
    ctx.strokeStyle=COLORS.yellow; ctx.lineWidth=1.5; ctx.beginPath();
    for(var px=cx-100;px<=cx+100;px++){var x=(px-cx)/30;px===cx-100?ctx.moveTo(px,cy+60-x*x*0.5*amp*0.5):ctx.lineTo(px,cy+60-x*x*0.5*amp*0.5);}ctx.stroke();
    core.drawLabel(ctx, '经典分子振动 (n→∞)', cx, 24, COLORS.white, 13);
  };

  viz.correspondence_macro = function(ctx, W, H, time, COLORS, core) {
    core.clearBg(ctx, W, H, COLORS);
    var cx=W/2, cy=H/2, R=Math.min(W,H)*0.3;
    ctx.strokeStyle=core.hexToRgba(COLORS.gray,0.2); ctx.lineWidth=1;
    ctx.beginPath(); ctx.ellipse(cx,cy,R*1.2,R*0.8,0,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx,cy,R*0.7,R*0.5,0.3,0,Math.PI*2); ctx.stroke();
    var p1A=time*0.5;
    core.drawParticle(ctx, cx+Math.cos(p1A)*R*1.2,cy+Math.sin(p1A)*R*0.8,10,COLORS.cyan);
    var p2A=time*1.2;
    core.drawParticle(ctx, cx+Math.cos(p2A)*R*0.7*Math.cos(0.3)-Math.sin(p2A)*R*0.5*Math.sin(0.3),cy+Math.cos(p2A)*R*0.7*Math.sin(0.3)+Math.sin(p2A)*R*0.5*Math.cos(0.3),7,COLORS.red);
    core.drawParticle(ctx, cx,cy,18,COLORS.yellow);
    core.drawLabel(ctx, '完全经典物理', cx, 24, COLORS.white, 13);
    core.drawLabel(ctx, '量子效应可忽略 (ℏ→0)', cx, H-16, COLORS.yellow, 12);
  };

  return viz;
})();

// 兼容非模块环境
if (typeof window !== 'undefined') {
  window.QuantumVizFormulas = QuantumVizFormulas;
}
