# 附录A 公式推导补充索引

本附录汇总全书涉及的关键数学公式，按章节索引，并标注其推导来源和适用条件。

## A.1 第2章：力的落差概念的严格化

### A.1.1 势能落差

$$
D_U(\mathbf{x};\ell) = \frac{|U(\mathbf{x}+\ell)-U(\mathbf{x})|}{\|\ell\|}
$$

- 量纲：能量/长度 = 力
- 适用条件：标量势能场 $U(\mathbf{x})$ 存在
- 极限行为：$\lim_{\|\ell\|\to 0} D_U = \|\nabla U\|$

### A.1.2 力场非均匀性

$$
D_F(\mathbf{x}) = \|\nabla \otimes \mathbf{F}(\mathbf{x})\|
$$

- 量纲：力/长度²
- 适用条件：一般向量场
- 保守力下：$\nabla \otimes \mathbf{F} = -H(U)$（Hessian 矩阵）

### A.1.3 非均匀性描述簇

$$
\mathcal{N} = \Big(\|\nabla \rho\|, \|\nabla p\|, \|\nabla \otimes \mathbf{F}\|, \|\nabla T\|, A\Big)
$$

- 性质：描述簇，非单一标量
- 各分量量纲不同，不能直接相加

## A.2 第3章：非均匀性与经典结构形成

### A.2.1 扩展体的总力矩

$$
\boldsymbol{\tau} = \int \mathbf{r} \times \rho(\mathbf{r})\mathbf{F}(\mathbf{R}+\mathbf{r})\, d^3r
$$

- 来源：刚体力学标准结果
- 一阶展开后：$\boldsymbol{\tau} \approx \int \mathbf{r}\times \rho(\mathbf{r})[(\mathbf{r}\cdot\nabla)\mathbf{F}(\mathbf{R})]\, d^3r$

### A.2.2 涡量方程

$$
\frac{\partial \boldsymbol{\omega}}{\partial t}
=
\nabla \times (\mathbf{v}\times \boldsymbol{\omega})
+ \frac{\nabla \rho \times \nabla p}{\rho^2}
+ \nu \nabla^2 \boldsymbol{\omega}
+ \nabla \times \mathbf{f}
$$

- 来源：对 Navier-Stokes 方程取旋度
- 推导步骤：使用恒等式 $(\mathbf{v}\cdot\nabla)\mathbf{v} = \nabla(v^2/2) - \mathbf{v}\times\boldsymbol{\omega}$，利用 $\nabla\times\nabla\phi=0$ 消除梯度项，再利用 $\nabla\times(\rho^{-1}\nabla p) = -(\nabla\rho\times\nabla p)/\rho^2$ 处理压强项
- 四项物理含义：(1) 涡量拉伸与输运 (2) 斜压项 (3) 粘性扩散 (4) 外力旋度

## A.3 第4章：宇宙非均匀演化的物理基础

### A.3.1 连续性方程（线性近似）

$$
\dot\delta + \frac{1}{a}\nabla\cdot\mathbf{u} = 0
$$

### A.3.2 Euler 方程（冷暗物质）

$$
\dot{\mathbf{u}} + H\mathbf{u} = -\frac{1}{a}\nabla\Phi
$$

### A.3.3 泊松方程

$$
\nabla^2\Phi = 4\pi G a^2 \bar\rho_m \delta
$$

### A.3.4 线性增长方程

$$
\ddot{\delta} + 2H\dot{\delta} - 4\pi G\bar\rho_m\delta = 0
$$

- 推导：由 A.3.1-A.3.3 消去速度散度
- 物质主导时期增长模：$\delta \propto a(t)$

### A.3.5 Friedmann 方程

$$
H^2 = \frac{8\pi G}{3}\rho - \frac{k}{a^2} + \frac{\Lambda}{3}
$$

$$
\frac{\ddot a}{a} = -\frac{4\pi G}{3}(\rho+3p) + \frac{\Lambda}{3}
$$

## A.4 第5章：规则形成的分层理论

### A.4.1 规则形成的数学判据

$$
\| C(T_t x) - \Phi_t(Cx)\| \le \varepsilon, \quad x\in\mathcal{D}
$$

$$
\|\delta m(t)\| \le e^{-\lambda t}\|\delta m(0)\|, \quad \lambda>0
$$

### A.4.2 规则判据的乘积形式

$$
\mathcal{R} = \mathcal{C}_{\text{closure}} \cdot \mathcal{S}_{\text{stability}} \cdot \mathcal{K}_{\text{compressibility}}
$$

### A.4.3 结构形成研究型表达

$$
\frac{d\mathcal{S}}{dt} = \Psi(\mathcal{N},\mathcal{B},\mathcal{K},\mathcal{D})
$$

- 非现成物理定律，而是研究程序的总表达

## A.5 第7章：量子约束

### A.5.1 薛定谔方程

$$
i\hbar \frac{\partial}{\partial t} |\psi(t)\rangle = \hat H |\psi(t)\rangle
$$

### A.5.2 不确定关系

$$
\Delta x\,\Delta p \ge \frac{\hbar}{2}
$$

### A.5.3 氢原子能级

$$
E_n = -\frac{m_e e^4}{2(4\pi\varepsilon_0)^2\hbar^2 n^2}, \quad n=1,2,3,\dots
$$

### A.5.4 Landau 自由能

$$
F(\eta) = F_0 + a\eta^2 + b\eta^4 + \kappa (\nabla \eta)^2
$$

### A.5.5 重整化群方程

$$
\mu \frac{dg}{d\mu} = \beta(g)
$$

## A.6 第9章：思考力学

### A.6.1 认知动力学最小框架

$$
\tau \frac{d\mathbf{x}}{dt} = -\nabla U_c(\mathbf{x}) + W\sigma(\mathbf{x}) + B\mathbf{u}(t) + M\mathbf{m}(t) + \boldsymbol{\xi}(t)
$$

### A.6.2 漂移-扩散模型

$$
dz_t = \mu\,dt + \sigma\, dW_t
$$

### A.6.3 跨势垒概率（类 Kramers 形式）

$$
P_{\text{escape}} \propto e^{-\Delta E / D}
$$

### A.6.4 Softmax 门控

$$
a_i = \frac{e^{\beta s_i}}{\sum_j e^{\beta s_j}}
$$
